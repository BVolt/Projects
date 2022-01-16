import React, {useState, useEffect} from 'react'
import {Card, Button, Alert, Container} from 'react-bootstrap'
import {useAuth} from './Authentication/Authorization'
import {Link, useNavigate} from 'react-router-dom'
import './Home.css'

const Home = () => {
    const {currentUser} = useAuth()
    const navigate = useNavigate()


    return <>
    <section className="home">
        <h1>Welcome to Watch List!</h1>
        <Container className="align-items-center justify-content-center">
        <div className="home-contents">
        <Card className="home-card">
            <p style ={{textAlign: "center"}}> This site allows 
            you to create your personal movie watch list. Just sign up and choose 
            the movies you are most interested in to be saved to your list.
            Latest Movies are brought to you by The Movie Database APInfjksadnfbsdajbnfkasbfkjnhfkjsaffaskljfasf
            jsafkljsadfjlasj;fklajsfkljalfjlkasdjflajflkjaslkfdjlkajflksadjflkjasfja
            aslnfjasdklfjhgjhhbgaibhjkgbhkjahghajlkghjkahgkjahsgjhas;jhgjkdshglkjas klgjas
            \gljansgdkjakghak;sdhgkjlahglkjsadhbgkljsadhgjkashglkasdhgjklashgasgas
            gajkasbdgkjahg;ashgkjsdhaghagkjhsag;jhasg;jhgjk;ahsgjkhaglsaggakjhgalg
            agkjdhsagkjlhglkashgl;ahjglahglksdahg</p>
        </Card>
        {currentUser ? 
            <Container>
                <Link to="/Browse" className="btn btn-dark w-50 mt-3">Browse</Link>
                <Link to="/MyList" className="btn btn-dark w-50 mt-3">My List</Link>
            </Container>
            :
            <Container>
                <Link to="/Login" className="btn btn-dark w-50 mt-3" >Login</Link>
                <Link to="/Signup"className="btn btn-dark w-50 mt-3" >Sign Up</Link>
            </Container>
            }
        </div>
        </Container>
    </section>
    </>
}

export default Home
