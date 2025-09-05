import React from "react";

function Commit({ commit }) {
    return (
        <div className="commit-row">
            <div className="commit-message">{commit.message}</div>
            <div className="commit-meta">
                <span className="commit-author">{commit.author}</span>
                <span className="commit-date">{commit.date}</span>
            </div>
        </div>
    );
}

export default Commit;
