import React, {useContext,useRef, useState} from 'react'
import {Button, Alert} from 'react-bootstrap'
import {Authorization} from './Authorization'
import { Link } from "react-router-dom"
import './auth.css'

//This component holds our password reset page.
export function PassReset() {
  const email = useRef()
  const { resetPassword } = useContext(Authorization)
  const [error, setError] = useState()
  const [message, setMessage] = useState()
  const [loading, setLoading] = useState(false)

  //On submit calls our reset password function from our authorization context.
  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setMessage('')
      setError("")
      setLoading(true)
      await resetPassword(email.current.value)  
      setMessage('Check your inbox for further instructions')
    } catch {
      setError("Failed to reset password")
    }
    setLoading(false)
  }

  //Jsx returns our form structure.
  return (
    <>
      <div className="auth">
        <div className="auth-form">
          <h2 className="text-center mb-4">Password Reset</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input className="auth-inputs" type="email" ref={email} required />
            <Button disabled={loading} className="w-100 btn-dark" type="submit">
              Reset Password
            </Button>
          </form>
          <div className="w-100 text-center mt-3">
            <Link to="/Login">Login</Link>
          </div>
          <div className="w-100 text-center mt-2">
            Need an account? <Link to="/Signup">Sign Up</Link>
          </div>
        </div>
      </div>
    </>
  )
}
