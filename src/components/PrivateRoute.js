import React from 'react'
import {Route, Navigate} from 'react-router-dom'
import {useAuth} from './Authentication/Authorization'

const PrivateRoute = ({children}) => {
    const {currentUser} = useAuth()

    return currentUser ? children : <Navigate to="/Login"/>
}

export default PrivateRoute
