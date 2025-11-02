/*
Name: Mthokozisi Duba
Student number: u24690059
Position: 51
*/

import React from "react";
import { Link } from "react-router-dom";
import projectImg from "../assets/project.jpeg";

function FeedProject({
    image = projectImg,
    name,
    description,
    author,
    category,
    date,
    id
}) {
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    return (
        <Link to={`/project/${id}`} className="no-underline">
            <div className="card hover:shadow-lg transition-shadow duration-300">
                <div className="mb-4">
                    <img src={image} alt={name} className="w-full h-32 object-cover rounded-lg" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-primary mb-2 hover:text-accent transition-colors">{name}</h3>
                    <p className="text-text-secondary mb-4 line-clamp-2">{description}</p>
                    <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-2">
                            <span className="w-8 h-8 rounded-full bg-gradient-primary"></span>
                            <span className="text-sm font-medium text-primary">{author}</span>
                        </div>
                        <span className="text-xs text-text-secondary">{formattedDate}</span>
                    </div>
                    <div>
                        <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-accent/10 text-accent">{category}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default FeedProject;