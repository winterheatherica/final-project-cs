import app from "./firebaseConfig"; // Import the initialized Firebase app
import { storage } from './firebaseConfig'; // Import Firebase Storage
import { getDatabase, ref, update, get, push, set } from 'firebase/database'; // Import Firebase Realtime Database functions
import { ref as storageRef, uploadBytes, getDownloadURL, getStorage } from 'firebase/storage'; // Import Firebase Storage functions


// Initialize Realtime Database
const database = getDatabase(app);
const USERS_REF = 'users/';

export const addUserToDatabase = async (user) => {
  try {
    const { uid, email, username } = user;

    // Validasi data
    if (!uid || !email || !username) {
      throw new Error('Invalid user data');
    }

    // Add user data to the database with the provided UID
    await set(ref(database, `${USERS_REF}${uid}`), {
      uid,
      email,
      username,
      type: "C", // Default value for type
      created_at: new Date().toISOString() // Timestamp for creation
    });

    console.log('User data added to Realtime Database');
  } catch (error) {
    console.error('Error adding user data:', error.message);
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const usersRef = ref(database, 'users');
    const snapshot = await get(usersRef);
    if (snapshot.exists()) {
      return snapshot.val(); // Mengembalikan data pengguna sebagai objek
    } else {
      return {}; // Mengembalikan objek kosong jika tidak ada data
    }
  } catch (error) {
    console.error('Error fetching all users:', error.message);
    throw error;
  }
};

export const updateUserType = async (uid, newType) => {
  try {
    const userRef = ref(database, `users/${uid}`);
    await update(userRef, { type: newType });
  } catch (error) {
    console.error('Error updating user type:', error.message);
    throw error;
  }
}
// Fungsi untuk menambah open registration
export const addOpenReg = async (openReg) => {
  try {
    const openRegRef = ref(database, 'tb_open_reg'); // Referensi ke tabel open registration

    // Mengambil nilai `last_open_reg_id` yang ada di Firebase
    const lastOpenRegIdSnapshot = await get(ref(database, 'last_open_reg_id'));
    let lastOpenRegId = lastOpenRegIdSnapshot.exists() ? lastOpenRegIdSnapshot.val() : 0;

    // Auto-increment open_reg_id
    const newOpenRegId = lastOpenRegId + 1;

    // Update nilai `last_open_reg_id` di Firebase
    await set(ref(database, 'last_open_reg_id'), newOpenRegId);

    // Menambahkan `open_reg_id` ke data yang akan disimpan
    const newOpenReg = { ...openReg, open_reg_id: newOpenRegId };

    // Simpan open registration baru
    const newOpenRegRef = push(openRegRef);
    await set(newOpenRegRef, newOpenReg);

    console.log('Open registration added successfully');
  } catch (error) {
    console.error('Error adding open registration:', error);
    throw error;
  }
};


export const getAllOpenRegs = async () => {
  try {
    const openRegRef = ref(database, 'tb_open_reg');
    const snapshot = await get(openRegRef);
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    } else {
      console.log('No open registrations found');
      return [];
    }
  } catch (error) {
    console.error('Error fetching open registrations:', error);
    throw error;
  }
};

export const getUserById = async (uid) => {
  try {
    const userRef = ref(database, `users/${uid}`);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return null; // Return null if user does not exist
    }
  } catch (error) {
    console.error('Error fetching user by UID:', error.message);
    throw error;
  }
};

const PICKED_DATE_ID = '-O3mP9re64TVxQptSGjJ';

export const getPickedDate = async () => {
  try {
    const pickedDateRef = ref(database, `picked_dates/${PICKED_DATE_ID}`);
    const snapshot = await get(pickedDateRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return { open_date: '', close_date: '' };
    }
  } catch (error) {
    console.error('Error fetching picked date:', error.message);
    throw error;
  }
};

export const addPickedDate = async (dates) => {
  try {
    // Gunakan `open_reg_id` sebagai bagian dari path jika perlu
    const pickedDatesRef = ref(database, `picked_dates/${PICKED_DATE_ID}`);
    await set(pickedDatesRef, dates);
    console.log('Picked date updated successfully');
  } catch (error) {
    console.error('Error updating picked date:', error);
    throw error;
  }
};

// export const getOpenRegId = async () => {
//     const db = getDatabase();
//     const dbRef = ref(db);

//     try {
//         const snapshot = await get(child(dbRef, 'open_reg_path')); // Sesuaikan jalur 'open_reg_path' dengan jalur di database Anda
//         if (snapshot.exists()) {
//             return snapshot.val().open_reg_id; // Sesuaikan dengan struktur data Anda
//         } else {
//             console.log("No data available");
//             return null;
//         }
//     } catch (error) {
//         console.error(error);
//         throw error;
//     }
// };

export const getOpenRegIdFromPickedDates = async () => {
  try {
      const snapshot = await get(ref(database, 'picked_dates/'));
      if (snapshot.exists()) {
          // Assuming you want the first record for demonstration purposes
          const data = snapshot.val();
          const firstKey = Object.keys(data)[0]; // Get the first key
          const openRegId = data[firstKey].open_reg_id;
          return openRegId;
      } else {
          console.log('No data available');
          return null;
      }
  } catch (error) {
      console.error('Error fetching open_reg_id:', error);
      throw error;
  }
};

export const getUsernameByUid = async (uid) => {
  try {
    const userRef = ref(database, `users/${uid}`);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      return snapshot.val().username; // Assuming 'username' is a field in your user data
    } else {
      console.log('No user data found for UID:', uid);
      return null;
    }
  } catch (error) {
    console.error('Error fetching username by UID:', error.message);
    throw error;
  }
};

export const getNextRegId = async () => {
  const db = getDatabase();
  const regIdRef = ref(db, 'registration_count');
  const snapshot = await get(regIdRef);

  let nextRegId = 1; // Default starting value

  if (snapshot.exists()) {
      nextRegId = snapshot.val() + 1;
  }

  // Update the registration_count to the next value
  await set(regIdRef, nextRegId);

  return nextRegId;
};


export const saveRegistration = async (registrationData) => {
  try {
    const { open_reg_id, uid, reg_id, reason, programmingLanguages, certif_loc } = registrationData;
    const registrationRef = ref(database, `registrations/${reg_id}`);

    await set(registrationRef, {
      open_reg_id,
      uid,
      reg_id,
      reason,
      programmingLanguages,
      certif_loc
    });

    console.log('Registration data saved successfully');
  } catch (error) {
    console.error('Error saving registration data:', error);
    throw error;
  }
};

export const uploadFile = async (file, open_reg_id, reg_id) => {
  try {
    if (!open_reg_id || !reg_id) {
      throw new Error('Open Registration ID and Registration ID must be provided');
    }

    const sanitizeFileName = (name) => {
      return name.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_\-\.]/g, '');
    };

    const newFileName = `certif_${open_reg_id}_${reg_id}_${sanitizeFileName(file.name)}`;
    const fileRef = storageRef(storage, `certificates/${newFileName}`);
    await uploadBytes(fileRef, file);
    const url = await getDownloadURL(fileRef);
    return url;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

export const addActivity = async (activity, file) => {
  try {
    const { title, desc, uid, division } = activity;

    // Dapatkan activity_id berikutnya
    const activityId = await getNextActivityId();

    // Ambil waktu lokal dalam format ISO string
    const createdAt = new Date().toISOString();

    // Simpan aktivitas ke Firebase Realtime Database
    const db = getDatabase();
    const activityRef = ref(db, `activities/${activityId}`);

    // Simpan gambar jika ada
    let imageUrl = '';
    if (file) {
      // Define image file path
      const storage = getStorage();
      const imagePath = `activities/activity_${division}_${activityId}.jpg`;
      const imageRef = storageRef(storage, imagePath);

      // Upload file ke Firebase Storage
      await uploadBytes(imageRef, file);
      // Dapatkan URL download gambar
      imageUrl = await getDownloadURL(imageRef);
    }

    await set(activityRef, {
      title,
      desc,
      activity_id: activityId,
      division, // Menyimpan nilai satu huruf untuk division
      created_by: uid,
      created_at: createdAt,
      image_url: imageUrl // Simpan URL gambar jika ada
    });

    console.log('Activity added successfully with ID:', activityId);
  } catch (error) {
    console.error('Error adding activity:', error);
    throw error;
  }
};

export const uploadActivityImage = async (file, activityId, division) => {
  try {
    if (!file || !activityId || !division) {
      throw new Error('File, activityId, and division must be provided');
    }

    const sanitizeFileName = (name) => {
      return name.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_\-\.]/g, '');
    };

    const fileName = `activity_${division}_${activityId}_${sanitizeFileName(file.name)}`;
    const fileRef = storageRef(storage, `activities/${fileName}`);
    await uploadBytes(fileRef, file);
    const url = await getDownloadURL(fileRef);
    return url;
  } catch (error) {
    console.error('Error uploading activity image:', error);
    throw error;
  }
};

export const getNextActivityId = async () => {
  const db = getDatabase();
  const counterRef = ref(db, 'activity_counter');
  const snapshot = await get(counterRef);

  let nextActivityId = 1; // Default starting value

  if (snapshot.exists()) {
    nextActivityId = snapshot.val() + 1;
  }

  // Update counter di database ke nilai berikutnya
  await set(counterRef, nextActivityId);

  return nextActivityId;
};

export const fetchActivities = async () => {
  try {
    const db = getDatabase();
    const activitiesRef = ref(db, 'activities');
    const snapshot = await get(activitiesRef);

    if (snapshot.exists()) {
      return snapshot.val(); // Mengembalikan objek aktivitas
    } else {
      return {};
    }
  } catch (error) {
    console.error('Error fetching activities:', error);
    throw error;
  }
};

export const storePickedActivities = async (pickedDivision) => {
  try {
    const db = getDatabase();
    const pickedActivitiesRef = ref(db, 'picked_activities');

    const updates = {};
    pickedDivision.forEach((activityId, index) => {
      const pickedId = `picked_id_${index + 1}`;
      updates[pickedId] = { activity_id: activityId };
    });

    // Menyimpan updates ke database
    await set(pickedActivitiesRef, updates);

    console.log('Picked activities stored successfully:', updates);
  } catch (error) {
    console.error('Error storing picked activities:', error);
    throw error; // Throw error to be caught by the calling function
  }
};

// Function to add an event
export const addEvent = async (event, file) => {
  try {
    const { title, desc, type, date, uid, latitude, longitude, locationName } = event;

    // Dapatkan event_id berikutnya
    const eventId = await getNextEventId();

    // Ambil waktu lokal dalam format ISO string
    const createdAt = new Date().toISOString();

    // Simpan event ke Firebase Realtime Database
    const db = getDatabase();
    const eventRef = ref(db, `events/${eventId}`);

    // Simpan gambar jika ada
    let imageUrl = '';
    if (file) {
      // Define image file path
      const storage = getStorage();
      const imagePath = `events/event_${type}_${eventId}.jpg`;
      const imageRef = storageRef(storage, imagePath);

      // Upload file ke Firebase Storage
      await uploadBytes(imageRef, file);
      // Dapatkan URL download gambar
      imageUrl = await getDownloadURL(imageRef);
    }

    await set(eventRef, {
      title,
      desc,
      event_id: eventId,
      type, // Menyimpan nilai satu huruf untuk type
      date, // Menyimpan tanggal
      created_by: uid,
      created_at: createdAt,
      image_url: imageUrl,
      latitude, // Menyimpan latitude
      longitude, // Menyimpan longitude
      location_name: locationName // Menyimpan nama lokasi
    });
  } catch (error) {
    console.error('Error adding event:', error);
    throw error;
  }
};


// Function to upload an event image
export const uploadEventImage = async (file, eventId, type) => {
  try {
    if (!file || !eventId || !type) {
      throw new Error('File, eventId, and type must be provided');
    }

    const sanitizeFileName = (name) => {
      return name.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_\-\.]/g, '');
    };

    const fileName = `event_${type}_${eventId}_${sanitizeFileName(file.name)}`;
    const fileRef = storageRef(storage, `events/${fileName}`);
    await uploadBytes(fileRef, file);
    const url = await getDownloadURL(fileRef);
    return url;
  } catch (error) {
    console.error('Error uploading event image:', error);
    throw error;
  }
};

// Function to get the next event ID
export const getNextEventId = async () => {
  const db = getDatabase();
  const counterRef = ref(db, 'event_counter');
  const snapshot = await get(counterRef);

  let nextEventId = 1; // Default starting value

  if (snapshot.exists()) {
    nextEventId = snapshot.val() + 1;
  }

  // Update counter in the database to the next value
  await set(counterRef, nextEventId);

  return nextEventId;
};

// Function to fetch events
export const fetchEvents = async () => {
  try {
    const db = getDatabase();
    const eventsRef = ref(db, 'events');
    const snapshot = await get(eventsRef);

    if (snapshot.exists()) {
      return snapshot.val(); // Return event object
    } else {
      return {};
    }
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

// Function to store picked events
export const storePickedEvents = async (pickedEvents) => {
  try {
    const db = getDatabase();
    const pickedEventsRef = ref(db, 'picked_events');

    const updates = {};
    pickedEvents.forEach((eventId, index) => {
      const pickedId = `picked_id_${index + 1}`;
      updates[pickedId] = { event_id: eventId };
    });

    // Save updates to the database
    await set(pickedEventsRef, updates);

    console.log('Picked events stored successfully:', updates);
  } catch (error) {
    console.error('Error storing picked events:', error);
    throw error; // Throw error to be caught by the calling function
  }
};

