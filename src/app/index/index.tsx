import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  Alert
} from "react-native";
import React, { useCallback, useState } from "react";
import { MaterialIcons } from '@expo/vector-icons';

import { ThemedText } from "@/src/components/ThemedText";
import { contactStorage, ContactStorage } from "@/src/storage/contact-storage";
import { OptionButton } from "@/src/components/Option/Option";
import { router, useFocusEffect } from "expo-router";

import { styles } from "./styles";
import { Colors } from "@/src/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";


type IContact = {
  id: string;
  name: string;
  phone: string;
  email: string;
  photo?: string;
  ative: boolean
}

export default function ContactsScreen() {
  const [showModal, setShowModal] = useState(false);
  const [contact, setContact] = useState<IContact>({} as ContactStorage);
  const [contacts, setContacts] = useState<IContact[]>([]);


  const getContacts = async () => {
    try {
      const response = await contactStorage.get();


      setContacts(response);
    } catch (error) {
      console.log(error);
    }
  }

  const generateRandomPhoto = () => {
    const photoContact = contactStorage.get();
    const a = photoContact.then((value) => {
      // console.log('value: ', value.length);
    });

    if (!photoContact) {
      const test = Math.floor(Math.random() * 10000);
      const photo: string = 'https://i.pravatar.cc/300?u=a' + test;
      return photo;
    }
    // const photo: string = 'https://i.pravatar.cc/300?u=a';
    return 'https://i.pravatar.cc/300?u=a';
  }

  const deleteContact = async (id: string) => {
    await contactStorage.remove(id);
    getContacts();
    if (showModal) {
      setShowModal(false);
    }
  }

  const handleDeleteContact = async (id: string) => {
    try {
      Alert.alert(
        "Attention",
        "Do you really want to delete this contact",
        [
          {
            text: "Sim",
            onPress: () => deleteContact(id),
          },
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
        ]
      )

    } catch (error) {
      console.log(error);
    }
  }

  const contactDetails = (selected: ContactStorage) => {
    console.log('selected: ', selected);

    setContact(selected);
    setShowModal(true);
  }

  useFocusEffect(
    useCallback(() => {
      getContacts();
    }, [])
  );

  const removeValue = async () => {
    try { await AsyncStorage.removeItem('@CONTACT_STORAGE_KEY') } catch (e) { console.log(e) }
  }

  return (
    <View style={styles.container}>

      <View style={styles.containerHeader}>
        <ThemedText type="title" style={styles.containerHeaderTitle}>
          Contacts
        </ThemedText>
        <View style={styles.containerHeaderOptions}>
          <TouchableOpacity onPress={() => router.navigate("/add")}>
            <MaterialIcons name="add" size={32} color={"#FFF"} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('buscar')}>
            <MaterialIcons name="search" size={32} color={"#FFF"} />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialIcons name="more-vert" size={32} color={"#FFF"} />
          </TouchableOpacity>
        </View>
      </View>

      {contacts.length == 0
        ?
        <ThemedText style={styles.emptyList} type="default">No contacts found
        </ThemedText>
        : <FlatList
          data={contacts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.contactItem}
              onPress={() => contactDetails(item)}
            >
              <Image
                source={{ uri: generateRandomPhoto(), }}
                style={styles.contactImage}
              />
              <Text style={styles.contactText}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />}

      <Modal transparent visible={showModal} animationType="slide">
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <ThemedText type="title" style={styles.modalCategory}>Details</ThemedText>
              <TouchableOpacity onPress={() => setShowModal(false)} >
                <MaterialIcons
                  name="close"
                  size={20}
                  color={Colors.lightOlli["indigo-600"]}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.modalActive}>
              <View style={styles.modalData}>
                <ThemedText type="subtitle">{contact.name}</ThemedText>
                <ThemedText type="default">{contact.phone}</ThemedText>
                <ThemedText type="default">{contact.email}</ThemedText>
              </View>
              <ThemedText type="subtitle">

                {contact.ative == true
                  ? <MaterialIcons
                    name="circle"
                    size={20}
                    color={Colors.lightOlli["green-500"]}
                  />

                  : <MaterialIcons
                    name="circle"
                    size={20}
                    color={Colors.lightOlli["gray-500"]}
                  />}
              </ThemedText>
            </View>
            <View style={styles.modalFooter}>
              <OptionButton
                name="Call"
                icon="phone"
                variant="primary"
                onPress={() => setShowModal(false)}
              />
              <OptionButton
                name="Delete"
                icon="delete"
                variant="secondary"
                onPress={() => handleDeleteContact(contact.id)}
              />
            </View >
          </View >
        </View >

      </Modal >
    </View >
  );
};

