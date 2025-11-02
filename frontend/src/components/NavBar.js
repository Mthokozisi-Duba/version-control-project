/*
Name: Mthokozisi Duba
Student number: u24690059
Position: 51
*/

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "../api/authApi";

function NavBar() {
    const navigate = useNavigate();
    const isAuthenticated = authApi.isAuthenticated();
    const currentUser = authApi.getCurrentUser();

    const handleLogout = async () => {
        await authApi.logout();
        navigate('/signin');
    };

	return (
        <nav className="navbar bg-primary text-white shadow-lg">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <Link className="text-2xl font-bold text-white hover:text-accent" to={isAuthenticated ? "/home" : "/"}>
                    Night Owl Devs
                </Link>
                {isAuthenticated ? (
                    <ul className="flex gap-6 items-center">
                        <li>
                            <Link className="nav-link" to="/home">Home</Link>
                        </li>
                        <li>
                            <Link className="nav-link" to={`/profile/${currentUser?.id || ''}`}>Profile</Link>
                        </li>
                        <li className="text-text-primary font-medium">
                            <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            {currentUser?.username || 'User'}
                        </li>
                        <li>
                            <button className="nav-link" onClick={handleLogout}>
                                <svg className="w-5 h-5 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                Logout
                            </button>
                        </li>
                    </ul>
                ) : (
                    <ul className="flex gap-4 items-center">
                        <li>
                            <Link className="nav-link" to="/signin">Sign In</Link>
                        </li>
                        <li>
                            <Link className="btn btn-outline border-white text-white hover:bg-white hover:text-primary px-4 py-2" to="/signup">
                                Sign Up
                            </Link>
                        </li>
                    </ul>
                )}
            </div>
        </nav>
	);
}

export default NavBar;
