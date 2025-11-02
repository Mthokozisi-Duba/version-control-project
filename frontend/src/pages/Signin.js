/*
Name: Mthokozisi Duba
Student number: u24690059
Position: 51
*/

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "../api/authApi";

function Signin() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        usernameOrEmail: "",
        password: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    function userNameCheck(username) {
        return username.length >= 3;
    }

    function emailCheck(email) {
        return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
    }

    function passwordCheck(password) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/.test(password);
    }

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setLoading(true);
        
        try {
            await authApi.login(form.usernameOrEmail, form.password);
            navigate('/home'); // Redirect to home after successful login
        } catch (err) {
            setError(err.message || "Login failed. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen gradient-primary flex items-center justify-center p-4">
            <form className="card max-w-md w-full" onSubmit={handleSubmit}>
                <h2 className="text-center mb-6 text-text-primary">Sign In</h2>

                <div className="mb-4">
                    <label htmlFor="usernameOrEmail" className="block text-sm font-medium mb-2 text-text-primary">
                        Username or Email
                    </label>
                    <input 
                        type="text" 
                        id="usernameOrEmail" 
                        name="usernameOrEmail" 
                        className="input" 
                        required 
                        value={form.usernameOrEmail} 
                        onChange={handleChange}
                        disabled={loading}
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="password" className="block text-sm font-medium mb-2 text-text-primary">
                        Password
                    </label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        className="input" 
                        required 
                        value={form.password} 
                        onChange={handleChange}
                        disabled={loading}
                    />
                </div>

                <button type="submit" className="btn btn-primary w-full mb-4" disabled={loading}>
                    {loading ? 'Signing in...' : 'Sign in'}
                </button>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <Link to="/signup" className="text-center block text-accent hover:text-accent-dark">
                    Don't have an account? Sign up
                </Link>
            </form>
        </main>
    );
}

export default Signin;