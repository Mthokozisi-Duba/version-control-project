import React from "react";
import "./styles/FriendsDisplay.css";

function FriendsDisplay({ friends }) {
    return (
        <div className="friends-display-card card p-3" style={{ background: "var(--secondary-color)", color: "var(--text-color)" }}>
            <h4 className="mb-2">Friends</h4>
            <ul className="list-group list-group-flush">
                {friends.map(friend => (
                    <li key={friend.Userid} className="list-group-item" style={{ background: "var(--secondary-color)", color: "var(--text-color)" }}>
                        <span className="fw-bold">{friend.username}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FriendsDisplay;
