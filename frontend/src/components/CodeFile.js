import React from "react";

function CodeFile({ name, updated, icon }) {
    return (
        <div className="project-file-row">
            <span className="project-file-icon">{icon || <i className="bi bi-folder"></i>}</span>
            <span className="project-file-name">{name}</span>
            <span className="project-file-updated">{updated}</span>
        </div>
    );
}

export default CodeFile;
