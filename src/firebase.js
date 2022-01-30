import firebase from "firebase/app"
import 'firebase/firestore'
import "firebase/auth"

export const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_KEY,
  authDomain: process.env.REACT_APP_DOMAIN,
  projectId: process.env.REACT_APP_ID,
  storageBucket: process.env.REACT_APP_BUCKET,
  messagingSenderId: process.env.REACT_APP_SENDER,
  appId: process.env.REACT_APP_APP
})

export const authorize = app.auth();
export default app