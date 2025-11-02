/*
Name: Mthokozisi Duba
Student number: u24690059
Position: 51
*/

import React from "react";

function FriendsDisplay({ friends }) {
    if (!friends || friends.length === 0) {
        return (
            <div className="border-t border-gray-200 pt-4">
                <h4 className="text-lg font-bold text-primary mb-3">Friends</h4>
                <p className="text-sm text-text-secondary">No friends yet</p>
            </div>
        );
    }

    return (
        <div className="border-t border-gray-200 pt-4">
            <h4 className="text-lg font-bold text-primary mb-3">Friends ({friends.length})</h4>
            <ul className="space-y-2">
                {friends.map((friend, index) => {
                    // Handle both ObjectId and string IDs
                    const friendId = friend._id?.toString() || friend.id || friend.toString() || index;
                    const username = friend.username || 'Unknown User';
                    
                    return (
                        <li key={friendId} className="flex items-center gap-2 p-2 rounded hover:bg-secondary/50 transition-colors">
                            <span className="w-8 h-8 rounded-full bg-gradient-primary"></span>
                            <span className="font-medium text-primary">{username}</span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default FriendsDisplay;