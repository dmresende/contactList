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
  const [contact, setContact] = useState<IContact>();
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const params = useLocalSearchParams();
  const paramsId = params.id as string;

  console.log(contact)

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

    //TODO - validar se outro contato usa alguns desses campos,(ignorar o usuario editado)
    const validaNome = data.some((item) => item.name === contact?.name);
    const validaTelefone = data.some((item) => item.phone === contact?.phone);
    const validaEmail = data.some((item) => item.email === contact?.email);

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

  const handleEditContact = async () => {
    try {
      const isvalid = await validateData();

      // if (!name || !phone || !email)
      //   return Alert.alert("Attention", "Fill in all fields!");

      if (isvalid) {
        console.log("🚀 ~ handleAddContact ~ validateData:", validateData)
        await contactStorage.save({
          id: paramsId,
          name: contact?.name,
          phone: contact?.phone,
          email: contact?.email,
          photo: contact?.photo,
          ative: true,
        })

        Alert.alert("Success", "Contact edited successfully!", [
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
              onChangeText={(value) => setContact({ ...contact, name: value })}
              defaultValue={contact?.name}
            />
            <Input
              placeholder='Phone'
              onChangeText={(value) => setContact({ ...contact, phone: value })}
              defaultValue={contact?.phone}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="phone-pad"
              maxLength={11}
            />
            <Input
              placeholder="e-mail"
              onChangeText={(value) => setContact({ ...contact, email: value })}
              defaultValue={contact?.email}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
            />

            <Button
              title="Editar"
              onPress={handleEditContact}
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
