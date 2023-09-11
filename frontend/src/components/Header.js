import React from "react";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function Header({ setAuthenticated, authenticated }) {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));
    

    const onLogout = () => {
        localStorage.removeItem("user");
        setAuthenticated(false);
        navigate("/login");
    };

    return (
        <header className="header">
            <div className="logo">
                <Link to="/">Image Gallery</Link>
            </div>
            <ul>
                {authenticated ? (
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
