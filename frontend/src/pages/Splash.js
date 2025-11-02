/*
Name: Mthokozisi Duba
Student number: u24690059
Position: 51
*/

import React from "react";
import { Link } from "react-router-dom";

function Splash() {
    return (
        <main className="min-h-screen gradient-primary text-white">
            <div className="container mx-auto px-4 py-20">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    
                    <div className="space-y-6">
                        <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                            Collaborate on code <br />
                            <span className="text-accent">Seamlessly</span>
                        </h1>
                        <p className="text-xl text-gray-300">
                            Night Owl Devs is the last version control platform you will ever need. Share, track and collaborate with ease.
                        </p>
                        <div className="flex gap-4">
                            <Link to="/signup" className="btn btn-primary px-8 py-3 text-lg">
                                Get Started
                            </Link>
                            <Link to="/signin" className="btn btn-outline px-8 py-3 text-lg">
                                Welcome Back
                            </Link>
                        </div>
                    </div>

                    <div className="card bg-gray-900 text-white">
                        <div className="flex gap-2 mb-4">
                            <span className="w-3 h-3 rounded-full bg-red-500"></span>
                            <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                            <span className="w-3 h-3 rounded-full bg-green-500"></span>
                        </div>
                        <pre className="text-sm font-mono overflow-x-auto">
                            <span className="text-green-400">function</span> <span className="text-yellow-400">initProject</span>() &#123;<br/>
                            <span className="text-blue-400">const</span> project = &#123;<br/>
                            name: <span className="text-orange-400">"New Feature"</span>,<br/>
                            author: <span className="text-orange-400">"night owl dev"</span>,<br/>
                            version: <span className="text-orange-400">"1.0.0"</span>,<br/>
                            &#125;<br/>
                            <span className="text-purple-400">return</span> project;<br/>
&#125;
                        </pre>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Splash;
