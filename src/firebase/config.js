// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdDgpe71oJiEG437Q4Ad1qly6fTYAkYAQ",
  authDomain: "miniblog-48fed.firebaseapp.com",
  projectId: "miniblog-48fed",
  storageBucket: "miniblog-48fed.appspot.com",
  messagingSenderId: "135102564136",
  appId: "1:135102564136:web:3af3703903bd02cfabb21d",
  measurementId: "G-9GX6KS8E4B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);

export { db };