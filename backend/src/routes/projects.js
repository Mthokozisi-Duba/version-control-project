/*
Name: Mthokozisi Duba
Student number: u24690059
Position: 51
*/

const express = require('express');
const router = express.Router();
const projectManager = require('../projectManger');
const fileManager = require('../fileManager');


// List all projects
router.get('/', async (req, res) => {
  try {
    const projects = await projectManager.listProjects();
    res.json({ ok: true, projects });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// Search projects (must come before /:id route)
router.get('/search/:query', async (req, res) => {
  try {
    const projects = await projectManager.searchProjects(req.params.query);
    res.json({ ok: true, projects });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// Get project by ID
router.get('/:id', async (req, res) => {
  try {
    // Validate ObjectId format
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ ok: false, error: 'Invalid project ID format' });
    }
    
    const project = await projectManager.getProjectById(req.params.id);
    if (!project) {
      return res.status(404).json({ ok: false, error: 'Project not found' });
    }
    res.json({ ok: true, project });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// Create new project
router.post('/', async (req, res) => {
  try {
    const { title, description, tags = [], owner = "Anonymous" } = req.body;
    
    // Validate input
    if (!title || title.trim() === '') {
      return res.status(400).json({ ok: false, error: 'Project title is required' });
    }
    
    if (title.length > 100) {
      return res.status(400).json({ ok: false, error: 'Project title must be less than 100 characters' });
    }
    
    const projectId = await projectManager.createProject({
      title: title.trim(),
      description: description || '',
      tags,
      owner,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    res.json({ ok: true, projectId });
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message });
  }
});

// Update project
router.put('/:id', async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    await projectManager.updateProject(req.params.id, {
      ...(title && { title }),
      ...(description && { description }),
      ...(tags && { tags }),
      updatedAt: new Date()
    });
    res.json({ ok: true });
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message });
  }
});

// Add commit to project
router.post('/:id/commits', async (req, res) => {
  try {
    const { message, files } = req.body;
    const commit = {
      message,
      files,
      timestamp: new Date(),
      author: req.body.author || 'Anonymous'
    };
    await projectManager.addCommit(req.params.id, commit);
    await projectManager.updateProject(req.params.id, { updatedAt: new Date() });
    res.json({ ok: true });
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message });
  }
});

// Delete project
router.delete('/:id', async (req, res) => {
  try {
    await projectManager.deleteProject(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message });
  }
});

// Checkout project
router.post('/:id/checkout', async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ ok: false, error: 'userId is required' });
    }
    await projectManager.checkoutProject(req.params.id, userId);
    res.json({ ok: true });
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message });
  }
});

// Checkin project (with commit)
router.post('/:id/checkin', async (req, res) => {
  try {
    const { userId, message, files } = req.body;
    if (!userId || !message) {
      return res.status(400).json({ ok: false, error: 'userId and message are required' });
    }
    await projectManager.checkinProject(req.params.id, userId, message, files);
    res.json({ ok: true });
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message });
  }
});

// Get project files
router.get('/:id/files', async (req, res) => {
  try {
    const files = await projectManager.getProjectFiles(req.params.id);
    res.json({ ok: true, files });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// Create a new file in project
router.post('/:id/files', async (req, res) => {
  try {
    const { name, content = '', createdBy } = req.body;
    
    if (!name || name.trim() === '') {
      return res.status(400).json({ ok: false, error: 'File name is required' });
    }
    
    // Generate a unique fileId
    const fileId = `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const fileRecordId = await fileManager.createFileRecord(req.params.id, {
      fileId,
      name: name.trim(),
      content,
      createdBy
    });
    
    // Update project's updatedAt
    await projectManager.updateProject(req.params.id, { updatedAt: new Date() });
    
    res.json({ ok: true, fileId: fileRecordId });
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message });
  }
});

// Add collaborator to project
router.post('/:id/collaborators', async (req, res) => {
  try {
    const { userId } = req.body;
    
    if (!userId) {
      return res.status(400).json({ ok: false, error: 'userId is required' });
    }
    
    await projectManager.addCollaborator(req.params.id, userId);
    res.json({ ok: true });
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message });
  }
});

// Remove collaborator from project
router.delete('/:id/collaborators/:userId', async (req, res) => {
  try {
    await projectManager.removeCollaborator(req.params.id, req.params.userId);
    res.json({ ok: true });
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message });
  }
});

module.exports = router;
