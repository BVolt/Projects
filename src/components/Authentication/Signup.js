import React, {useRef, useState} from 'react'
import {Form, Button, Card, Alert, Container} from 'react-bootstrap'
import firebase from 'firebase/compat/app'
import {useAuth} from './Authorization'
import {doc, setDoc} from "firebase/firestore"
import { Link, useNavigate } from "react-router-dom"

export function Signup() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup, currentUser } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useNavigate()
  const database = firebase.firestore();

  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }
    try {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)  
      await setDoc(doc(database, "Lists",`${currentUser.email}`),{
        watchList: []
      })
      history("/")
    } catch {
      setError("Failed to sign up")
    }

    setLoading(false)
  }

  return (
    <>
      <div className="auth">
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100 btn-dark" type="submit">
              Sign Up
            </Button>
          </Form>
          <div className="w-100 text-center mt-2">
            Already have an account? <Link to="/Login">Log In</Link>
          </div>
        </Card.Body>
      </Card>
    </div>
    </>
  )
}
