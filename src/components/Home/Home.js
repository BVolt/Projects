import React, {useContext} from 'react'
import {Container} from 'react-bootstrap'
import {Authorization} from '../Authentication/Authorization'
import {Link, useNavigate} from 'react-router-dom'
import './Home.css'
import Footer from '../Footer/Footer'
import watchSnap from '../../assets/watchSnap.png'


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
                <h3>Description</h3>
                    <p>In this application, you can browse from a selection of movies and view their posters, titles, and descriptions. Then the user may create a watch list from the selection. To use these features create an account or use the test account below. </p>
                <h3>Qualifications</h3>
                <p>Watch List is for demonstration purposes only and is not for meant for any commercial uses. I cannot gauruntee the safety of Google's firebase when handling personal emails; therefore, my recommendation if testing authentication functionality is to use either a temporarily generated or made up email.</p>
                <h3>API Credit</h3>
                <p>All movie data is fetched from an external API and all credit for such information goes to The Movie Database.</p>
                <h3>Test Account</h3>
                <h5>Email: user@test.com</h5>
                <h5>Pass: 123456</h5>
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
