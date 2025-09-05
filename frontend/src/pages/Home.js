import React from "react";
import "./styles/Home.css";
import FeedProject from "../components/FeedProject";
import "../components/styles/FeedProject.css";

const projectExample = [{
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
},

{
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
},

]

const states = {
	numberOfProjects: 120,
	yourProjects: 8,
	activeUsers: 45,
	mostUsedLanguage: "JavaScript",
}

function Home() {
	return (
		<main className="home-main">
			<section className="home-header">
				<div className="home-header-left">
					<h1 className="home-title">Discover Project</h1>
					<p className="home-desc">Explore amazing project from other night owl devs</p>
					<div className="home-search-row">
						<input type="search" className="home-search" placeholder="Search..." />
					</div>
				</div>
				<div className="home-header-right">
					<button className="home-new-btn">+ New Project</button>
				</div>
			</section>
			<hr className="home-divider" />
			<section className="home-featured-row">
				<div className="home-featured">
					<div className="home-featured-header">
						<h2 className="home-featured-title">Featured Project</h2>
						<button className="home-filter-btn"><i className="bi bi-funnel"></i> Filter</button>
					</div>
					<div className="project-grid">
                        {projectExample.map((project, idx) => (
                            <FeedProject
                                key={project.id + idx}
                                name={project.title}
                                description={project.description}
                                author={project.team[0]?.name || "Author"}
                                category={project.about.tags[0] || "category"}
                                date={project.about.lastUpdated}
                            />
                        ))}
                    </div>
				</div>
				<aside className="home-stats">
                    <div className="home-stats-card">
                        <div className="home-stats-header">
                            <div className="home-stats-projects">
                                <span className="home-stats-big">625</span>
                                <span className="home-stats-label">project</span>
                            </div>
                            <div className="home-stats-your">
                                <span className="home-stats-big">12</span>
                                <span className="home-stats-label">Your projects</span>
                            </div>
                        </div>
                        <div className="home-stats-list">
                            <div>Other stats <span>1,564</span></div>
                            <div>Other stats <span>256</span></div>
                            <div>Other stats <span>2,694</span></div>
                            <div>Other stats <span>847</span></div>
                        </div>
                    </div>
                </aside>
			</section>

		</main>
	);
}

export default Home;
