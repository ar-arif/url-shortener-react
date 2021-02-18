import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyALtATam91H77xCSX7an0vFdl_ej4gCjXE",
  authDomain: "url-shortener-c4db0.firebaseapp.com",
  projectId: "url-shortener-c4db0",
  storageBucket: "url-shortener-c4db0.appspot.com",
  messagingSenderId: "172889057099",
  appId: "1:172889057099:web:8489ddfa8541445af9eace",
  measurementId: "G-NJH5SHLP4J"
};

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

export {db, firebase}