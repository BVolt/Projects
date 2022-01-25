import React from 'react'
import './Footer.css'

const Footer = () => {

    //Returns Jsx for the footer
    return (
        <div className="footer">
            <div className="row">
                <div className="col">
                    <h4>More of My Projects</h4>
                    <ul className="list unstyled">
                        <li>Source: <a href="https://github.com/BVolt/watch-list">https://github.com/BVolt</a></li>
                        <li>Portfolio: <a href=""></a></li>
                    </ul>
                </div>
                <div className="col">
                    <h4>Contact Me</h4>
                    <ul className="list unstyled">
                        <li>LinkedIn: <a href="https://www.linkedin.com/in/brenden-johnson-04b7a821b">My Profile</a></li>
                        <li>Email: <a href="mailto: Brendenj7@hotmail.com">Brendenj7@hotmail.com</a></li>
                    </ul>
                </div>
                <div className="col">
                    <h4>API Credit</h4>
                    <ul className="list unstyled">
                        <li><a href="https://www.themoviedb.org/">The Movie Database</a></li>
                        <img src={require("../../assets/tmdb.jpg")}/>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Footer
