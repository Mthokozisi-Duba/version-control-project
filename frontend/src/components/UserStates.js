/*
Name: Mthokozisi Duba
Student number: u24690059
Position: 51
*/

import React from "react";

function UserStates({ states }) {
    return (
        <div className="border-t border-gray-200 pt-4">
            <h4 className="text-lg font-bold text-primary mb-3">User Stats</h4>
            <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${states.online ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                    <strong className="text-primary">Status:</strong> 
                    <span className="text-text-secondary">{states.online ? "Online" : "Offline"}</span>
                </div>
                <div className="text-text-secondary"><strong className="text-primary">Last Active:</strong> {new Date(states.lastActive).toLocaleString()}</div>
                <div className="text-text-secondary"><strong className="text-primary">Status Message:</strong> {states.statusMessage}</div>
                <div className="text-text-secondary"><strong className="text-primary">Projects:</strong> {states.numberOfProjects}</div>
                <div className="text-text-secondary"><strong className="text-primary">Friends:</strong> {states.numberOfFriends}</div>
                <div className="text-text-secondary"><strong className="text-primary">Join Date:</strong> {new Date(states.joinDate).toLocaleDateString()}</div>
                <div>
                    <strong className="text-primary">Badges:</strong>
                    <div className="flex flex-wrap gap-1 mt-1">
                        {states.badges.map(badge => <span key={badge} className="px-2 py-1 text-xs rounded bg-accent/10 text-accent">{badge}</span>)}
                    </div>
                </div>
                <div className="text-text-secondary"><strong className="text-primary">Skills:</strong> {states.skills.join(", ")}</div>
                <div className="text-text-secondary"><strong className="text-primary">Interests:</strong> {states.interests.join(", ")}</div>
            </div>
        </div>
    );
}

export default UserStates;