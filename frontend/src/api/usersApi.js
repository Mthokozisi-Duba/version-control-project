/*
Name: Mthokozisi Duba
Student number: u24690059
Position: 51
*/

import { api } from './apiClient';

export const usersApi = {
  // Get all users
  async getAllUsers() {
    try {
      const data = await api.get('/users');
      return data.users || [];
    } catch (error) {
      console.error('Failed to fetch users:', error);
      throw error;
    }
  },

  // Get user by ID
  async getUserById(id) {
    try {
      const data = await api.get(`/users/${id}`);
      return data.user;
    } catch (error) {
      console.error(`Failed to fetch user ${id}:`, error);
      throw error;
    }
  },

  // Update user profile
  async updateProfile(id, updates) {
    try {
      const data = await api.put(`/users/${id}`, updates);
      return data;
    } catch (error) {
      console.error(`Failed to update user ${id}:`, error);
      throw error;
    }
  },

  // Send friend request
  async sendFriendRequest(toUserId, fromUserId) {
    try {
      const data = await api.post(`/users/${toUserId}/friend-request`, { fromUserId });
      return data;
    } catch (error) {
      console.error('Failed to send friend request:', error);
      throw error;
    }
  },

  // Add friend directly (no request/accept flow)
  async addFriend(toUserId, fromUserId) {
    try {
      const data = await api.post(`/users/${toUserId}/add-friend`, { fromUserId });
      return data;
    } catch (error) {
      console.error('Failed to add friend:', error);
      throw error;
    }
  },

  // Accept friend request
  async acceptFriendRequest(userId, friendId) {
    try {
      const data = await api.post(`/users/${userId}/accept-friend`, { friendId });
      return data;
    } catch (error) {
      console.error('Failed to accept friend request:', error);
      throw error;
    }
  },

  // Reject friend request
  async rejectFriendRequest(userId, friendId) {
    try {
      const data = await api.post(`/users/${userId}/reject-friend`, { friendId });
      return data;
    } catch (error) {
      console.error('Failed to reject friend request:', error);
      throw error;
    }
  },

  // Unfriend a user
  async unfriend(userId, friendId) {
    try {
      const data = await api.post(`/users/${userId}/unfriend`, { friendId });
      return data;
    } catch (error) {
      console.error('Failed to unfriend user:', error);
      throw error;
    }
  },

  // Search users
  async searchUsers(query) {
    try {
      const data = await api.get(`/users/search/${query}`);
      return data.users || [];
    } catch (error) {
      console.error('Failed to search users:', error);
      throw error;
    }
  }
};
