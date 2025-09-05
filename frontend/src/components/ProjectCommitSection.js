import React from "react";
import Commit from "./Commit";
import "./styles/ProjectCommitSection.css";

function ProjectCommitSection({ project }) {
    return (
        <div className="project-commit-section">
            <h2>Commits</h2>
            <div className="project-commit-list">
                {project.commits.map(commit => (
                    <Commit key={commit.commitId} commit={commit} />
                ))}
            </div>
        </div>
    );
}

export default ProjectCommitSection;
