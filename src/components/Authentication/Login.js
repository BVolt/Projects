import React, {useContext, useRef, useState} from 'react'
import {Button, Alert} from 'react-bootstrap'
import {Authorization} from './Authorization'
import './auth.css'
import { Link, useNavigate } from "react-router-dom"

//This component holds our login page and form.
export function Login() {
  const email = useRef()
  const password = useRef()
  const { login } = useContext(Authorization)
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  //On submit of login our authentication functions are called from our context.
  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await login(email.current.value, password.current.value)
      navigate('/')   
    } catch {
      setError("Failed to sign in")
    }
    setLoading(false)
  }

  //Returns Jsx that structures our login page and form.
  return (
    <>
    <div className="auth">
      <div className="auth-form">
          <h2 className="text-center mb-4">Login</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input className="auth-inputs" type="email" ref={email} required />
            <label>Password</label>
            <input className="auth-inputs"  type="password" ref={password} required />
            <Button disabled={loading} className="w-100 btn-dark" type="submit">
              Log In
            </Button>
          </form>
          <div className="w-100 text-center mt-3">
            <Link to="/passReset">Forgot Password?</Link>
          </div>
          <div className="text-center">
            Need an account? <Link to="/Signup">Sign Up</Link>
          </div>
      </div>
    </div>
    </>
  )
}
