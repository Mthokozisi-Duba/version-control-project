import React from "react";
import { Link } from "react-router-dom";
import projectImg from "../assets/project.jpeg";

function FeedProject({
    image = projectImg,
    name,
    description,
    author,
    category,
    date
}) {
    return (
        <Link to={`/project/${name}`} style={{ textDecoration: "none" }}>
            <div className="feed-project-card">
                <div className="feed-project-image">
                    <img src={image} alt={name} className="feed-project-img" style={{ width: "100%", height: "120px", objectFit: "cover", borderRadius: "12px" }} />
                </div>
                <div className="feed-project-body">
                    <h3 className="feed-project-title">{name}</h3>
                    <p className="feed-project-desc">{description}</p>
                    <div className="feed-project-meta">
                        <div className="feed-project-author">
                            <span className="feed-project-avatar"></span>
                            <span className="feed-project-author-name">{author}</span>
                        </div>
                        <span className="feed-project-date">{date}</span>
                    </div>
                    <div className="feed-project-footer">
                        <span className="feed-project-category">{category}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default FeedProject;
