// Import the functions you need from the SDKs you need
import { getAuth} from "firebase/auth";
import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCF8BUMQ7eTj1bkGvlOE0Qnxj3E5jxkcfY",
  authDomain: "nailsalonsharon.firebaseapp.com",
  projectId: "nailsalonsharon",
  storageBucket: "nailsalonsharon.appspot.com",
  messagingSenderId: "519909581829",
  appId: "1:519909581829:web:1f23e17ba83a0caf21e86c",
  measurementId: "G-GMCD0KFXWQ"
};

const app = initializeApp(firebaseConfig);

export const database = getFirestore(app);
export const Authentication = getAuth(app);
export const firebase = app;