/*
Name: Mthokozisi Duba
Student number: u24690059
Position: 51
*/

const { getCollection } = require('./database');
const { ObjectId } = require('mongodb');
const fs = require('fs');
const path = require('path');

const UPLOAD_BASE = path.resolve(__dirname, '..', 'public', 'uploads');

function ensureProjectFolder(projectName) {
	const folder = path.join(UPLOAD_BASE, projectName);
	if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });
	return folder;
}

async function createFileRecord(projectId, { fileId, name, type = 'file', content = '', createdBy }) {
	const files = getCollection('files');
	const doc = {
		projectId: new ObjectId(projectId),
		fileId,
		name,
		type,
		path: '',
		content,
		createdBy: createdBy ? new ObjectId(createdBy) : null,
		createdAt: new Date(),
		lastUpdatedBy: createdBy ? new ObjectId(createdBy) : null,
		lastUpdatedAt: new Date(),
		history: [],
	};
	const res = await files.insertOne(doc);
	return res.insertedId;
}

async function getFileById(id) {
	const files = getCollection('files');
	return files.findOne({ _id: new ObjectId(id) });
}

async function updateFileContent(fileId, content, updatedBy) {
	const files = getCollection('files');
	const update = {
		$set: { content, lastUpdatedAt: new Date(), lastUpdatedBy: updatedBy ? new ObjectId(updatedBy) : null },
		$push: { history: { updatedBy: updatedBy ? new ObjectId(updatedBy) : null, updatedAt: new Date(), message: 'content update' } },
	};
	await files.updateOne({ fileId }, update);
}

module.exports = { ensureProjectFolder, createFileRecord, getFileById, updateFileContent, UPLOAD_BASE };
