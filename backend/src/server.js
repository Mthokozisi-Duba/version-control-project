/*
Name: Mthokozisi Duba
Student number: u24690059
Position: 51
*/

const express = require('express');
const path = require('path');
const http = require('http');
const { Server: IOServer } = require('socket.io');
const db = require('./database');
const userManager = require('./userManager');
const projectManager = require('./projectManger');
const fileManager = require('./fileManager');

const projectsRouter = require('./routes/projects');
const usersRouter = require('./routes/users');

const app = express();
const server = http.createServer(app);
const io = new IOServer(server);
const port = process.env.PORT || 3000;

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json({ limit: '2mb' }));
app.use(express.static(path.join(__dirname, '../../dist/public')));

// connect to MongoDB before accepting requests
db.connect().catch(err => {
  console.error('Failed to connect to DB', err);
  process.exit(1);
});

// Simple health
app.get('/api', (req, res) => res.json({ message: 'Backend OK' }));

// Projects API

// Auth: signup
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ ok: false, error: 'All fields are required' });
    }
    
    if (username.length < 3) {
      return res.status(400).json({ ok: false, error: 'Username must be at least 3 characters' });
    }
    
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return res.status(400).json({ ok: false, error: 'Invalid email format' });
    }
    
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/.test(password)) {
      return res.status(400).json({ ok: false, error: 'Password must be at least 8 characters with uppercase, lowercase, number, and special character' });
    }
    
    const result = await userManager.createUser({ username, email, password });
    res.json({ ok: true, id: result.insertedId });
  } catch (err) {
    if (err.message === 'username_or_email_taken') {
      return res.status(400).json({ ok: false, error: 'Username or email already taken' });
    }
    res.status(400).json({ ok: false, error: err.message });
  }
});

// Auth: login (returns simple token = userId for now)
app.post('/api/auth/login', async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;
    
    // Validate input
    if (!usernameOrEmail || !password) {
      return res.status(400).json({ ok: false, error: 'Username/email and password are required' });
    }
    
    const user = await userManager.findByCredentials({ usernameOrEmail, password });
    if (!user) {
      return res.status(401).json({ ok: false, error: 'Invalid credentials' });
    }
    
    // basic token - in production use JWT or sessions
    const token = String(user._id);
    await userManager.setOnlineStatus(user._id, true);
    res.json({ ok: true, token, user: { id: user._id, username: user.username, email: user.email } });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// Auth: logout
app.post('/api/auth/logout', async (req, res) => {
  try {
    const { userId } = req.body;
    if (userId) {
      await userManager.setOnlineStatus(userId, false);
    }
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// Mount projects router
app.use('/api/projects', projectsRouter);

// Mount users router
app.use('/api/users', usersRouter);

// Files: get file by ID
app.get('/api/files/:fileId', async (req, res) => {
  try {
    const file = await fileManager.getFileById(req.params.fileId);
    if (!file) {
      return res.status(404).json({ ok: false, error: 'File not found' });
    }
    res.json({ ok: true, file });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// Files: update file content
app.post('/api/files/:fileId', async (req, res) => {
  try {
    const { content, updatedBy } = req.body;
    await fileManager.updateFileContent(req.params.fileId, content, updatedBy);
    res.json({ ok: true });
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message });
  }
});

// Files: get file history
app.get('/api/files/:fileId/history', async (req, res) => {
  try {
    const file = await fileManager.getFileById(req.params.fileId);
    if (!file) {
      return res.status(404).json({ ok: false, error: 'File not found' });
    }
    res.json({ ok: true, history: file.history || [] });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// fallback to SPA
app.use((req, res) => {
  res.sendFile(path.resolve(__dirname, '../../dist/public/index.html'));
});

// Socket.IO for presence/login
io.on('connection', socket => {
  socket.on('login', async ({ token }) => {
    // token is userId string
    try {
      await userManager.setOnlineStatus(token, true);
      socket.userId = token;
      io.emit('presence', { userId: token, online: true });
    } catch (err) {
      socket.emit('error', { message: err.message });
    }
  });

  socket.on('disconnect', async () => {
    if (socket.userId) {
      await userManager.setOnlineStatus(socket.userId, false);
      io.emit('presence', { userId: socket.userId, online: false });
    }
  });
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error('Port 3000 is in use. Please stop other servers first.');
    process.exit(1);
  }
});

server.listen(3000, () => {
  console.log('Server listening at http://localhost:3000');
});
