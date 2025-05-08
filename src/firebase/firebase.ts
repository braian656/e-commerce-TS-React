// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRTBFUGgRJW7G_ByMZIR2PTO7KsNMxBRQ",
  authDomain: "ecommerce-autenticacion.firebaseapp.com",
  projectId: "ecommerce-autenticacion",
  storageBucket: "ecommerce-autenticacion.firebasestorage.app",
  messagingSenderId: "324301505719",
  appId: "1:324301505719:web:7a054e6d3f8c8f7961f932",
  measurementId: "G-J5472XR2BK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const db = getFirestore(firebaseConfig);
const auth = getAuth(app)
const dataBase = getFirestore(app)

export {auth, dataBase}