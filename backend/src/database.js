/*
Name: Mthokozisi Duba
Student number: u24690059
Position: 51
*/

const { MongoClient, ServerApiVersion } = require('mongodb');

const DEFAULT_URI = process.env.MONGODB_URI || 'mongodb+srv://test-user:test-password@test-user.4vvncnb.mongodb.net/?retryWrites=true&w=majority&appName=test-user';

const client = new MongoClient(DEFAULT_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let connected = false;

async function connect() {
  if (!connected) {
    await client.connect();
    connected = true;
    console.log('MongoDB connected');
  }
  return client;
}

function db() {
  if (!connected) throw new Error('MongoDB not connected. Call connect() first.');
  return client.db('project');
}

function getCollection(name) {
  return db().collection(name);
}

module.exports = { connect, client, db, getCollection };
