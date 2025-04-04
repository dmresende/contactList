import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  Alert,
  Switch
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { MaterialIcons } from '@expo/vector-icons';

import { contactStorage, ContactStorage } from "@/src/storage/contact-storage";
import { OptionButton } from "@/src/components/OptionButton/OptionButton";
import { router, useFocusEffect } from "expo-router";

import { styles } from "./styles";
import { Colors } from "@/src/constants/Colors";
import { colors } from "@/styles/Colors";
import { Searchbar } from "react-native-paper";


export type IContact = {
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
  const [search, setsearch] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = React.useState('');


  const getContacts = async () => {
    try {
      const response = await contactStorage.get();

      response.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });


      setContacts(response);

    } catch (error) {
      console.log(error);
    }
  }

  const generateRandomPhoto = () => {
    const photoContact = contactStorage.get();
    const a = photoContact.then((value) => {
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

      if (contact.ative) {
        Alert.alert(
          "Attention",
          "You can only delete inactive contacts"
        )
        return;
      }

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

  const handleEditContact = (id: string) => {
    router.navigate({ pathname: "/edit", params: { id } });
  }

  const contactDetails = (selected: ContactStorage) => {
    console.log('selected: ', selected);

    setContact(selected);
    setShowModal(true);
  }

  //INFOR - Responsável por atualizar o status do contato
  const handleStatus = async () => {
    setContact({ ...contact });

    await contactStorage.update(contact.id, { ...contact });
    getContacts();
    setShowModal(false);
  }

  //INFOR - Responsável por buscar os contatos ao iniciar a tela
  useFocusEffect(
    useCallback(() => {
      getContacts();
    }, [])
  );

  //INFOR - Responsável por filtrar os contatos ao digitar na barra de pesquisa
  useEffect(() => {
    const filteredContacts = contacts.filter((contact) => {
      return contact.name.toLowerCase().includes(searchQuery.toLowerCase());
    });
    setContacts(filteredContacts);

    if (searchQuery == "") {
      getContacts();
    }
  }, [searchQuery]);



  return (
    <View style={styles.container}>

      <View style={styles.containerHeader}>
        <Text style={styles.containerHeaderTitle}>
          Contacts
        </Text>
        <View style={styles.containerHeaderOptions}>
          <TouchableOpacity onPress={() => router.navigate("/add")}>
            <MaterialIcons name="add" size={32} color={"#FFF"} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setsearch(!search)}>
            <MaterialIcons name="search" size={32} color={"#FFF"} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Alert.alert('Atention', 'This feature is not available yet')}>
            <MaterialIcons name="more-vert" size={32} color={"#FFF"} />
          </TouchableOpacity>

        </View>
      </View>
      {search &&
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
      }

      {contacts.length == 0
        ?
        <Text style={styles.emptyList} >No contacts found
        </Text>
        :
        <FlatList
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
              <View style={styles.contactInfo}>
                <Text style={styles.contactText}>{item.name}</Text>
                <Text >
                  {item.ative
                    ? <Text style={styles.active} >Active</Text>
                    : <Text style={styles.active} >Deactivate</Text>
                  }
                </Text>
              </View>


            </TouchableOpacity>
          )}
        />
      }


      <Modal transparent visible={showModal} animationType="slide">
        <View style={styles.modal}>
          <View style={styles.modalContent}>

            <View style={styles.modalHeader}>
              <Text style={styles.modalCategory}>Details</Text>
              <View style={styles.modalHeaderOptions}>
                <TouchableOpacity onPress={() => {
                  showModal ? setShowModal(false) : setShowModal(true)
                  handleEditContact(contact.id)
                }} >
                  <MaterialIcons
                    name="edit"
                    size={20}
                    color={Colors.lightOlli["indigo-600"]}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setShowModal(false)} >
                  <MaterialIcons
                    name="close"
                    size={20}
                    color={Colors.lightOlli["indigo-600"]}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.modalActive}>
              <View >
                <Text style={styles.infcads} >{contact.name}</Text>
                <Text style={styles.infcads}>{contact.phone}</Text>
                <Text style={styles.infcads}>{contact.email}</Text>
              </View>

              {/* //TODO - REMOVER, OU VER SE PRECISO REMOVER ESSE TEXT */}
              <Text >
                {contact.ative
                  ? <Text style={styles.active} >Active</Text>
                  : <Text style={styles.active} >Deactivate</Text>
                }
              </Text>

              <Switch
                trackColor={{ false: '#767577', true: colors.lightOlli["indigo-500"] }}
                thumbColor={styles.active ? colors.lightOlli["indigo-600"] : '#f4f3f4'}
                value={contact.ative}
                onValueChange={(value) => setContact({ ...contact, ative: value })}
              />

            </View>

            <View style={styles.modalFooter}>
              <OptionButton
                name="Salvar"
                icon="save"
                variant="primary"
                onPress={() => handleStatus()}
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
