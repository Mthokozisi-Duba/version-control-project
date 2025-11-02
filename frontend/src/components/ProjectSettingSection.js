/*
Name: Mthokozisi Duba
Student number: u24690059
Position: 51
*/

import React, { useState, useEffect } from "react";
import { usersApi } from "../api/usersApi";
import { projectsApi } from "../api/projectsApi";
import { authApi } from "../api/authApi";

function ProjectSettingSection({ project, onDelete }) {
    const [showAddCollaboratorModal, setShowAddCollaboratorModal] = useState(false);
    const [friends, setFriends] = useState([]);
    const [collaborators, setCollaborators] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchFriendsAndCollaborators();
    }, [project]);

    async function fetchFriendsAndCollaborators() {
        try {
            setLoading(true);
            const currentUser = authApi.getCurrentUser();
            const userData = await usersApi.getUserById(currentUser.id);
            
            // Fetch full friend data
            const friendIds = userData.friends || [];
            const friendsData = [];
            for (const friendId of friendIds) {
                try {
                    const friend = await usersApi.getUserById(friendId);
                    friendsData.push(friend);
                } catch (err) {
                    console.warn(`Failed to fetch friend ${friendId}:`, err);
                }
            }
            setFriends(friendsData);

            // Get current collaborators
            const collabIds = project.collaborators || [];
            const collabData = [];
            for (const collabId of collabIds) {
                try {
                    const collab = await usersApi.getUserById(collabId);
                    collabData.push(collab);
                } catch (err) {
                    console.warn(`Failed to fetch collaborator ${collabId}:`, err);
                }
            }
            setCollaborators(collabData);
        } catch (err) {
            setError(err.message || "Failed to fetch friends");
        } finally {
            setLoading(false);
        }
    }

    async function handleAddCollaborator(friendId) {
        try {
            setError(null);
            await projectsApi.addCollaborator(project._id, friendId);

            await fetchFriendsAndCollaborators();
            
            setShowAddCollaboratorModal(false);
        } catch (err) {
            setError(err.message || "Failed to add collaborator");
        }
    }

    async function handleRemoveCollaborator(collabId) {
        if (!window.confirm("Remove this person?")) {
            return;
        }
        
        try {
            setError(null);
            await projectsApi.removeCollaborator(project._id, collabId);
            
            await fetchFriendsAndCollaborators();
        } catch (err) {
            setError(err.message || "Failed to remove collaborator");
        }
    }

    // Filter out friends who are already collaborators
    const availableFriends = friends.filter(friend => {
        const friendId = friend._id?.toString() || friend.id;
        return !collaborators.some(collab => {
            const collabId = collab._id?.toString() || collab.id;
            return collabId === friendId;
        });
    });

    return (
        <div className="card">
            <h2 className="text-2xl font-bold text-primary mb-6">Project Settings</h2>
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}
            <div className="space-y-4">
                <div>
                    <h3 className="font-medium text-primary mb-2">Danger Zone</h3>
                    <p className="text-sm text-text-secondary mb-3">
                        Deleting this project will permanently remove all files, commits, and associated data.
                    </p>
                    <button 
                        onClick={onDelete}
                        className="btn border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                    >
                        <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete Project
                    </button>
                </div>
                <div className="border-t border-gray-200 pt-4">
                    <h3 className="font-medium text-primary mb-2">Project Information</h3>
                    <button className="btn btn-outline mb-3">
                        <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit Project Info
                    </button>
                </div>
                <div className="border-t border-gray-200 pt-4">
                    <h3 className="font-medium text-primary mb-3">Collaborators</h3>
                    
                    {/* Current Collaborators List */}
                    {collaborators.length > 0 && (
                        <div className="mb-4 space-y-2">
                            {collaborators.map((collab) => (
                                <div
                                    key={collab._id || collab.id}
                                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                >
                                    <div>
                                        <p className="font-medium text-primary">{collab.username}</p>
                                        <p className="text-sm text-text-secondary">{collab.email}</p>
                                    </div>
                                    <button
                                        onClick={() => handleRemoveCollaborator(collab._id?.toString() || collab.id)}
                                        className="btn btn-sm border-red-500 text-red-500"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                    
                    <button 
                        className="btn btn-primary" 
                        style={{ transition: 'none' }}
                        onClick={() => {
                            setShowAddCollaboratorModal(!showAddCollaboratorModal);
                            setError(null);
                        }}
                    >
                        <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        {showAddCollaboratorModal ? "Cancel" : "Add Team Member"}
                    </button>

                    {/* Add Collaborator Form */}
                    {showAddCollaboratorModal && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                            <h3 className="text-lg font-bold text-primary mb-3">Add Friend as Collaborator</h3>
                            {error && (
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                                    {error}
                                </div>
                            )}

                            <div className="max-h-60 overflow-y-auto">
                                {loading ? (
                                    <div className="text-center py-8 text-text-secondary">
                                        Loading friends...
                                    </div>
                                ) : availableFriends.length > 0 ? (
                                    <div className="space-y-2">
                                        {availableFriends.map((friend) => (
                                            <div
                                                key={friend._id || friend.id}
                                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                                            >
                                                <div>
                                                    <p className="font-medium text-primary">{friend.username}</p>
                                                    <p className="text-sm text-text-secondary">{friend.email}</p>
                                                </div>
                                                <button
                                                    onClick={() => handleAddCollaborator(friend._id?.toString() || friend.id)}
                                                    className="btn btn-sm btn-primary"
                                                >
                                                    Add
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 text-text-secondary">
                                        {friends.length === 0 
                                            ? "You don't have any friends yet. Add friends first to add them as collaborators."
                                            : "All your friends are already collaborators on this project."}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProjectSettingSection;