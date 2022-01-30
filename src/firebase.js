import firebase from "firebase/app"
import 'firebase/firestore'
import "firebase/auth"

export const app = firebase.initializeApp({
  apiKey: process.env.KEY,
  authDomain: process.env.DOMAIN,
  projectId: process.env.ID,
  storageBucket: process.env.BUCKET,
  messagingSenderId: process.env.SENDER,
  appId: process.env.APP 
})

export const authorize = app.auth();
export default app