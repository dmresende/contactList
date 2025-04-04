import AsyncStorage from "@react-native-async-storage/async-storage";

const CONTACT_STORAGE_KEY = "contact-storage";

export type ContactStorage = {
    id: string;
    name: string;
    phone: string;
    email: string;
    photo?: string;
    ative: boolean;
};

async function get(): Promise<ContactStorage[]> {
    const storage = await AsyncStorage.getItem(CONTACT_STORAGE_KEY);
    const response = storage ? JSON.parse(storage) : [];

    return response;
}

async function save(newContact: ContactStorage) {
    try {
        const storage = await get();
        const update = JSON.stringify([...storage, newContact]);

        await AsyncStorage.setItem(CONTACT_STORAGE_KEY, update);
    } catch (error) {
        console.log(error);
    }
}

// async function save(contactID: ContactStorage) {
//     try {
//         const storage = await get();
//         const update = JSON.stringify([...storage, newContact]);

//         await AsyncStorage.setItem(CONTACT_STORAGE_KEY, update);
//     } catch (error) {
//         console.log(error);
//     }
// }

async function remove(id: string) {
    try {
        const storage = await get();
        const update = storage.filter((contact) => contact.id !== id);

        await AsyncStorage.setItem(CONTACT_STORAGE_KEY, JSON.stringify(update));
    } catch (error) {
        console.log(error);
    }
}

async function update(id: string, newContact: ContactStorage) {
    try {
        const storage = await get();
        const index = storage.findIndex((contact) => contact.id === id);
        const update = [...storage];
        update[index] = newContact;
        await AsyncStorage.setItem(CONTACT_STORAGE_KEY, JSON.stringify(update));
        console.log("🚀 ~ update ~ JSON.stringify(update):", JSON.stringify(update))
        console.log("🚀 ~ update ~ Qual index? ", index)
    } catch (error) {
        console.log(error);
    }
}
  
export const contactStorage = {
    get,
    save,
    remove,
    update,
}
