/*
Name: Mthokozisi Duba
Student number: u24690059
Position: 51
*/

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FeedProject from "../components/FeedProject";
import { projectsApi } from "../api/projectsApi";
import { authApi } from "../api/authApi";

function Home() {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [viewMode, setViewMode] = useState("local"); // "local" or "global"
    const [showNewProjectModal, setShowNewProjectModal] = useState(false);
    const [newProject, setNewProject] = useState({
        title: "",
        description: "",
        tags: ""
    });

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setLoading(true);
                const projectsData = await projectsApi.getProjects();
                setProjects(projectsData);
                setError(null);
            } catch (err) {
                setError(err.message || 'Failed to fetch projects');
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const allTags = [...new Set(projects.flatMap(p => p.tags || []))];

    const handleCreateProject = async (e) => {
        e.preventDefault();
        try {
            const currentUser = authApi.getCurrentUser();
            if (!currentUser) {
                setError("You must be logged in to create a project");
                return;
            }

            const tagsArray = newProject.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
            await projectsApi.createProject({
                title: newProject.title,
                description: newProject.description,
                tags: tagsArray,
                owner: currentUser.username
            });

            const projectsData = await projectsApi.getProjects();
            setProjects(projectsData);

            setNewProject({ title: "", description: "", tags: "" });
            setShowNewProjectModal(false);
        } catch (err) {
            setError(err.message || 'Failed to create project');
        }
    };

    const filteredProjects = projects
        .filter(project => {
            const currentUser = authApi.getCurrentUser();
            

            const matchesSearch = searchQuery === "" ||
                project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                project.description.toLowerCase().includes(searchQuery.toLowerCase());

            if (viewMode === "local") {
                return matchesSearch && project.owner === currentUser?.username;
            } else {

                return matchesSearch;
            }
        });

    const currentUser = authApi.getCurrentUser();
    const userProjectsCount = projects.filter(project => {
        return project.owner === currentUser?.username;
    }).length;

	return (
		<main className="min-h-screen bg-background">
			<section className="container mx-auto px-4 py-8">
				<div className="flex justify-between items-start mb-6">
					<div className="flex-1">
						<h1 className="text-4xl font-bold text-primary mb-2">Discover Projects</h1>
						<p className="text-text-secondary mb-4">Explore amazing projects from other night owl devs</p>
						<div className="max-w-xl">
							<input 
                                type="search" 
                                className="input" 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
						</div>
					</div>
					<div>
						<button className="btn btn-primary" onClick={() => setShowNewProjectModal(true)}>+ New Project</button>
					</div>
				</div>
			</section>

			<div className="border-t border-gray-200"></div>

			<section className="container mx-auto px-4 py-8">
				<div className="grid lg:grid-cols-4 gap-8">
					<div className="lg:col-span-3">
						<div className="flex justify-between items-center mb-6">
							<h2 className="text-2xl font-bold text-primary">
								{viewMode === "local" ? "My Projects" : "All Projects"}
							</h2>
							<div className="flex gap-2">
								<button 
									className={`btn ${viewMode === "local" ? "btn-primary" : "btn-outline"}`}
									onClick={() => setViewMode("local")}
								>
									Local
								</button>
								<button 
									className={`btn ${viewMode === "global" ? "btn-primary" : "btn-outline"}`}
									onClick={() => setViewMode("global")}
								>
									Global
								</button>
							</div>
						</div>

						<div className="grid md:grid-cols-2 gap-6">
                            {loading ? (
                                <div className="col-span-2 text-center py-12 text-text-secondary">Loading projects...</div>
                            ) : error ? (
                                <div className="col-span-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>
                            ) : filteredProjects.length === 0 ? (
                                <div className="col-span-2 text-center py-12 text-text-secondary">No projects found</div>
                            ) : (
                                filteredProjects.map((project) => (
                                        <FeedProject
                                            key={project._id}
                                            id={project._id}
                                            name={project.title}
                                            description={project.description}
                                            author={project.owner}
                                            category={project.tags?.[0] || "No category"}
                                            date={project.updatedAt}
                                        />
                                    ))
                            )}
                        </div>
					</div>
					<aside className="lg:col-span-1">
                        <div className="card sticky top-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center">
                                    <span className="block text-3xl font-bold text-accent">{projects.length}</span>
                                    <span className="text-sm text-text-secondary">Total Projects</span>
                                </div>
                                <div className="text-center">
                                    <span className="block text-3xl font-bold text-primary">{userProjectsCount}</span>
                                    <span className="text-sm text-text-secondary">Your Projects</span>
                                </div>
                            </div>
                        </div>
                    </aside>
				</div>
			</section>

			{showNewProjectModal && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
					<div className="bg-background-card rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
						<div className="flex justify-between items-center mb-6">
							<h2 className="text-2xl font-bold text-primary">Create New Project</h2>
							<button 
								onClick={() => setShowNewProjectModal(false)}
								className="text-text-secondary hover:text-primary"
							>
								<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
								</svg>
							</button>
						</div>
						<form onSubmit={handleCreateProject} className="space-y-4">
							<div>
								<label className="block text-sm font-medium text-primary mb-1">Project Title *</label>
								<input
									type="text"
									className="input"
									value={newProject.title}
									onChange={(e) => setNewProject({...newProject, title: e.target.value})}
									required
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-primary mb-1">Description *</label>
								<textarea
									className="input"
									rows="4"
									value={newProject.description}
									onChange={(e) => setNewProject({...newProject, description: e.target.value})}
									required
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-primary mb-1">Tags</label>
								<input
									type="text"
									className="input"
									value={newProject.tags}
									onChange={(e) => setNewProject({...newProject, tags: e.target.value})}
								/>
								<p className="text-xs text-text-secondary mt-1">Separate tags with commas</p>
							</div>
							{error && (
								<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
									{error}
								</div>
							)}
							<div className="flex gap-3 pt-4">
								<button type="submit" className="btn btn-primary flex-1">
									Create Project
								</button>
								<button 
									type="button" 
									onClick={() => setShowNewProjectModal(false)}
									className="btn btn-outline flex-1"
								>
									Cancel
								</button>
							</div>
						</form>
					</div>
				</div>
			)}

		</main>
	);
}

export default Home;
