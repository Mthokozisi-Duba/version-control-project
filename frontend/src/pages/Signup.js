/*
Name: Mthokozisi Duba
Student number: u24690059
Position: 51
*/

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "../api/authApi";

function Signup() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    function userNameCheck(username) {
        return username.length >= 3;
    }

    function emailCheck(email) {
        // Simple email regex
        return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
    }

    function passwordCheck(password) {
        // At least 8 chars, one uppercase, one lowercase, one number, one special char
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/.test(password);
    }

    function confirmPasswordCheck(password, confirmPassword) {
        return password === confirmPassword;
    }

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!userNameCheck(form.username)) {
            setError("Username must be at least 3 characters.");
            return;
        }
        if (!emailCheck(form.email)) {
            setError("Please enter a valid email address.");
            return;
        }
        if (!passwordCheck(form.password)) {
            setError("Password must be at least 8 characters, include uppercase, lowercase, a number, and a special character.");
            return;
        }
        if (!confirmPasswordCheck(form.password, form.confirmPassword)) {
            setError("Passwords do not match.");
            return;
        }
        
        setError("");
        setLoading(true);
        
        try {
            await authApi.signup({
                username: form.username,
                email: form.email,
                password: form.password
            });
            await authApi.login(form.username, form.password);
            navigate('/home');
        } catch (err) {
            setError(err.message || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen gradient-primary flex items-center justify-center p-4">
            <form className="card max-w-md w-full" onSubmit={handleSubmit}>
                <h2 className="text-center mb-6 text-text-primary">Sign Up</h2>

                <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-medium mb-2 text-text-primary">Username</label>
                    <input 
                        type="text" 
                        id="username" 
                        name="username" 
                        className="input" 
                        required 
                        value={form.username} 
                        onChange={handleChange}
                        disabled={loading}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium mb-2 text-text-primary">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        className="input" 
                        required 
                        value={form.email} 
                        onChange={handleChange}
                        disabled={loading}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium mb-2 text-text-primary">Password</label>
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

                <div className="mb-6">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2 text-text-primary">Confirm Password</label>
                    <input 
                        type="password" 
                        id="confirmPassword" 
                        name="confirmPassword" 
                        className="input" 
                        required 
                        value={form.confirmPassword} 
                        onChange={handleChange}
                        disabled={loading}
                    />
                </div>

                <div className="flex gap-2 mb-4">
                    <button type="submit" className="btn btn-primary flex-1" disabled={loading}>
                        {loading ? 'Creating Account...' : 'Register'}
                    </button>
                    <button 
                        type="button" 
                        className="btn btn-secondary flex-1" 
                        onClick={() => { 
                            setForm({ username: "", email: "", password: "", confirmPassword: "" }); 
                            setError(""); 
                        }}
                        disabled={loading}
                    >
                        Reset
                    </button>
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <Link to="/signin" className="text-center block text-accent hover:text-accent-dark">
                    Already have an account? Log in
                </Link>
            </form>
        </main>
    );
}

export default Signup;