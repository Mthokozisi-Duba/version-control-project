/*
Name: Mthokozisi Duba
Student number: u24690059
Position: 51
*/

const { connect, getCollection } = require('./database');
const { ObjectId } = require('mongodb');

async function seedDatabase() {
  try {
    await connect();
    console.log('Connected to MongoDB');

    // Clear existing data (optional - comment out if you want to keep existing data)
    const users = getCollection('users');
    const projects = getCollection('projects');
    const files = getCollection('files');
    
    await users.deleteMany({});
    await projects.deleteMany({});
    await files.deleteMany({});
    console.log('Cleared existing data');

    // Create IDs first
    const user1Id = new ObjectId();
    const user2Id = new ObjectId();
    const project1Id = new ObjectId();
    const project2Id = new ObjectId();

    // Create 2 users
    const user1 = {
      _id: user1Id,
      username: 'john_doe',
      email: 'john@example.com',
      password: 'Password123!',
      bio: 'Full stack developer',
      projects: [project1Id], // john_doe owns project1
      friends: [user2Id],
      friendRequests: [],
      states: {
        online: false,
        lastActive: new Date(),
        statusMessage: 'Building cool stuff'
      },
      createdAt: new Date()
    };

    const user2 = {
      _id: user2Id,
      username: 'jane_smith',
      email: 'jane@example.com',
      password: 'Password123!',
      bio: 'UI/UX Designer and Developer',
      projects: [project2Id], // jane_smith owns project2
      friends: [user1Id],
      friendRequests: [],
      states: {
        online: false,
        lastActive: new Date(),
        statusMessage: 'Designing amazing experiences'
      },
      createdAt: new Date()
    };

    await users.insertMany([user1, user2]);
    console.log('Created 2 users (john_doe and jane_smith)');
    console.log('Password for both: Password123!');

    // Create 2 projects
    const project1 = {
      _id: project1Id,
      title: 'E-Commerce Website',
      description: 'A modern e-commerce platform built with React and Node.js',
      tags: ['react', 'nodejs', 'mongodb', 'ecommerce'],
      owner: user1Id,
      collaborators: [], // Array of user IDs who have access to this project
      about: {
        type: 'Web Application',
        visibility: 'public'
      },
      files: [],
      commits: [
        {
          id: new ObjectId(),
          message: 'Initial project setup with React and Express',
          author: user1Id,
          timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
          files: ['package.json', 'server.js', 'App.js']
        },
        {
          id: new ObjectId(),
          message: 'Added product listing and cart functionality',
          author: user1Id,
          timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
          files: ['ProductList.js', 'Cart.js', 'productRoutes.js']
        },
        {
          id: new ObjectId(),
          message: 'Implemented user authentication and checkout',
          author: user1Id,
          timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
          files: ['Auth.js', 'Checkout.js', 'authRoutes.js']
        }
      ],
      comments: [],
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    };

    const project2 = {
      _id: project2Id,
      title: 'Portfolio Website',
      description: 'Personal portfolio showcasing design and development work',
      tags: ['portfolio', 'react', 'tailwind', 'design'],
      owner: user2Id,
      collaborators: [], // Array of user IDs who have access to this project
      about: {
        type: 'Portfolio',
        visibility: 'public'
      },
      files: [],
      commits: [
        {
          id: new ObjectId(),
          message: 'Initial commit with basic structure',
          author: user2Id,
          timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
          files: ['index.html', 'styles.css']
        },
        {
          id: new ObjectId(),
          message: 'Added projects section and animations',
          author: user2Id,
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
          files: ['Projects.js', 'animations.css']
        }
      ],
      comments: [],
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    };

    await projects.insertMany([project1, project2]);
    console.log('Created 2 projects with commits');

    // Create some sample files for the projects
    const file1 = {
      projectId: project1Id,
      fileId: 'app-js-' + Date.now(),
      name: 'App.js',
      type: 'file',
      path: 'src/App.js',
      content: 'import React from "react";\n\nfunction App() {\n  return <div>E-Commerce App</div>;\n}\n\nexport default App;',
      createdBy: user1Id,
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      lastUpdatedBy: user1Id,
      lastUpdatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      history: []
    };

    const file2 = {
      projectId: project2Id,
      fileId: 'index-html-' + Date.now(),
      name: 'index.html',
      type: 'file',
      path: 'public/index.html',
      content: '<!DOCTYPE html>\n<html>\n<head>\n  <title>My Portfolio</title>\n</head>\n<body>\n  <h1>Welcome to my portfolio</h1>\n</body>\n</html>',
      createdBy: user2Id,
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      lastUpdatedBy: user2Id,
      lastUpdatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      history: []
    };

    await files.insertMany([file1, file2]);
    console.log('Created sample files');

    console.log('\n✅ Database seeded successfully!');
    console.log('\nTest Accounts:');
    console.log('1. Username: john_doe | Email: john@example.com | Password: Password123!');
    console.log('2. Username: jane_smith | Email: jane@example.com | Password: Password123!');
    console.log('\nYou can now test the application with these accounts.');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
