// import app from "./firebaseConfig";
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// const storage = getStorage(app);

// export const uploadFile = async (file) => {
//   const storageRef = ref(storage, 'some/path/to/file');
//   try {
//     await uploadBytes(storageRef, file);
//     const downloadURL = await getDownloadURL(storageRef);
//     console.log('File available at', downloadURL);
//   } catch (error) {
//     console.error('Error uploading file:', error.message);
//   }
// };
