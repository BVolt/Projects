import React, {createContext, useState, useEffect} from 'react'
import "firebase/auth"
import { authorize } from '../../firebase'

//Here we create a context that the application will run within that holds the properties needed for authentication
export const Authorization = createContext()

//Here is our Authority providing component that our app operates within. The previously declared context is used within
export function AuthorityProv({ children }) {
  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState()

  //The following function execture a firebase function that handles the backend authorization
  function login(email, password) {
    return authorize.signInWithEmailAndPassword(email, password)
  }
  function logout() {
    return authorize.signOut()
  }
  function signup(email, password) {
    return authorize.createUserWithEmailAndPassword(email, password)
  }
  function resetPassword(email){
    return authorize.sendPasswordResetEmail(email)
  }
  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }
  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }
  function deleteAccount(){
    return currentUser.delete()
  }

  //Upon loading of the component we use a firebase function to keep our user logged in at all times.
  useEffect(() => {
      const unsub = authorize.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    }) 
    return unsub
  }, [])

  //Return our authorization provider with the properties holding our authorizatio functions and values.
  return (
    <Authorization.Provider 
      value={{
        signup, 
        logout, 
        resetPassword, 
        updateEmail, 
        currentUser, 
        login, 
        updatePassword,
        deleteAccount
      }}>
      {!loading && children}
    </Authorization.Provider>
  )
}