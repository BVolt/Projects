import React, {useContext} from 'react'
import {Container} from 'react-bootstrap'
import {Authorization} from '../Authentication/Authorization'
import {Link, useNavigate} from 'react-router-dom'
import './Home.css'
import Footer from '../Footer/Footer'
import watchSnap from '../../assets/watchSnap.jpg'


//This is the Home Page Components
const Home = () => {
    //Here are user is assigned from our authorization import
    const {currentUser} = useContext(Authorization)

    //Jsx is returned with conditional render based on current user.
    //Bootstrap cards and container are used. React Router Link is used
    return <>
    <section className="home">
        <h1>Welcome to Watch List!</h1>
        <div className="home-contents">
            <div className="home-card">
                <img className="home-image" src={watchSnap} />
            </div>
            <div className="home-card">
                <p>In this Web application, you can browse from a selection of movies then add movies that interest you to your personal watch list.
                    Just sign up with an email address and you are ready to go! Already have an account? Log in and 
                    get started building your watch list.
                    If you do not desire an account and would like to use the site for demonstration purposes then log in with the following credentials:
                </p>
                <p>Email: user@test.com</p>
                <p>Pass: 123456</p>
            </div>
            {currentUser ? 
                <div className="home-buttons">
                    <Link to="/Browse" className="btn-dark">Browse</Link>
                    <Link to="/WatchList" className="btn-dark">Watch List</Link>
                </div>
                :
                <div className="home-buttons">
                    <Link to="/Login" className="btn-dark" >Login</Link>
                    <Link to="/Signup"className="btn-dark" >Sign Up</Link>
                </div>
                }
            </div>
    </section>
    <Footer/>
    </>
}

export default Home
