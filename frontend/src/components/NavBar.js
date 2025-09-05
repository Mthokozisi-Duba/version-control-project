import React from "react";
import { Link } from "react-router-dom";

import "./styles/NavBar.css";

function NavBar() {
	return (
        <nav className="navbar navbar-expand-lg navbar-custom">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Night Owl Devs</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item"><Link className="nav-link" to="/home">Home</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/project/project75">Project</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/profile/john">Profile</Link></li>
                    </ul>
                    <span className="navbar-icon"><i className="bi bi-bell"></i></span>
                </div>
            </div>
        </nav>
	);
}

export default NavBar;
