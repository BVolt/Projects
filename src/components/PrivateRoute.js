import React, {useContext} from 'react'
import {Route, Navigate} from 'react-router-dom'
import {Authorization} from './Authentication/Authorization'

//Determines if there is a current user to be able to use private route
const PrivateRoute = ({children}) => {
    const {currentUser} = useContext(Authorization)

    return currentUser ? children : <Navigate to="/Login"/>
}

export default PrivateRoute
