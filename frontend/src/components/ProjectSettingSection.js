import React from "react";
import "./styles/ProjectSettingSection.css";

function ProjectSettingSection({ project }) {
    return (
        <div className="project-setting-section">
            <h2>Project Settings</h2>
            <div className="project-setting-btns">
                <button className="project-setting-btn delete">Delete Project</button>
                <button className="project-setting-btn add">Add Team Member</button>
                <button className="project-setting-btn edit">Edit Project Info</button>
            </div>
        </div>
    );
}

export default ProjectSettingSection;
