import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles/Signin.css";

function Signin() {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: ""
    });
    const [error, setError] = useState("");

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

    function handleSubmit(e) {
        e.preventDefault();
        if (!userNameCheck(form.username)) {
            setError("Username must be at least 3 characters long.");
            return;
        }
        if (!emailCheck(form.email)) {
            setError("Please enter a valid email.");
            return;
        }
        if (!passwordCheck(form.password)) {
            setError("Password must be at least 8 characters, include uppercase, lowercase, a number, and a special character.");
            return;
        }
        setError("");
    }

    return (
        <main className="signin-container">
            <form className="signin-form" onSubmit={handleSubmit}>
                <h2 className="signin-title">Sign In</h2>

                <div className="form-group">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" id="username" name="username" className="form-control w-100" required value={form.username} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" id="email" name="email" className="form-control w-100" required value={form.email} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" id="password" name="password" className="form-control w-100" required value={form.password} onChange={handleChange} />
                </div>

                <button type="submit" className="btn w-100">Sign in</button>

                <div id="signin-error" className="text-danger">{error}</div>

                <Link to="/signup" className="signin-link">Don't have an account? Sign up</Link>
            </form>
        </main>
    );
}

export default Signin;