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
                <p>Watch List is for demonstration purposes only and is not for meant for any commercial uses. All movie data is fetched from an external API and all credit for such information goes to The Movie Database. In this application, you can browse from a selection of movies then add movies that interest you to your personal watch list. To use the app features an account is need and a test account is provided below. If you would like to create an account to test authentication functionality, then I recommend using either a temporarily generated or made up email. If you decide to use your own personal email you do so at your own risk as data privacy is handled by the third party database firebase and I as the owner of this application can not ensure the security of firebase.
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
