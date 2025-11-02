/*
Name: Mthokozisi Duba
Student number: u24690059
Position: 51
*/

import React from "react";
import { Link } from "react-router-dom";

function ProjectDisplay({ project }) {
    return (
        <Link to={`/project/${project._id}`} className="no-underline">
            <div className="card hover:border-accent transition-colors">
                <div className="flex justify-between items-start">
                    <div className="flex-1">
                        <h5 className="text-lg font-bold text-primary mb-2">{project.title}</h5>
                        <p className="text-sm text-text-secondary mb-2">{project.description}</p>
                        <div className="flex gap-4 text-sm text-text-secondary">
                            <div>Created: {new Date(project.createdAt).toLocaleDateString()}</div>
                            <div>Updated: {new Date(project.updatedAt).toLocaleDateString()}</div>
                        </div>
                        {project.tags && project.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-3">
                                {project.tags.map(tag => (
                                    <span key={tag} className="px-2 py-1 text-xs font-medium rounded-full bg-accent/10 text-accent">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default ProjectDisplay;