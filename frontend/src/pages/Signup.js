import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles/Signup.css";

function Signup() {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [error, setError] = useState("");

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

    function handleSubmit(e) {
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
    }

    return (
        <main className="signup-container">
            <form className="signup-form" onSubmit={handleSubmit}>
                <h2 className="signup-title">Sign Up</h2>

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

                <div className="form-group">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" className="form-control w-100" required value={form.confirmPassword} onChange={handleChange} />
                </div>

                <div className="d-flex gap-2 mb-2">
                    <button type="submit" className="btn w-100">Register</button>
                    <button type="reset" className="btn w-100" onClick={() => { setForm({ username: "", email: "", password: "", confirmPassword: "" }); setError(""); }}>Reset</button>
                </div>

                <div id="signup-error" className="text-danger mb-2">{error}</div>

                <Link to="/signin" className="signup-link">Already have an account? Log in</Link>
            </form>
        </main>
    );
}

export default Signup;