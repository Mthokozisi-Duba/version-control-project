/*
Name: Mthokozisi Duba
Student number: u24690059
Position: 51
*/

const { getCollection } = require('./database');
const { ObjectId } = require('mongodb');
const { addProjectToUser, removeProjectFromUser } = require('./userManager');

async function createProject({ title, description, tags, owner }) {
	const projects = getCollection('projects');
	
	const project = {
		title,
		description,
		tags: tags || [],
		owner: owner || 'Anonymous',
		about: {},
		files: [],
		commits: [],
		comments: [],
		collaborators: [],
		createdAt: new Date(),
		updatedAt: new Date()
	};
	
	const res = await projects.insertOne(project);
	const projectId = res.insertedId;
	
	return projectId;
}

async function getProjectById(id) {
	const projects = getCollection('projects');
	return projects.findOne({ _id: new ObjectId(id) });
}

async function updateProject(id, patch) {
	const projects = getCollection('projects');
	await projects.updateOne({ _id: new ObjectId(id) }, { $set: patch });
}

async function addCommit(projectId, commit) {
	const projects = getCollection('projects');
	await projects.updateOne({ _id: new ObjectId(projectId) }, { $push: { commits: commit } });
}

async function listProjects(filter = {}) {
	const projects = getCollection('projects');
	return projects.find(filter).toArray();
}

// Delete project
async function deleteProject(id) {
	const projects = getCollection('projects');
	const users = getCollection('users');
	
	// Get project to find owner and collaborators
	const project = await projects.findOne({ _id: new ObjectId(id) });
	
	if (project) {
		// Remove project from owner's projects
		if (project.owner && ObjectId.isValid(project.owner)) {
			try {
				// Ensure owner is an ObjectId or valid string
				const ownerId = project.owner instanceof ObjectId ? project.owner.toString() : project.owner;
				await userManager.removeProjectFromUser(ownerId, id);
			} catch (err) {
				console.warn('Failed to remove project from owner:', err);
			}
		}
		
		// Remove project from all collaborators' projects
		if (project.collaborators && project.collaborators.length > 0) {
			try {
				await users.updateMany(
					{ _id: { $in: project.collaborators } },
					{ $pull: { projects: new ObjectId(id) } }
				);
			} catch (err) {
				console.warn('Failed to remove project from collaborators:', err);
			}
		}
	}
	
	// Delete the project
	await projects.deleteOne({ _id: new ObjectId(id) });
}

// Search projects by title, description, tags, or type
async function searchProjects(query) {
	const projects = getCollection('projects');
	const regex = new RegExp(query, 'i');
	return projects.find({
		$or: [
			{ title: regex },
			{ description: regex },
			{ tags: regex },
			{ 'about.type': regex }
		]
	}).toArray();
}

// Check out project (mark as being edited)
async function checkoutProject(projectId, userId) {
	const projects = getCollection('projects');
	await projects.updateOne(
		{ _id: new ObjectId(projectId) },
		{ $set: { checkedOutBy: new ObjectId(userId), checkedOutAt: new Date() } }
	);
}

// Check in project (commit changes)
async function checkinProject(projectId, userId, message, files) {
	const projects = getCollection('projects');
	
	const commit = {
		id: new ObjectId(),
		message,
		author: new ObjectId(userId),
		timestamp: new Date(),
		files: files || []
	};
	
	await projects.updateOne(
		{ _id: new ObjectId(projectId) },
		{ 
			$push: { commits: commit },
			$unset: { checkedOutBy: '', checkedOutAt: '' },
			$set: { updatedAt: new Date() }
		}
	);
}

// Get project files
async function getProjectFiles(projectId) {
	const files = getCollection('files');
	return files.find({ projectId: new ObjectId(projectId) }).toArray();
}

// Add collaborator to project
async function addCollaborator(projectId, userId) {
	const projects = getCollection('projects');
	
	// Add user to project's collaborators
	await projects.updateOne(
		{ _id: new ObjectId(projectId) },
		{ $addToSet: { collaborators: new ObjectId(userId) } }
	);
	
	// Add project to user's projects array
	await userManager.addProjectToUser(userId, projectId);
}

// Remove collaborator from project
async function removeCollaborator(projectId, userId) {
	const projects = getCollection('projects');
	
	// Remove user from project's collaborators
	await projects.updateOne(
		{ _id: new ObjectId(projectId) },
		{ $pull: { collaborators: new ObjectId(userId) } }
	);
	
	// Remove project from user's projects array
	await userManager.removeProjectFromUser(userId, projectId);
}

module.exports = { 
	createProject, 
	getProjectById, 
	updateProject, 
	addCommit, 
	listProjects,
	deleteProject,
	searchProjects,
	checkoutProject,
	checkinProject,
	getProjectFiles,
	addCollaborator,
	removeCollaborator
};
