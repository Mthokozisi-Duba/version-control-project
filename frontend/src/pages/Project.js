import React, { useState } from "react";
import "./styles/Project.css";
import CodeFile from "../components/CodeFile";
import ProjectCodeSection from "../components/ProjectCodeSection";
import ProjectCommitSection from "../components/ProjectCommitSection";
import ProjectSettingSection from "../components/ProjectSettingSection";

const projectExample = {
    id: 1,
    title: "Project Title",
    description: "Project description goes here...",
    image: "",
    about:{
        description: "Detailed project description...",
        technologies: ["React", "Node.js", "Express"],
        dateCreated: "2024-01-15",
        lastUpdated: "2024-06-10",
        tags: ["JavaScript", "Web Development"],
    },
    team:[
        { name: "Alice", role: "Frontend Developer" },
        { name: "Bob", role: "Backend Developer" },
    ],
    readme: "# Project Title\n\nDetailed project description...\n",
    files:[
        { fileId:"f1", name: "index.js", type: "file", content: "// JavaScript code..." },
        { fileId:"f2", name: "app.js", type: "file", content: "// app code..." },
        { fileId:"f3", name: "main.js", type: "file", content: "// main code..." },
    ],
    commits:[
        { commitId: "c1", message: "Initial commit", author: "Alice", date: "2024-01-15", fileChanges: ["f1", "f2"] },
        { commitId: "c2", message: "Added new feature", author: "Bob", date: "2024-02-20", fileChanges: ["f3"] },
        { commitId: "c3", message: "Fixed bugs", author: "Alice", date: "2024-03-05", fileChanges: ["f1"] },
    ],
    comments:[
        { commentId: "cm1", content: "Great work on this feature!", author: "Alice", date: "2024-06-02", associatedWith: { type: "pullRequest", id: "p1" } },
        { commentId: "cm2", content: "Found a bug in the latest commit.", author: "Bob", date: "2024-06-06", associatedWith: { type: "commit", id: "c3" } },
    ],
}

function Project() {
    const [activeTab, setActiveTab] = useState("code");
    return (
        <main className="project-main" style={{ paddingTop: "32px" }}>
            <section className="project-header-section">
                <div className="project-header">
                    <div className="project-avatar">
                        <svg width="56" height="56" viewBox="0 0 56 56">
                            <rect x="2" y="2" width="52" height="52" rx="12" fill="#232b3e" stroke="#6b7ca7" strokeWidth="2" />
                            <ellipse cx="18" cy="16" rx="7" ry="4" fill="none" stroke="#6b7ca7" strokeWidth="2" />
                            <polyline points="10,46 28,28 46,46" fill="none" stroke="#6b7ca7" strokeWidth="2" />
                        </svg>
                    </div>
                    <div className="project-header-info">
                        <h1 className="project-title">{projectExample.title}</h1>
                        <p className="project-desc">{projectExample.description}</p>
                        <span className="project-updated">updated 8 years ago</span>
                    </div>
                    <button className="project-clone-btn">Clone</button>
                </div>
                <nav className="project-nav">
                    <button className={`project-nav-btn${activeTab === "code" ? " active" : ""}`} onClick={() => setActiveTab("code")}>code</button>
                    <button className={`project-nav-btn${activeTab === "commit" ? " active" : ""}`} onClick={() => setActiveTab("commit")}>commit</button>
                    <button className={`project-nav-btn${activeTab === "settings" ? " active" : ""}`} onClick={() => setActiveTab("settings")}>settings</button>
                </nav>
            </section>
            <section className="project-content">
                <aside className="project-sidebar">
                    <div className="project-about-card">
                        <h2>About</h2>
                        <p>{projectExample.about.description}</p>
                        <div className="project-about-meta">
                            <div>Date created: <span>{projectExample.about.dateCreated}</span></div>
                            <div>Author: <span>Night Owl dev</span></div>
                        </div>
                        <div className="project-tags">
                            <span>Tag</span>
                            <div className="project-tag-list">
                                {projectExample.about.tags.map(tag => (
                                    <span className="project-tag" key={tag}>{tag}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="project-team-card">
                        <h2>Team</h2>
                        <ul>
                            {projectExample.team.map(member => (
                                <li key={member.name}>
                                    <span className="project-team-avatar"></span>
                                    <span className="project-team-name">{member.name}</span>
                                    <span className="project-team-role">{member.role}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>
                <section className="project-main-content">
                    {activeTab === "code" && <ProjectCodeSection project={projectExample} />}
                    {activeTab === "commit" && <ProjectCommitSection project={projectExample} />}
                    {activeTab === "settings" && <ProjectSettingSection project={projectExample} />}
                </section>
            </section>
        </main>
    );
}

export default Project;