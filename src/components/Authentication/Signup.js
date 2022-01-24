import React, {useContext, useRef, useState} from 'react'
import {Button, Alert} from 'react-bootstrap'
import {Authorization} from './Authorization'
import { Link, useNavigate } from "react-router-dom"
import './auth.css'

//In the sign up function that holds our sign up page
export function Signup() {
  const email = useRef()
  const password = useRef()
  const passwordConfirm = useRef()
  const { signup} = useContext(Authorization)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useNavigate()

  //On submit create a new user with given inputs using our authorization context.
  async function handleSubmit(e) {
    e.preventDefault()

    if (password.current.value !== passwordConfirm.current.value) {
      return setError("Passwords do not match")
    }
    try {
      setError("")
      setLoading(true)
      await signup(email.current.value, password.current.value)  
      history("/")
    } catch {
      setError("Failed to sign up")
    }
    setLoading(false)
  }

  //Return Jsx for form structure.
  return (
    <>
      <div className="auth">
        <div className="auth-form">
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input className="auth-inputs" type="email" ref={email} required />
            <label>Password</label>
            <input className="auth-inputs" name="pass" type="password" ref={password} required />
            <label>Password Confirmation</label>
            <input className="auth-inputs" name="pass-con" type="password" ref={passwordConfirm} required />
            <Button disabled={loading} className="w-100 btn-dark" type="submit">
              Sign Up
            </Button>
          </form>
          <div className="w-100 text-center mt-2">
            Already have an account? <Link to="/Login">Log In</Link>
          </div>
        </div>
      </div>
    </>
  )
}
