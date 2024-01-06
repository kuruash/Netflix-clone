import React, { useEffect, useState } from 'react';
import "./Nav.css";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function Nav() {

    const [show, handleShow] = useState(false);
    const history = useHistory();

    const transitionNavBar = () => {
        if (window.scrollY > 100) {
            handleShow(true);
        } else {
            handleShow(false);
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", transitionNavBar);
        return () => window.removeEventListener('scroll', transitionNavBar);
    }, []);

    return (
        <div className = {`nav ${show && "nav_black"}`}>
            <div className = "nav_contents">
                <img 
                onClick = {() => history.push("/")}
                className = "nav_logo"
                src = "https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
                alt = "" 
                />

                <img
                onClick = {() => history.push("/profile")}
                className = "nav_avatar"
                src = "https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg"
                alt = ""
                />
            </div>
        </div>
    )
}

export default Nav;