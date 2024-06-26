// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQLt5OJyDcn53ZVC-cfBlvTYKBqvPZLRY",
  authDomain: "vite-contact-3265c.firebaseapp.com",
  projectId: "vite-contact-3265c",
  storageBucket: "vite-contact-3265c.appspot.com",
  messagingSenderId: "983154245405",
  appId: "1:983154245405:web:127b76a1b129c600d6ebf4",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

