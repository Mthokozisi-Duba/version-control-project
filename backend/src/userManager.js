/*
Name: Mthokozisi Duba
Student number: u24690059
Position: 51
*/

const { getCollection } = require('./database');
const { ObjectId } = require('mongodb');

async function createUser({ username, email, password }) {
	const users = getCollection('users');
	const existing = await users.findOne({ $or: [{ username }, { email }] });
	if (existing) throw new Error('username_or_email_taken');
	const doc = {
		username,
		email,
		password: password,
		bio: '',
		projects: [],
		friends: [],
		friendRequests: [],
		states: { online: false, lastActive: new Date(), statusMessage: '' },
		createdAt: new Date()
	};
	const res = await users.insertOne(doc);
	return { insertedId: res.insertedId };
}

async function findByCredentials({ usernameOrEmail, password }) {
	const users = getCollection('users');
	const user = await users.findOne({
		$or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
		password: password,
	});
	return user;
}

async function getUserById(id) {
	const users = getCollection('users');
	return users.findOne({ _id: new ObjectId(id) });
}

async function setOnlineStatus(id, online) {
	const users = getCollection('users');
	await users.updateOne({ _id: new ObjectId(id) }, { $set: { 'states.online': online, 'states.lastActive': new Date() } });
}

async function getAllUsers() {
	const users = getCollection('users');
	return users.find({}).project({ password: 0 }).toArray();
}

async function updateUserProfile(id, updates) {
	const users = getCollection('users');
	const allowed = {};
	if (updates.username) allowed.username = updates.username;
	if (updates.email) allowed.email = updates.email;
	if (updates.bio) allowed.bio = updates.bio;
	if (updates.avatar) allowed.avatar = updates.avatar;
	if (updates['states.statusMessage']) allowed['states.statusMessage'] = updates['states.statusMessage'];
	
	await users.updateOne({ _id: new ObjectId(id) }, { $set: allowed });
}

async function sendFriendRequest(fromUserId, toUserId) {
	const users = getCollection('users');
	const toUser = await users.findOne({ _id: new ObjectId(toUserId) });
	if (!toUser) throw new Error('User not found');
	
	if (!toUser.friendRequests) {
		await users.updateOne({ _id: new ObjectId(toUserId) }, { $set: { friendRequests: [] } });
	}
	
	await users.updateOne(
		{ _id: new ObjectId(toUserId) },
		{ $addToSet: { friendRequests: new ObjectId(fromUserId) } }
	);
}

async function addFriend(userId, friendId) {
	const users = getCollection('users');
	
	const user = await users.findOne({ _id: new ObjectId(userId) });
	const friend = await users.findOne({ _id: new ObjectId(friendId) });
	
	if (!user) throw new Error('User not found');
	if (!friend) throw new Error('Friend not found');
	
	if (!user.friends) {
		await users.updateOne({ _id: new ObjectId(userId) }, { $set: { friends: [] } });
	}
	if (!friend.friends) {
		await users.updateOne({ _id: new ObjectId(friendId) }, { $set: { friends: [] } });
	}

	await users.updateOne(
		{ _id: new ObjectId(userId) },
		{ $addToSet: { friends: new ObjectId(friendId) } }
	);
	
	await users.updateOne(
		{ _id: new ObjectId(friendId) },
		{ $addToSet: { friends: new ObjectId(userId) } }
	);
}

async function acceptFriendRequest(userId, friendId) {
	const users = getCollection('users');
	
	await users.updateOne(
		{ _id: new ObjectId(userId) },
		{ 
			$addToSet: { friends: new ObjectId(friendId) },
			$pull: { friendRequests: new ObjectId(friendId) }
		}
	);
	
	await users.updateOne(
		{ _id: new ObjectId(friendId) },
		{ $addToSet: { friends: new ObjectId(userId) } }
	);
}

async function rejectFriendRequest(userId, friendId) {
	const users = getCollection('users');
	await users.updateOne(
		{ _id: new ObjectId(userId) },
		{ $pull: { friendRequests: new ObjectId(friendId) } }
	);
}

async function unfriend(userId, friendId) {
	const users = getCollection('users');
	
	await users.updateOne(
		{ _id: new ObjectId(userId) },
		{ $pull: { friends: new ObjectId(friendId) } }
	);
	
	await users.updateOne(
		{ _id: new ObjectId(friendId) },
		{ $pull: { friends: new ObjectId(userId) } }
	);
}

async function searchUsers(query) {
	const users = getCollection('users');
	const regex = new RegExp(query, 'i');
	return users.find({
		$or: [
			{ username: regex },
			{ email: regex },
			{ bio: regex }
		]
	}).project({ password: 0 }).toArray();
}

async function addProjectToUser(userId, projectId) {
	const users = getCollection('users');
	await users.updateOne(
		{ _id: new ObjectId(userId) },
		{ $addToSet: { projects: new ObjectId(projectId) } }
	);
}

async function removeProjectFromUser(userId, projectId) {
	const users = getCollection('users');
	await users.updateOne(
		{ _id: new ObjectId(userId) },
		{ $pull: { projects: new ObjectId(projectId) } }
	);
}

module.exports = { 
	createUser, 
	findByCredentials, 
	getUserById, 
	setOnlineStatus,
	getAllUsers,
	updateUserProfile,
	sendFriendRequest,
	addFriend,
	acceptFriendRequest,
	rejectFriendRequest,
	unfriend,
	searchUsers,
	addProjectToUser,
	removeProjectFromUser
};
