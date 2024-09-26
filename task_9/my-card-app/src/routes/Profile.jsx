import React from "react";
import {useEffect, useState} from "react"; // Hooks
import {getAuth} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'
import '../Profile.css'

function Profile()
{
    const [user, setUser] = useState(null) 
    const navigate = useNavigate()
    const auth = getAuth()

    useEffect (()=> {
        // console.log(auth.currentUser)
        setUser(auth.currentUser)
    } , [auth]) 

    // Logout
    const onLogout = () => {
        auth.signOut()
            .then(() => {
                navigate('/login'); // Login page redirection
            })
            .catch((error) => {
                console.error('Logout Error:', error);
            });
    };
    return (
        <div className="profile-container">
            {user ? (
                <>
                    <h1>{user.email}</h1>
                    <button type="submit" onClick={onLogout} className="profile-button">
                        Log Out
                    </button>
                </>
            ) : (
                <h1>Not logged in</h1>
            )}
        </div>
    );
}

export default Profile;