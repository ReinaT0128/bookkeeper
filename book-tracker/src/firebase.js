// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKausYI1R-Ic-vp9ryRMPdh309mrmjQrA",
  authDomain: "book-tracker-53897.firebaseapp.com",
  projectId: "book-tracker-53897",
  storageBucket: "book-tracker-53897.firebasestorage.app",
  messagingSenderId: "311161573282",
  appId: "1:311161573282:web:5cb4f2cd724dc2c807ecfb",
  measurementId: "G-0RVGDKFP01"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);