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
  const [contact, setContact] = useState<IContact>({} as ContactStorage);
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [search, setsearch] = useState<boolean>(false);


  const [cont, setCont] = useState(async () => await contactStorage.get());



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

  const contactDetails = (selected: ContactStorage) => {
    console.log('selected: ', selected);

    setContact(selected);
  }

  const searchContact = (text: string) => {
    const filteredContacts = contacts.filter((contact) => {
      return contact.name.toLowerCase().includes(text.toLowerCase());
    });
    setContacts(filteredContacts);
  }

  const handleSearch = (text: string) => {
    if (text == "") {
      Alert.alert("Please enter a name to search");
    }
    if (text.length > 0) {
      searchContact(text);
    } else {
      getContacts();
    }
  }

  useEffect(() => {
    getContacts();
  }, []);


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
          TESTE SEARCH
        </Text>
        <View style={styles.containerHeaderOptions}>
          <TouchableOpacity onPress={() => router.navigate("/add")}>
            <MaterialIcons name="add" size={32} color={"#FFF"} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setsearch(!search)}>
            <MaterialIcons name="search" size={32} color={"#FFF"} />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialIcons onPress={() => getContacts()} name="more-vert" size={32} color={"#FFF"} />
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
              <Text style={styles.contactText}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      }

    </View >
  );
};
