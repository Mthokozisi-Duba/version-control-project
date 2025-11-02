/*
Name: Mthokozisi Duba
Student number: u24690059
Position: 51
*/

import { api, setTokenGetter } from './apiClient';

let authData = {
  token: null,
  user: null
};

setTokenGetter(() => authData.token);

export const authApi = {
  async login(usernameOrEmail, password) {
    try {
      const data = await api.post('/auth/login', { usernameOrEmail, password });
      if (data.token) {
        authData.token = data.token;
        authData.user = data.user;
      }
      return data;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },

  async signup(userData) {
    try {
      const data = await api.post('/auth/signup', userData);
      return data;
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    }
  },

  async logout() {
    try {
      const user = this.getCurrentUser();
      if (user && user.id) {
        await api.post('/auth/logout', { userId: user.id });
      }
    } catch (error) {
      console.error('Logout request failed:', error);
    } finally {
      authData.token = null;
      authData.user = null;
    }
  },

  isAuthenticated() {
    return !!authData.token;
  },

  getCurrentUser() {
    return authData.user;
  },

  getToken() {
    return authData.token;
  },

  updateCurrentUser(userData) {
    if (authData.user) {
      authData.user = { ...authData.user, ...userData };
    }
  }
};