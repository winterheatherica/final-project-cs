// src/firebase/auth.js

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, query, orderByChild, equalTo, get } from "firebase/database";
import { addUserToDatabase } from './database'; // Pastikan impor benar
import app from './firebaseConfig'; // Import konfigurasi Firebase

const auth = getAuth(app);
const database = getDatabase(app);

export const signUp = async (email, password, username) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('Adding user to database:', { uid: user.uid, email, username });
    await addUserToDatabase({ uid: user.uid, email, username });
    return user;
  } catch (error) {
    console.error('Error signing up:', error.message);
    throw error;
  }
};

export const logIn = async (emailOrUsername, password) => {
  try {
    let userCredential;
    if (emailOrUsername.includes('@')) {
      // Login with email
      userCredential = await signInWithEmailAndPassword(auth, emailOrUsername, password);
    } else {
      // Find the email associated with the username
      const usernameQuery = query(ref(database, 'users'), orderByChild('username'), equalTo(emailOrUsername));
      const snapshot = await get(usernameQuery);

      if (snapshot.exists()) {
        const userData = snapshot.val();
        const userKey = Object.keys(userData)[0];
        const email = userData[userKey].email;

        userCredential = await signInWithEmailAndPassword(auth, email, password);
      } else {
        throw new Error('Username not found');
      }
    }
    console.log('User credential after login:', userCredential);
    return userCredential.user;
  } catch (error) {
    console.error('Login error:', error.message);
    throw error;
  }
};  

export const getAuthStatus = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Mengambil data pengguna dari Realtime Database
          const userRef = ref(database, `users/${user.uid}`);
          const userSnapshot = await get(userRef);

          if (userSnapshot.exists()) {
            const userData = userSnapshot.val();
            resolve({
              uid: user.uid,
              email: user.email,
              username: userData.username || 'User',
              type: userData.type || 'C'
            });
          } else {
            resolve({
              uid: user.uid,
              email: user.email,
              username: 'User',
              type: 'C'
            });
          }
        } catch (error) {
          reject(error);
        }
      } else {
        resolve(null);
      }
      unsubscribe();
    }, reject);
  });
};

export const logOut = () => {
  return auth.signOut();
};
