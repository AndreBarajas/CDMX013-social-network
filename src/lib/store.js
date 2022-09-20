// eslint-disable-next-line import/no-unresolved
import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js';
import { app } from './config.js';

// Inicializamos Firestore
const db = getFirestore(app);
const dbRef = collection(db, 'post');
export const posts = (data) => addDoc(dbRef, data)
  .then((docRef) => {
    console.log('Document has been added successfully');
  })
  .catch((error) => {
    console.log(error);
  });
