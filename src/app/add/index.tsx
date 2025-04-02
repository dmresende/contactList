import { Alert, Image, KeyboardAvoidingView, Text, View } from "react-native";
import { router } from "expo-router";
import { styles } from "./styles";
import { Input } from "@/src/components/Input/Input";
import { Button } from "@/src/components/button/button";
import { contactStorage } from "@/src/storage/contact-storage";
import { useState } from "react";
import { Colors } from "@/src/constants/Colors";

export default function Add() {
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [photo, setPhoto] = useState<string>("");

  const data = contactStorage.get();

  const validateName = () => {
    data.then((value) => {
      value.find((item) => item.name === name) ? Alert.alert("Atenção", "Já existe um contato com esse nome!") : null
      return
    })
  }

  const validatePhone = () => {
    data.then((value) => {
      value.map((item) => {
        if (item.phone === phone) {
          return Alert.alert("Atenção", "Já existe um contato com esse telefone!");
        }
      })
    })
  }

  const validateEmail = () => {
    data.then((value) => {
      value.map((item) => {
        if (item.email === email) {
          return Alert.alert("Atenção", "Já existe um contato com esse email!");
        }
      })
    })
  }

  const handleAddContact = async () => {
    try {
      //TODO - VALIDAR DADOS DUPLICADOS
      validateName();

      if (!name || !phone || !email) {
        return Alert.alert("Atenção", "Preencha todos os campos!");
      }
      if (!phone) {
        return Alert.alert("Atenção", "Preencha todos os campos!");
      }
      if (!email) {
        return Alert.alert("Atenção", "Preencha todos os campos!");
      }

      await contactStorage.save({
        id: new Date().getTime().toString(),
        name,
        phone,
        email,
        photo,
        ative: true,
      })


      Alert.alert("Sucesso", "Contato salvo com sucesso!", [
        {
          text: "Ok",
          onPress: () => router.back()
        }
      ]);

    } catch (errro) {
      console.log(errro);
    }
  }

  // const generateRandomPhoto = () => {
  //   const photoContact = contactStorage.get();

  //   const data = photoContact.then((value) => {
  //     console.log('value: ', value);
  //   });

  //   if (!data) {
  //     const test = Math.floor(Math.random() * 2);
  //     const photo: string = 'https://i.pravatar.cc/300?u=a' + test;
  //     return setPhoto(photo);
  //   }

  //   return
  // }


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>New</Text>
      </View>
      <Text style={styles.label}>Register a contact name</Text>
      <View style={styles.contentBody}>
        <View style={styles.avatarContainer}>
          <Image style={styles.avatar}
            source={{
              uri: "https://i.pravatar.cc/300?u=a",
              width: 100,
              height: 100,
            }}
          />
        </View>
        <KeyboardAvoidingView behavior="position">
          <View style={styles.form} >
            <Input
              placeholder="Name"
              onChangeText={setName}
            />
            <Input
              placeholder="DDD + Number"
              onChangeText={setPhone}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="phone-pad"
              maxLength={11}
            />
            <Input
              placeholder="e-mail"
              onChangeText={setEmail}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
            />
            <Button
              title="Save"
              onPress={handleAddContact}
              color={Colors.lightOlli["indigo-600"]}
            />
            <Button
              title="Cancel"
              onPress={() => router.back()}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};
