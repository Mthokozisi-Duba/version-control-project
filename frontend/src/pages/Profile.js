/*
Name: Mthokozisi Duba
Student number: u24690059
Position: 51
*/

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProjectDisplay from "../components/ProjectDisplay";
import FriendsDisplay from "../components/FriendsDisplay";
import UserStates from "../components/UserStates";
import { authApi } from "../api/authApi";
import { usersApi } from "../api/usersApi";
import { projectsApi } from "../api/projectsApi";

function Profile() {
    const navigate = useNavigate();
    const { userID } = useParams();
    const [editMode, setEditMode] = useState(false);
    const [user, setUser] = useState(null);
    const [projects, setProjects] = useState([]);
    const [friends, setFriends] = useState([]);
    const [editForm, setEditForm] = useState({ username: "", email: "" });
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAddFriendModal, setShowAddFriendModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [searching, setSearching] = useState(false);
    const [sendingRequest, setSendingRequest] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);
                const currentUser = authApi.getCurrentUser();
                const userId = userID || currentUser?.id;
                if (!userId) {
                    navigate("/signin");
                    return;
                }
                const userData = await usersApi.getUserById(userId);
                setUser(userData);
                setEditForm({ username: userData.username, email: userData.email });
                
                // Fetch friend details
                const friendIds = userData.friends || [];
                const friendsData = [];
                for (const friendId of friendIds) {
                    try {
                        const friend = await usersApi.getUserById(friendId.toString ? friendId.toString() : friendId);
                        friendsData.push(friend);
                    } catch (err) {
                        console.warn(`Failed to fetch friend ${friendId}:`, err);
                    }
                }
                setFriends(friendsData);
                
                const allProjects = await projectsApi.getProjects();
                const userProjects = allProjects.filter(p => {
                    const ownerId = typeof p.owner === "object" ? p.owner.toString() : p.owner;
                    const userIdStr = typeof userData._id === "object" ? userData._id.toString() : (userData._id || userId);
                    return ownerId === userIdStr || ownerId === userId;
                });
                setProjects(userProjects);
                setError(null);
            } catch (err) {
                setError(err.message || "Failed to fetch user data");
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, [userID, navigate]);

    function handleEdit() {
        setEditMode(true);
    }
    
    function handleCancel() {
        setEditMode(false);
        setEditForm({ username: user?.username || "", email: user?.email || "" });
        setError(null);
    }
    
    function handleChange(e) {
        setEditForm({ ...editForm, [e.target.name]: e.target.value });
    }
    
    async function handleSave(e) {
        e.preventDefault();
        setSaving(true);
        setError(null);
        try {
            const currentUser = authApi.getCurrentUser();
            const userId = user._id || user.id || currentUser?.id;
            if (userId) {
                await usersApi.updateProfile(userId, {
                    username: editForm.username,
                    email: editForm.email
                });
                const updatedUser = { ...user, username: editForm.username, email: editForm.email };
                setUser(updatedUser);
                if (currentUser) {
                    authApi.updateCurrentUser({
                        username: editForm.username,
                        email: editForm.email
                    });
                }
                setEditMode(false);
            }
        } catch (err) {
            setError(err.message || "Failed to update profile");
        } finally {
            setSaving(false);
        }
    }

    async function handleLogout() {
        try {
            await authApi.logout();
            navigate("/signin");
        } catch (err) {
            console.error("Logout failed:", err);
            navigate("/signin");
        }
    }

    async function handleSearchUsers() {
        if (!searchQuery.trim()) {
            setSearchResults([]);
            return;
        }

        setSearching(true);
        setError(null);
        try {
            console.log('Searching for users with query:', searchQuery);
            const results = await usersApi.searchUsers(searchQuery);
            console.log('Search results:', results);
            
            // Filter out current user and existing friends
            const currentUserId = user?._id?.toString() || user?.id;
            const friendIds = (user?.friends || []).map(f => f.toString());
            
            console.log('Current user ID:', currentUserId);
            console.log('Friend IDs:', friendIds);
            
            const filteredResults = results.filter(u => {
                const userId = u._id?.toString() || u.id;
                return userId !== currentUserId && !friendIds.includes(userId);
            });
            
            console.log('Filtered results:', filteredResults);
            setSearchResults(filteredResults);
        } catch (err) {
            console.error('Search error:', err);
            setError(err.message || "Failed to search users");
        } finally {
            setSearching(false);
        }
    }

    async function handleSendFriendRequest(toUserId) {
        setSendingRequest(true);
        setError(null);
        try {
            const currentUser = authApi.getCurrentUser();
            console.log('Current user:', currentUser);
            console.log('Adding friend from:', currentUser.id, 'to:', toUserId);
            
            if (!currentUser || !currentUser.id) {
                throw new Error('You must be logged in to add friends');
            }
            
            await usersApi.addFriend(toUserId, currentUser.id);
            
            // Remove from search results
            setSearchResults(prev => prev.filter(u => (u._id?.toString() || u.id) !== toUserId));
            
            // Refresh user data to show updated friends list
            const userId = currentUser.id;
            const userData = await usersApi.getUserById(userId);
            setUser(userData);
            
            // Fetch updated friends details
            const friendIds = userData.friends || [];
            const friendsData = [];
            for (const friendId of friendIds) {
                try {
                    const friend = await usersApi.getUserById(friendId.toString ? friendId.toString() : friendId);
                    friendsData.push(friend);
                } catch (err) {
                    console.warn(`Failed to fetch friend ${friendId}:`, err);
                }
            }
            setFriends(friendsData);
            
            setShowAddFriendModal(false);
            setSearchQuery('');
            setSearchResults([]);
        } catch (err) {
            console.error('Add friend error:', err);
            setError(err.message || "Failed to add friend");
        } finally {
            setSendingRequest(false);
        }
    }

    if (loading) {
        return (
            <main className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-2">Loading profile...</div>
                    <div className="text-text-secondary">Please wait</div>
                </div>
            </main>
        );
    }

    if (error || !user) {
        return (
            <main className="min-h-screen bg-background flex items-center justify-center">
                <div className="card max-w-md text-center">
                    <div className="text-2xl font-bold text-red-600 mb-2">Error</div>
                    <div className="text-text-secondary mb-4">{error || "User not found"}</div>
                    <button onClick={() => navigate("/home")} className="btn btn-primary">
                        Back to Home
                    </button>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-12 gap-6">
                    <aside className="lg:col-span-4">
                        <div className="card mb-6">
                            <h2 className="text-2xl font-bold text-primary mb-4">Your Profile</h2>
                            <div id="user-info" className="space-y-3">
                                <p className="text-text-secondary"><strong className="text-primary">Username:</strong> {user?.username}</p>
                                <p className="text-text-secondary"><strong className="text-primary">Email:</strong> {user?.email}</p>
                                <div className="flex gap-2 mt-4">
                                    <button className="btn btn-primary" onClick={handleEdit}>Edit Profile</button>
                                    <button className="btn btn-outline" onClick={() => {
                                        setShowAddFriendModal(!showAddFriendModal);
                                        setSearchQuery('');
                                        setSearchResults([]);
                                        setError(null);
                                    }}>
                                        {showAddFriendModal ? "Cancel" : "Add Friend"}
                                    </button>
                                    <button className="btn border-red-500 text-red-500 hover:bg-red-500 hover:text-white" onClick={handleLogout}>Logout</button>
                                </div>
                            </div>
                            {editMode && (
                                <div id="edit-user-profile" className="mt-4 pt-4 border-t border-gray-200">
                                    {error && (
                                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                                            {error}
                                        </div>
                                    )}
                                    <form onSubmit={handleSave} className="space-y-4">
                                        <div>
                                            <label htmlFor="edit-username" className="block text-sm font-medium text-primary mb-1">Username</label>
                                            <input type="text" id="edit-username" name="username" className="input" value={editForm.username} onChange={handleChange} required />
                                        </div>
                                        <div>
                                            <label htmlFor="edit-email" className="block text-sm font-medium text-primary mb-1">Email</label>
                                            <input type="email" id="edit-email" name="email" className="input" value={editForm.email} onChange={handleChange} required />
                                        </div>
                                        <div className="flex gap-2">
                                            <button type="submit" className="btn btn-primary" disabled={saving}>
                                                {saving ? "Saving..." : "Save"}
                                            </button>
                                            <button type="button" className="btn btn-outline" onClick={handleCancel} disabled={saving}>Cancel</button>
                                        </div>
                                    </form>
                                </div>
                            )}
                            {showAddFriendModal && (
                                <div id="add-friend-form" className="mt-4 pt-4 border-t border-gray-200">
                                    <h3 className="text-lg font-bold text-primary mb-3">Add Friend</h3>
                                    {error && (
                                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                                            {error}
                                        </div>
                                    )}
                                    <div className="mb-4">
                                        <label htmlFor="search-username" className="block text-sm font-medium text-primary mb-2">
                                            Search by username
                                        </label>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                id="search-username"
                                                className="input flex-1"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                onKeyPress={(e) => e.key === 'Enter' && handleSearchUsers()}
                                            />
                                            <button
                                                onClick={handleSearchUsers}
                                                className="btn btn-primary"
                                                disabled={searching || !searchQuery.trim()}
                                            >
                                                {searching ? "Searching..." : "Search"}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="max-h-60 overflow-y-auto">
                                        {searchResults.length > 0 ? (
                                            <div className="space-y-2">
                                                {searchResults.map((foundUser) => (
                                                    <div
                                                        key={foundUser._id || foundUser.id}
                                                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                                                    >
                                                        <div>
                                                            <p className="font-medium text-primary">{foundUser.username}</p>
                                                            <p className="text-sm text-text-secondary">{foundUser.email}</p>
                                                        </div>
                                                        <button
                                                            onClick={() => handleSendFriendRequest(foundUser._id?.toString() || foundUser.id)}
                                                            className="btn btn-sm btn-primary"
                                                            disabled={sendingRequest}
                                                        >
                                                            {sendingRequest ? "Sending..." : "Add"}
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : searchQuery && !searching ? (
                                            <div className="text-center py-8 text-text-secondary">
                                                No users found matching "{searchQuery}"
                                            </div>
                                        ) : !searchQuery ? (
                                            <div className="text-center py-8 text-text-secondary">
                                                Search for users to add as friends
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            )}
                            <div id="user-states" className="mt-6">
                                <UserStates states={{
                                    online: user?.states?.online || false,
                                    lastActive: user?.states?.lastActive || new Date().toISOString(),
                                    statusMessage: user?.states?.statusMessage || "Active developer",
                                    numberOfProjects: projects.length,
                                    numberOfFriends: friends.length,
                                    achievements: [],
                                    joinDate: user?.createdAt || new Date().toISOString(),
                                    badges: [],
                                    skills: [],
                                    interests: []
                                }} />
                            </div>
                            <div id="user-friends" className="mt-6">
                                <FriendsDisplay friends={friends} />
                            </div>
                        </div>
                    </aside>
                    <section className="lg:col-span-8">
                        <div className="card">
                            <h2 className="text-2xl font-bold text-primary mb-4">Your Projects</h2>
                            <div className="mb-6">
                                <input type="search" className="input" />
                            </div>
                            <div className="space-y-4">
                                {projects.length > 0 ? (
                                    projects.map(project => (
                                        <ProjectDisplay key={project._id} project={project} />
                                    ))
                                ) : (
                                    <div className="text-center py-8 text-text-secondary">
                                        <p>No projects yet</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}

export default Profile;
