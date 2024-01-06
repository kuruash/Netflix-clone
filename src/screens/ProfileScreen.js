import React from "react";
import "./ProfileScreen.css";
import Nav from "../Nav";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";
import { auth } from "../firebase";
import PlansScreen from "./PlansScreen";

function ProfileScreen() {

    const user = useSelector(selectUser);

    return <div className = "profileScreen">
        <Nav />
        <div className = "profileScreen_body">
            <h1>Edit Profile</h1>
            <div className = "profileScreen_info">
                <img
                src = "https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg" 
                alt = ""
                />
                <div className = "profileScreen_details">
                    <h2>{user.email}</h2>
                    <div className = "profileScreen_plans">
                        <h3>Plans</h3>

                        <PlansScreen />

                        <button onClick = {() => auth.signOut()} className = "profileScreen_signOut">Sign Out</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default ProfileScreen;
