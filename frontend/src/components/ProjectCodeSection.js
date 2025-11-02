/*
Name: Mthokozisi Duba
Student number: u24690059
Position: 51
*/

import React, { useState, useEffect } from "react";
import CodeFile from "./CodeFile";
import { projectsApi } from "../api/projectsApi";
import { authApi } from "../api/authApi";

function ProjectCodeSection({ project, files }) {
    const [showAddFileModal, setShowAddFileModal] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [newFile, setNewFile] = useState({ name: '', content: '' });
    const [localFiles, setLocalFiles] = useState(files);
    const [creating, setCreating] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLocalFiles(files);
    }, [files]);
    
    const handleFileClick = (file) => {
        // File already has content field, just set it
        setSelectedFile(file);
    };

    const handleAddFile = async () => {
        if (!newFile.name.trim()) {
            setError('File name is required');
            return;
        }

        setCreating(true);
        setError(null);

        try {
            const currentUser = authApi.getCurrentUser();
            
            await projectsApi.createFile(project._id || project.id, {
                name: newFile.name,
                content: newFile.content,
                createdBy: currentUser?.id
            });

            await projectsApi.addCommit(project._id || project.id, {
                message: `Added file: ${newFile.name}`,
                author: currentUser?.username || 'Unknown',
                timestamp: new Date().toISOString()
            });

            const updatedFiles = await projectsApi.getProjectFiles(project._id || project.id);
            setLocalFiles(updatedFiles);
            
            setShowAddFileModal(false);
            setNewFile({ name: '', content: '' });
        } catch (err) {
            setError(err.message || 'Failed to create file');
        } finally {
            setCreating(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="card">
                <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
                    <span className="text-text-secondary font-medium">
                        {project.commits?.length || 0} commits
                    </span>
                    <button 
                        className="btn btn-primary"
                        onClick={() => setShowAddFileModal(true)}
                    >
                        <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add File
                    </button>
                </div>
                <div className="space-y-2">
                    {localFiles && localFiles.length > 0 ? (
                        localFiles.map(file => (
                            <div 
                                key={file._id || file.fileId}
                                onClick={() => handleFileClick(file)}
                                className="cursor-pointer"
                            >
                                <CodeFile
                                    name={file.name}
                                    updated={`updated ${new Date(file.lastUpdatedAt).toLocaleDateString()}`}
                                    icon={
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    }
                                />
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-8 text-text-secondary">
                            <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <p>No files in this project yet</p>
                            <button 
                                className="btn btn-outline mt-3"
                                onClick={() => setShowAddFileModal(true)}
                            >
                                Add your first file
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {selectedFile && (
                <div className="card">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-primary">{selectedFile.name}</h2>
                        <button 
                            onClick={() => setSelectedFile(null)}
                            className="text-text-secondary hover:text-primary"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="bg-secondary/10 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                        <pre className="text-text-primary whitespace-pre-wrap">{selectedFile.content || '// No content available'}</pre>
                    </div>
                </div>
            )}

            <div className="card">
                <h2 className="text-2xl font-bold text-primary mb-4">Read Me</h2>
                <div className="prose max-w-none text-text-secondary whitespace-pre-wrap">
                    {project.readme || ''}
                </div>
            </div>

            {/* Add File Modal */}
            {showAddFileModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-background-card rounded-lg max-w-2xl w-full p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-primary">Add New File</h2>
                            <button 
                                onClick={() => setShowAddFileModal(false)}
                                className="text-text-secondary hover:text-primary"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="space-y-4">
                            {error && (
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                                    {error}
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-medium text-primary mb-1">File Name</label>
                                <input
                                    type="text"
                                    className="input"
                                    value={newFile.name}
                                    onChange={(e) => setNewFile({...newFile, name: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-primary mb-1">Content</label>
                                <textarea
                                    className="input font-mono"
                                    rows="10"
                                    value={newFile.content}
                                    onChange={(e) => setNewFile({...newFile, content: e.target.value})}
                                />
                            </div>
                            <div className="flex gap-3">
                                <button onClick={handleAddFile} className="btn btn-primary flex-1" disabled={creating}>
                                    {creating ? 'Creating...' : 'Create File'}
                                </button>
                                <button 
                                    onClick={() => {
                                        setShowAddFileModal(false);
                                        setError(null);
                                        setNewFile({ name: '', content: '' });
                                    }}
                                    className="btn btn-outline flex-1"
                                    disabled={creating}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProjectCodeSection;