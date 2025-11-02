/*
Name: Mthokozisi Duba
Student number: u24690059
Position: 51
*/

import React from "react";
import Commit from "./Commit";

function ProjectCommitSection({ project }) {
    return (
        <div className="card">
            <h2 className="text-2xl font-bold text-primary mb-6">Commits</h2>
            <div className="space-y-3">
                {project.commits.map(commit => (
                    <Commit key={commit.commitId} commit={commit} />
                ))}
            </div>
        </div>
    );
}

export default ProjectCommitSection;