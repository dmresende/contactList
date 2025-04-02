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

  const validateData = async () => {
    const data = await contactStorage.get();

    const validaNome = data.some((item) => item.name === name);
    const validaTelefone = data.some((item) => item.phone === phone);
    const validaEmail = data.some((item) => item.email === email);

    if (validaNome) {
      Alert.alert("Attention", "There is already a contact with that name")
      return false;
    } else if (validaTelefone) {
      Alert.alert("Attention", "There is already a contact with this phone!")
      return false;
    } else if (validaEmail) {
      Alert.alert("Attention", "There is already a contact with this email!")
      return false;
    }
    return true
  }



  const handleAddContact = async () => {
    try {
      const isvalid = await validateData();

      if (!name || !phone || !email)
        return Alert.alert("Attention", "Fill in all fields!");

      if (isvalid) {
        console.log("🚀 ~ handleAddContact ~ validateData:", validateData)
        await contactStorage.save({
          id: new Date().getTime().toString(),
          name,
          phone,
          email,
          photo,
          ative: true,
        })

        Alert.alert("Success", "Contact saved successfully!", [
          {
            text: "Ok",
            onPress: () => router.back()
          }
        ]);
      }

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
