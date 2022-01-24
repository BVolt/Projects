import firebase from "firebase/app"
import 'firebase/firestore'
import "firebase/auth"

export const app = firebase.initializeApp({
  apiKey: "AIzaSyBvZyp69qen6G1uE4grOgdfgwRGaDfOgj8",
  authDomain: "watch-list-fb3a1.firebaseapp.com",
  projectId: "watch-list-fb3a1",
  storageBucket: "watch-list-fb3a1.appspot.com",
  messagingSenderId: "981674581597",
  appId: "1:981674581597:web:9018c469fa7c758776f7b4"
})

export const authorize = app.auth();
export default app