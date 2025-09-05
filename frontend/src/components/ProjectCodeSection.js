import React from "react";
import CodeFile from "./CodeFile";
import "./styles/ProjectCodeSection.css";

function ProjectCodeSection({ project }) {
    return (
        <div className="project-code-section">
            <div className="project-commits-card">
                <div className="project-commits-header">
                    <span>12+ commits</span>
                    <input type="search" className="project-commits-search" placeholder="search for files" />
                    <button className="project-commits-add">add file</button>
                </div>
                <div className="project-file-list">
                    {project.files.map(file => (
                        <CodeFile
                            key={file.fileId}
                            name={file.name}
                            updated={"update 6 hours ago"}
                            icon={<i className="bi bi-folder"></i>}
                        />
                    ))}
                </div>
            </div>
            <div className="project-readme-card">
                <h2>Read Me</h2>
                <div className="project-readme-content">
                    {project.readme}
                </div>
            </div>
        </div>
    );
}

export default ProjectCodeSection;
