import React, { useState } from "react";
import ProjectDisplay from "../components/ProjectDisplay";
import FriendsDisplay from "../components/FriendsDisplay";
import UserStates from "../components/UserStates";
import "../components/styles/ProjectDisplay.css";
import "../components/styles/FriendsDisplay.css";
import "../components/styles/UserStates.css";

const userExample = {
    username: "johndoe",
    email: "MisterjohnDoe@idk.com",
    projects: [
        { Projectid: 1, name: "Project Alpha" , dateCreated: "2023-01-15", lastUpdated: "2024-06-10",},
        { Projectid: 2, name: "Project Beta" , dateCreated: "2023-03-22", lastUpdated: "2024-05-18",},
        { Projectid: 3, name: "Project Gamma" , dateCreated: "2023-07-30", lastUpdated: "2024-04-25",},
    ],
    friends: [
        { Userid: 1, username: "alice" },
        { Userid: 2, username: "bob" },
        { Userid: 3, username: "charlie" },
    ],
    states: {
        online: true,
        lastActive: "2024-06-15T10:30:00Z",
        statusMessage: "Coding away!",
        numberOfProjects: 3,
        numberOfFriends: 3,
        achievements: ["First Project", "100 Commits", "Top Contributor"],
        joinDate: "2022-11-05",
        badges: ["Newbie", "Intermediate", "Pro"],
        skills: ["JavaScript", "React", "Node.js"],
        interests: ["Open Source", "Web Development", "AI"],
    },
};

function Profile() {
    const [editMode, setEditMode] = useState(false);
    const [user, setUser] = useState(userExample);
    const [editForm, setEditForm] = useState({ username: user.username, email: user.email });

    function handleEdit() {
        setEditMode(true);
    }
    function handleCancel() {
        setEditMode(false);
        setEditForm({ username: user.username, email: user.email });
    }
    function handleChange(e) {
        setEditForm({ ...editForm, [e.target.name]: e.target.value });
    }
    function handleSave(e) {
        e.preventDefault();
        setUser({ ...user, username: editForm.username, email: editForm.email });
        setEditMode(false);
    }

    return (
        <main className="profile-main container-fluid">
            <div className="row g-4">
                <aside className="col-lg-4 col-md-5 profile-sidebar">
                    <div className="card p-4 mb-4">
                        <h2 className="mb-3">Your Profile</h2>
                        <div id="user-info">
                            <p><strong>Username:</strong> {user.username}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <button className="btn btn-primary me-2" onClick={handleEdit}>Edit Profile</button>
                            <button className="btn btn-outline-danger">Logout</button>
                        </div>
                        {editMode && (
                            <div id="edit-user-profile" className="mt-3">
                                <form onSubmit={handleSave} className="d-flex flex-column gap-2">
                                    <label htmlFor="edit-username" className="form-label">Username</label>
                                    <input type="text" id="edit-username" name="username" className="form-control" value={editForm.username} onChange={handleChange} />
                                    <label htmlFor="edit-email" className="form-label">Email</label>
                                    <input type="email" id="edit-email" name="email" className="form-control" value={editForm.email} onChange={handleChange} />
                                    <div className="d-flex gap-2 mt-2">
                                        <button type="submit" className="btn btn-success">Save</button>
                                        <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
                                    </div>
                                </form>
                            </div>
                        )}
                        <div id="user-states" className="mt-4">
                            <UserStates states={user.states} />
                        </div>
                        <div id="user-friends" className="mt-4">
                            <FriendsDisplay friends={user.friends} />
                        </div>
                    </div>
                </aside>
                <section className="col-lg-8 col-md-7 profile-projects">
                    <div className="card p-4">
                        <h2 className="mb-3">Your Projects</h2>
                        <div className="mb-3">
                            <input type="search" className="form-control" placeholder="Search project..." />
                        </div>
                        <div className="project-list">
                            {user.projects.map(project => (
                                <ProjectDisplay key={project.Projectid} project={project} />
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}

export default Profile;