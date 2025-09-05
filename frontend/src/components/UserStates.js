import React from "react";
import "./styles/UserStates.css";

function UserStates({ states }) {
    return (
        <div className="user-states-card card p-3" style={{ background: "var(--secondary-color)", color: "var(--text-color)" }}>
            <h4 className="mb-2">User States</h4>
            <div className="mb-2"><strong>Status:</strong> {states.online ? "Online" : "Offline"}</div>
            <div className="mb-2"><strong>Last Active:</strong> {new Date(states.lastActive).toLocaleString()}</div>
            <div className="mb-2"><strong>Status Message:</strong> {states.statusMessage}</div>
            <div className="mb-2"><strong>Projects:</strong> {states.numberOfProjects}</div>
            <div className="mb-2"><strong>Friends:</strong> {states.numberOfFriends}</div>
            <div className="mb-2"><strong>Achievements:</strong> {states.achievements.join(", ")}</div>
            <div className="mb-2"><strong>Join Date:</strong> {new Date(states.joinDate).toLocaleDateString()}</div>
            <div className="mb-2"><strong>Badges:</strong> {states.badges.map(badge => <span key={badge} className="badge bg-primary me-1">{badge}</span>)}</div>
            <div className="mb-2"><strong>Skills:</strong> {states.skills.join(", ")}</div>
            <div className="mb-2"><strong>Interests:</strong> {states.interests.join(", ")}</div>
        </div>
    );
}

export default UserStates;
