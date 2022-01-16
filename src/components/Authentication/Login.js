import React, {useRef, useState} from 'react'
import {Form, Button, Card, Alert, Container} from 'react-bootstrap'
import {useAuth} from './Authorization'

import { Link, useNavigate } from "react-router-dom"

export function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      navigate('/')   
    } catch {
      //This executes anyway
      setError("Failed to sign in")
    }
    setLoading(false)
  }

  return (
    <>
    <div className="auth">
      <div className="card">
        <div className="card-body">
          <h2 className="text-center mb-4">Login</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
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
    </div>
    </>
  )
}
