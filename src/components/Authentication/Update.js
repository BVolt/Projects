import React, {useContext,useRef, useState} from 'react'
import {Button, Alert} from 'react-bootstrap'
import {Authorization} from './Authorization'
import firebase from 'firebase/app'
import { Link, useNavigate } from "react-router-dom"
import './auth.css'

//This component is our update page.
export function Update() {
    const email = useRef()
    const password = useRef()
    const passwordConfirm = useRef()
    const {currentUser, updateEmail, updatePassword, deleteAccount} = useContext(Authorization)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [del, setDel] = useState(false)
    const history = useNavigate()

  //On sumbit change the values of the users email and/or password using our authorization context
 function handleSubmit(e) {
    e.preventDefault()
    if (password.current.value !== passwordConfirm.current.value) {
      return setError("Passwords do not match")
    }

    const promises = []
    setLoading(true)
    setError("")
    
    if(email.current.value !== currentUser.email) {
        promises.push(updateEmail(email.current.value))
    }
    if(password.current.value !== currentUser.email) {
        promises.push(updatePassword(password.current.value))
    }

    Promise.all(promises).then(()=>{
        history('/')
    }).catch(()=>{
        setError('Failed to update account')
    }).finally(()=>{
        setLoading(false)
    })
  }

  async function deleteAcc(){
    setLoading(true)
    setError('')
    try{
      await firebase.firestore()
      .collection("Lists").doc(`${currentUser.email}`).delete()
      deleteAccount()
    }catch(err){
      setError('Could not delete account')
    }
  }

  //Return Jsx for form structure.
  return (
    <>
      <div className="auth">
        <div className="auth-form">
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {del && <Alert variant="danger">Are you sure you want to delete your account?</Alert>}
          {del && <Button className="btn-danger" onClick={deleteAcc}>Delete</Button>}
          {del && <Button className="btn-dark" onClick={()=>setDel(false)}>Cancel</Button>}
          <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input className="auth-inputs" type="email" ref={email} required defaultValue={currentUser.email}/>
            <label>Password</label>
            <input className="auth-inputs" name="pass" type="password" ref={password} required/>
            <label>Password Confirmation</label>
            <input className="auth-inputs" name="pass-con" type="password" ref={passwordConfirm} required/>
            <Button disabled={loading} className="w-100 btn-dark" type="submit">
              Update
            </Button>
          </form>
          <div className="w-100 text-center mt-2">
            {(currentUser.email !== 'user@test.com')&& !del &&
            <Button disabled={loading} className="w-100 btn-danger" onClick={()=>setDel(true)}>
              Delete Profile
            </Button>
            } 
            <Link to="/">Cancel</Link>
          </div>
        </div>
      </div>
    </>
  )
}

