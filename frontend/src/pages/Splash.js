import React from "react";
import { Link } from "react-router-dom";

import "./styles/Splash.css";

function Splash() {
    return (
        <main className="splash-main">

            <div className="splash-content">

                <div className="splash-left">
                    <h1 className="splash-title">
                        Collaborate on code <br />
                        <span className="splash-title-accent">Seamlessly</span>
                    </h1>
                    <p className="splash-desc">
                        Night Owl Devs is the last version control platform you will ever need share, track and collab with ease
                    </p>
                    <div className="splash-btn-row">
                        <Link to="/signup" className="splash-btn">Get Started</Link>
                        <Link to="/signin" className="splash-btn splash-btn-outline">Welcome Back</Link>
                    </div>
                </div>

                <div className="splash-code-card">
                    <div className="splash-code-header">
                        <span className="splash-dot red"></span>
                        <span className="splash-dot yellow"></span>
                        <span className="splash-dot green"></span>
                    </div>
                    <pre className="splash-code">
                        <span className="accent-green">Function</span> initProject()&#123;<br/>
                        <span className="accent-blue">const</span> project&#123;<br/>
                            name: <span className="accent-orange">"New Feature"</span>,<br/>
                            author: <span className="accent-orange">"night owl dev"</span>,<br/>
                            version: <span className="accent-orange">"1.0.0"</span>,<br/>
                        &#125;<br/>
                        <span className="accent-purple">return</span> project;<br/>
&#125;
                    </pre>
                </div>
            </div>
        </main>
    );
}

export default Splash;
