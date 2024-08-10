import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, query, orderByChild, equalTo, get } from "firebase/database";
import { addUserToDatabase } from './database';
import app from './firebaseConfig';

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

export const logIn = async (username, password) => {
  try {
    const usernameQuery = query(ref(database, 'users'), orderByChild('username'), equalTo(username));
    const snapshot = await get(usernameQuery);

    if (snapshot.exists()) {
      const userData = snapshot.val();
      const userKey = Object.keys(userData)[0];
      const email = userData[userKey].email;

      // Assume signInWithEmailAndPassword is used but only username was provided
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Retrieve additional user details
      const userRef = ref(database, `users/${user.uid}`);
      const userSnapshot = await get(userRef);

      if (userSnapshot.exists()) {
        const userData = userSnapshot.val();
        return {
          uid: user.uid,
          email: user.email,
          type: userData.type || 'C',
          username: userData.username || 'User'
        };
      } else {
        return {
          uid: user.uid,
          email: user.email,
          type: 'C',
          username: 'User'
        };
      }
    } else {
      throw new Error('Username not found');
    }
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
