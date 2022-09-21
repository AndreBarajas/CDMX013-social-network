/* eslint-disable import/no-unresolved */
// eslint-disable-next-line import/no-unresolved
import {
  getFirestore, collection, addDoc, onSnapshot,
} from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js';
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

/* getDocs(dbRef)
  .then((snapshot) => {
    const post = [];
    snapshot.docs.array.forEach((doc) => {
      post.push({ ...doc.data(), id: doc.id });
    });
    console.log(post);
  })
  .catch((err) => {
    console.log(err.message);
  }); */

onSnapshot(dbRef, (snapshot) => {
  const newstler = [];
  snapshot.forEach((doc) => {
    newstler.push({ ...doc.data(), id: doc.id });
  });
  console.log(newstler);
});
