import React, {useState} from 'react'
import {useAuth} from './Authentication/Authorization'
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom'
import './Nav.css'

const Navigation = () => {
    const [error, setError] = useState('')
    const {currentUser, logout} = useAuth()
    // const navigate = useNavigate()

    async function handleLogout(){
        setError('')
        try {
            await logout()
        } catch{
            setError("Failed to log out")
        }
    }

    return (<>
        <div className="nav">
            <Link to="/">Home</Link>
            <Link to="/Browse">Browse</Link>
            <Link to="/WatchList">Watch List</Link>
            {currentUser ?    
                <div className="profile">           
                <NavDropdown title="Profile">
                    <NavDropdown.Item  className="dropdown" href="/Update">Update Profile</NavDropdown.Item>
                    <NavDropdown.Item  className="dropdown" onClick={handleLogout}>Log Out</NavDropdown.Item>
                </NavDropdown>
                </div>
                :
                <div className="profile">
                <NavDropdown title="Profile">
                    <NavDropdown.Item  className="dropdown" href="/Login">Login</NavDropdown.Item>
                    <NavDropdown.Item  className="dropdown" href="/Signup">Sign Up</NavDropdown.Item>
                </NavDropdown>
                </div>
                }
        </div>
        </>
    )
}

export default Navigation
