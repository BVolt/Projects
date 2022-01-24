import React from 'react';
import {Routes, Route, BrowserRouter as Router} from 'react-router-dom'
import Navigation from './components/Nav/Navigation'
import {Signup }from './components/Authentication/Signup'
import {Login} from './components/Authentication/Login'
import Home from './components/Home/Home'
import {AuthorityProv} from './components/Authentication/Authorization'
import PrivateRoute from "./components/PrivateRoute"
import {PassReset} from './components/Authentication/PassReset'
import {Update} from './components/Authentication/Update'
import Browse from './components/MovieLists/Browse'
import WatchList from './components/MovieLists/WatchList'

//In our App component we have our authorization components, and all of the routes.
function App() {
  return (
  <>
    <AuthorityProv>
      <Navigation />   
      <Routes>
        <Route exact path='/' element={<Home />} />   
        <Route exact path='/Login' element={<Login />} />   
        <Route exact path='/Signup' element={<Signup />} />   
        <Route exact path='/passReset' element={<PassReset />} />
        <Route exact path='/update' element={<PrivateRoute><Update /></PrivateRoute>} />
        <Route exact path='/Browse' element={<PrivateRoute><Browse /></PrivateRoute>} />
        <Route exact path='/WatchList' element={<PrivateRoute><WatchList /></PrivateRoute>} />
      </Routes>
    </AuthorityProv>
    </>
  );
}

export default App;