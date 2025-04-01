import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, SafeAreaView, Image, Modal } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

import { ThemedText } from "@/components/ThemedText";
import { ContactStorage } from "@/storage/contact-storage";
import { colors } from "@/styles/Colors";
import { Option } from "@/components/Option";


type IContact = {
  id: string;
  name: string;
  phone: string;
  photo?: string;
}

export const ContactsScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [contact, setContact] = useState<IContact>({} as ContactStorage);
  const [contacts, setContacts] = useState<IContact[]>([]);

  const mycontacts: IContact[] = [
    { id: "1", name: "João", phone: '(99) 99999-9999' },
    { id: "2", name: "Jonas", phone: '(99) 99999-9999' },
    { id: "3", name: "Maria", phone: '(99) 99999-9999' },
    { id: "4", name: "Mariana", phone: '(99) 99999-9999' },
    { id: "5", name: "Clara", phone: '(99) 99999-9999' },
    { id: "6", name: "tereza", phone: '(99) 99999-9999' },
    { id: "7", name: "Francisco", phone: '(99) 99999-9999' },
    { id: "8", name: "Carol", phone: '(99) 99999-9999' },
    { id: "9", name: "Kamila", phone: '(99) 99999-9999' },
    { id: "10", name: "Afonso", phone: '(99) 99999-9999' },
  ];

  const generateRandomPhoto = () => {
    // const test = Math.floor(Math.random() * 10000);
    // const photo: string = 'https://i.pravatar.cc/300?u=a' + test;
    const photo: string = 'src/assets/avatar.png';
    return photo;
  }

  const contactDetails = (selected: ContactStorage) => {
    console.log('selected: ', selected);

    setContact(selected);
    setShowModal(true);
  }

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.containerHeader}>
        <ThemedText type="title" style={styles.containerHeaderTitle}>
          Contacts
        </ThemedText>
        <View style={styles.containerHeaderOptions}>
          <TouchableOpacity >
            <MaterialIcons name="add" size={32} color={"#FFF"} />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialIcons name="search" size={32} color={"#FFF"} />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialIcons name="more-vert" size={32} color={"#FFF"} />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={mycontacts}
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
      />
      <Modal transparent visible={showModal} animationType="slide">
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <ThemedText type="title" style={styles.modalCategory}>Detalhes</ThemedText>
              <TouchableOpacity onPress={() => setShowModal(false)} >
                <MaterialIcons
                  name="close"
                  size={32}
                  color={'#FFF'}
                />
              </TouchableOpacity>
            </View>
            <ThemedText type="subtitle">{contact.name}</ThemedText>
            <ThemedText type="default">{contact.phone}</ThemedText>
            <View style={styles.modalFooter}>
              <Option
                name="Ligar"
                icon="phone"
                variant="primary"
                onPress={() => setShowModal(false)}
              />
              <Option
                name="Excluir"
                icon="delete"
                variant="secondary"
                onPress={() => setShowModal(false)}
              />
            </View >
          </View >
        </View >

      </Modal >
    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 10,
  },
  containerHeader: {
    marginBottom: 20,
    backgroundColor: "#1E1E1E",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 20
  },
  containerHeaderTitle: {
    color: "#FFF",
    margin: 20
  },
  containerHeaderOptions: {
    display: "flex",
    flexDirection: "row",
    gap: 10
  },
  contactImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 50,
  },
  contactItem: {
    backgroundColor: "#1E1E1E",
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  contactText: {
    color: "#FFF",
    fontSize: 16,
  },
  modal: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: colors.gray[900],
    borderTopWidth: 1,
    borderTopColor: colors.gray[800],
    paddingBottom: '100%',
    padding: 24,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalHeader: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
  modalCategory: {
    flex: 1,
    // fontSize: 16,
    fontWeight: "500",
    color: colors.gray[100],
  },
  modalFooter: {
    flexDirection: "row",
    marginTop: 32,
    width: "100%",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: colors.gray[600],
    paddingVertical: 14,
  },
});

export default ContactsScreen;