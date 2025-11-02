/*
Name: Mthokozisi Duba
Student number: u24690059
Position: 51
*/

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CodeFile from "../components/CodeFile";
import ProjectCodeSection from "../components/ProjectCodeSection";
import ProjectCommitSection from "../components/ProjectCommitSection";
import ProjectSettingSection from "../components/ProjectSettingSection";
import { projectsApi } from "../api/projectsApi";
import { usersApi } from "../api/usersApi";
import { authApi } from "../api/authApi";

function Project() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("code");
    const [project, setProject] = useState(null);
    const [files, setFiles] = useState([]);
    const [collaborators, setCollaborators] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjectData = async () => {
            try {
                setLoading(true);
                // Fetch project details
                const projectData = await projectsApi.getProjectById(id);
                setProject(projectData);
                
                // Fetch project files
                const filesData = await projectsApi.getProjectFiles(id);
                setFiles(filesData);
                
                // Fetch collaborators details
                const collabIds = projectData.collaborators || [];
                const collabData = [];
                for (const collabId of collabIds) {
                    try {
                        const collab = await usersApi.getUserById(collabId.toString ? collabId.toString() : collabId);
                        collabData.push(collab);
                    } catch (err) {
                        console.warn(`Failed to fetch collaborator ${collabId}:`, err);
                    }
                }
                setCollaborators(collabData);
                
                setError(null);
            } catch (err) {
                setError(err.message || 'Failed to fetch project');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProjectData();
        }
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm('Delete this project?')) {
            try {
                await projectsApi.deleteProject(id);
                navigate('/home');
            } catch (err) {
                console.error('Failed to delete project:', err);
            }
        }
    };

    if (loading) {
        return (
            <main className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-2">Loading project...</div>
                    <div className="text-text-secondary">Please wait</div>
                </div>
            </main>
        );
    }

    if (error || !project) {
        return (
            <main className="min-h-screen bg-background flex items-center justify-center">
                <div className="card max-w-md text-center">
                    <div className="text-2xl font-bold text-red-600 mb-2">Error</div>
                    <div className="text-text-secondary mb-4">{error || 'Project not found'}</div>
                    <button onClick={() => navigate('/home')} className="btn btn-primary">
                        Back to Home
                    </button>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-background pt-8">
            <section className="container mx-auto px-4">
                <div className="card mb-6">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="flex-shrink-0">
                            <svg width="56" height="56" viewBox="0 0 56 56">
                                <rect x="2" y="2" width="52" height="52" rx="12" fill="#232b3e" stroke="#6b7ca7" strokeWidth="2" />
                                <ellipse cx="18" cy="16" rx="7" ry="4" fill="none" stroke="#6b7ca7" strokeWidth="2" />
                                <polyline points="10,46 28,28 46,46" fill="none" stroke="#6b7ca7" strokeWidth="2" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold text-primary mb-2">{project.title}</h1>
                            <p className="text-text-secondary mb-2">{project.description}</p>
                            <span className="text-sm text-text-secondary">
                                updated {new Date(project.updatedAt).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                    <nav className="flex gap-2 border-t border-gray-200 pt-4">
                        <button 
                            className={`px-4 py-2 rounded font-medium transition-colors ${activeTab === "code" ? "bg-accent text-white" : "text-text-secondary hover:bg-secondary/50"}`} 
                            onClick={() => setActiveTab("code")}
                        >
                            Code
                        </button>
                        <button 
                            className={`px-4 py-2 rounded font-medium transition-colors ${activeTab === "commit" ? "bg-accent text-white" : "text-text-secondary hover:bg-secondary/50"}`} 
                            onClick={() => setActiveTab("commit")}
                        >
                            Commits
                        </button>
                        <button 
                            className={`px-4 py-2 rounded font-medium transition-colors ${activeTab === "settings" ? "bg-accent text-white" : "text-text-secondary hover:bg-secondary/50"}`} 
                            onClick={() => setActiveTab("settings")}
                        >
                            Settings
                        </button>
                    </nav>
                </div>
                <div className="grid lg:grid-cols-12 gap-6">
                    <aside className="lg:col-span-4 space-y-6">
                        <div className="card">
                            <h2 className="text-xl font-bold text-primary mb-3">About</h2>
                            <p className="text-text-secondary mb-4">{project.description}</p>
                            <div className="space-y-2 text-sm mb-4">
                                <div className="text-text-secondary">
                                    <span className="font-medium text-primary">Date created:</span>{' '}
                                    {new Date(project.createdAt).toLocaleDateString()}
                                </div>
                                <div className="text-text-secondary">
                                    <span className="font-medium text-primary">Type:</span>{' '}
                                    {project.about?.type || 'Project'}
                                </div>
                                <div className="text-text-secondary">
                                    <span className="font-medium text-primary">Visibility:</span>{' '}
                                    {project.about?.visibility || 'public'}
                                </div>
                            </div>
                            <div>
                                <span className="font-medium text-primary mb-2 block">Tags</span>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags && project.tags.length > 0 ? (
                                        project.tags.map(tag => (
                                            <span key={tag} className="px-3 py-1 text-xs font-medium rounded-full bg-accent/10 text-accent">{tag}</span>
                                        ))
                                    ) : (
                                        <span className="text-sm text-text-secondary">No tags</span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <h2 className="text-xl font-bold text-primary mb-3">Stats</h2>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <div className="flex-1">
                                        <div className="font-medium text-primary">{files.length} Files</div>
                                        <div className="text-sm text-text-secondary">In this project</div>
                                    </div>
                                </li>
                                <li className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                    </svg>
                                    <div className="flex-1">
                                        <div className="font-medium text-primary">{project.commits?.length || 0} Commits</div>
                                        <div className="text-sm text-text-secondary">Total commits</div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        
                        {/* Collaborators Card */}
                        <div className="card">
                            <h2 className="text-xl font-bold text-primary mb-3">Collaborators</h2>
                            {collaborators.length === 0 ? (
                                <p className="text-sm text-text-secondary">No collaborators yet</p>
                            ) : (
                                <div className="flex flex-col gap-2">
                                    {collaborators.map((collaborator) => (
                                        <div 
                                            key={collaborator._id || collaborator.id} 
                                            className="flex items-center gap-3"
                                        >
                                            <span className="text-sm text-text-secondary">{collaborator.username || 'Unknown'}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </aside>
                    <section className="lg:col-span-8">
                        {activeTab === "code" && <ProjectCodeSection project={project} files={files} />}
                        {activeTab === "commit" && <ProjectCommitSection project={project} />}
                        {activeTab === "settings" && <ProjectSettingSection project={project} onDelete={handleDelete} />}
                    </section>
                </div>
            </section>
        </main>
    );
}

export default Project;