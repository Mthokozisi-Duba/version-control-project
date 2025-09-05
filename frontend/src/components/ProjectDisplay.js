import React from "react";
import { Link } from "react-router-dom";
import "./styles/ProjectDisplay.css";

function ProjectDisplay({ project }) {
    return (
        <Link to={`/project/${project.name}`} style={{ textDecoration: "none" }}>
            <div className="project-display-card card mb-3 p-3" style={{ background: "var(--secondary-color)", color: "var(--text-color)" }}>
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <h5 className="mb-1">{project.name}</h5>
                        <div className="small">Created: {project.dateCreated}</div>
                        <div className="small">Last Updated: {project.lastUpdated}</div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default ProjectDisplay;
