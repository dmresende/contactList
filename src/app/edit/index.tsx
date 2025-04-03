import { Alert, Image, KeyboardAvoidingView, Text, View } from "react-native";
import { router, useLocalSearchParams, useRouter } from "expo-router";
import { styles } from "./styles";
import { Input } from "@/src/components/Input/Input";
import { Button } from "@/src/components/button/button";
import { contactStorage } from "@/src/storage/contact-storage";
import { useEffect, useState } from "react";
import { Colors } from "@/src/constants/Colors";
import { IContact } from "../index";

export default function Edit() {
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [photo, setPhoto] = useState<string>("");
  const [contact, setContact] = useState<IContact>();



  //remover
  const [text, onChangeText] = useState('Useless Text');
  const [number, onChangeNumber] = useState('');
  //

  const params = useLocalSearchParams();
  const paramsId = params.id as string;

  const getContact = async () => {
    try {
      const data = await contactStorage.get()
      const contactSelected = await data.find((item) => item.id == paramsId);

      setContact(contactSelected)
    } catch (error) {
      console.log(error);
    }
  }



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


  useEffect(() => {
    console.log("🚀 ~ useEffect ~ paramsId:", paramsId)
    getContact()
  }, [paramsId]);



  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Edit</Text>
      </View>
      <Text style={styles.label}>Edite a contact</Text>
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
              value={contact?.name ?? ''}
            />
            <Input
              placeholder='Phone'
              onChangeText={setPhone}
              value={contact?.phone ?? ''}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="phone-pad"
              maxLength={11}
            />
            <Input
              placeholder="e-mail"
              onChangeText={setEmail}
              value={contact?.email ?? ''}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
            />

            <Input
              onChangeText={onChangeNumber}
              value={number}
              placeholder="TESTE INPUT"
            />


            <Button
              title="Editar"
              onPress={() => {
                console.log("Editado")
              }}
              color={Colors.lightOlli["indigo-600"]}
            />
            <Button
              title="Cancel"
              onPress={() => router.navigate("..")}
            />

          </View>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};
