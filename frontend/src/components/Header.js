import React, { useState } from "react";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Header() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);


    // Fetch the token from localStorage or wherever it's stored
    const token = localStorage.getItem("user");
    
    // Set the authorization header
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    
    // Replace this logic with your actual user authentication check
    // For example, you can check localStorage or a session token.
    // Here, we assume localStorage contains a user object if authenticated.
    const checkUserAuthentication = () => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser);
        }
    };

    // Call the authentication check when the component mounts
    React.useEffect(() => {
        checkUserAuthentication();
    }, []);

    const onLogout = () => {
        // Implement your logout logic, which may involve clearing localStorage or session
        // Here, we assume a simple clear of localStorage.
        localStorage.removeItem("user");
        setUser(null);
        navigate("/");
    };

    return (
        <header className="header">
            <div className="logo">
                <Link to="/">Image Gallery</Link>
            </div>
            <ul>
                {user ? (
                    <li>
                        <button className="btn" onClick={onLogout}>
                            <FaSignOutAlt /> Logout
                        </button>
                    </li>
                ) : (
                    <>
                        <li>
                            <Link to="/login">
                                <FaSignInAlt /> Login
                            </Link>
                        </li>
                        <li>
                            <Link to="/register">
                                <FaUser /> Register
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </header>
    );
}

export default Header;
