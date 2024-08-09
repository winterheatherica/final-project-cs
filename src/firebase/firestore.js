// src/firebase/firestore.js

import app from "./firebaseConfig";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Initialize Firestore
const firestore = getFirestore(app);

// Fungsi untuk menambahkan data pengguna ke Firestore
export const addUserToFirestore = async (user) => {
  try {
    const docRef = await addDoc(collection(firestore, "users"), {
      uid: user.uid,
      email: user.email,
      username: user.username
    });
    console.log('User document written with ID:', docRef.id);
  } catch (error) {
    console.error('Error adding user document:', error.message);
    throw error;
  }
};
