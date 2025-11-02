/*
Name: Mthokozisi Duba
Student number: u24690059
Position: 51
*/

const express = require('express');
const router = express.Router();
const userManager = require('../userManager');

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await userManager.getAllUsers();
    res.json({ ok: true, users });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// Search users (must come before /:id route)
router.get('/search/:query', async (req, res) => {
  try {
    const users = await userManager.searchUsers(req.params.query);
    res.json({ ok: true, users });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await userManager.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ ok: false, error: 'User not found' });
    }
    // Remove password from response
    delete user.password;
    res.json({ ok: true, user });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// Update user profile
router.put('/:id', async (req, res) => {
  try {
    const updates = req.body;
    await userManager.updateUserProfile(req.params.id, updates);
    res.json({ ok: true });
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message });
  }
});

// Send friend request
router.post('/:id/friend-request', async (req, res) => {
  try {
    const { fromUserId } = req.body;
    if (!fromUserId) {
      return res.status(400).json({ ok: false, error: 'fromUserId is required' });
    }
    await userManager.sendFriendRequest(fromUserId, req.params.id);
    res.json({ ok: true });
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message });
  }
});

// Add friend directly (no request/accept flow)
router.post('/:id/add-friend', async (req, res) => {
  try {
    const { fromUserId } = req.body;
    if (!fromUserId) {
      return res.status(400).json({ ok: false, error: 'fromUserId is required' });
    }
    await userManager.addFriend(fromUserId, req.params.id);
    res.json({ ok: true });
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message });
  }
});

// Accept friend request
router.post('/:id/accept-friend', async (req, res) => {
  try {
    const { friendId } = req.body;
    if (!friendId) {
      return res.status(400).json({ ok: false, error: 'friendId is required' });
    }
    await userManager.acceptFriendRequest(req.params.id, friendId);
    res.json({ ok: true });
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message });
  }
});

// Reject friend request
router.post('/:id/reject-friend', async (req, res) => {
  try {
    const { friendId } = req.body;
    if (!friendId) {
      return res.status(400).json({ ok: false, error: 'friendId is required' });
    }
    await userManager.rejectFriendRequest(req.params.id, friendId);
    res.json({ ok: true });
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message });
  }
});

// Unfriend a user
router.post('/:id/unfriend', async (req, res) => {
  try {
    const { friendId } = req.body;
    if (!friendId) {
      return res.status(400).json({ ok: false, error: 'friendId is required' });
    }
    await userManager.unfriend(req.params.id, friendId);
    res.json({ ok: true });
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message });
  }
});

module.exports = router;
