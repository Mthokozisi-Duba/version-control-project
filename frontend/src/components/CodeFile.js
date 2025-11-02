/*
Name: Mthokozisi Duba
Student number: u24690059
Position: 51
*/

import React from "react";

function CodeFile({ name, updated, icon }) {
    return (
        <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/20 transition-colors border border-transparent hover:border-accent/30">
            <span className="text-accent flex-shrink-0">
                {icon || (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                )}
            </span>
            <span className="flex-1 font-medium text-primary">{name}</span>
            <span className="text-sm text-text-secondary">{updated}</span>
        </div>
    );
}

export default CodeFile;
