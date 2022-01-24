import React, {useContext, useState} from 'react'
import {Authorization} from '../Authentication/Authorization'
import {NavDropdown, Alert} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import './Nav.css'

//This is the navigation bar component.
const Navigation = () => {
    const [error, setError] = useState('')
    const {currentUser, logout, signup} = useContext(Authorization)

    //Logout function for the profile drop down
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
        {error && <Alert variant="danger">{error}</Alert>}
        </>
    )
}

export default Navigation
