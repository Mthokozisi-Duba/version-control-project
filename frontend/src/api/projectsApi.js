/*
Name: Mthokozisi Duba
Student number: u24690059
Position: 51
*/

import { api } from './apiClient';

export const projectsApi = {
  // Get all projects
  async getProjects() {
    try {
      const data = await api.get('/projects');
      return data.projects || [];
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      throw error;
    }
  },

  // Get single project by ID
  async getProjectById(id) {
    try {
      const data = await api.get(`/projects/${id}`);
      return data.project;
    } catch (error) {
      console.error(`Failed to fetch project ${id}:`, error);
      throw error;
    }
  },

  // Create new project
  async createProject(projectData) {
    try {
      const data = await api.post('/projects', projectData);
      return data;
    } catch (error) {
      console.error('Failed to create project:', error);
      throw error;
    }
  },

  // Update project
  async updateProject(id, projectData) {
    try {
      const data = await api.put(`/projects/${id}`, projectData);
      return data;
    } catch (error) {
      console.error(`Failed to update project ${id}:`, error);
      throw error;
    }
  },

  // Get project commits
  async getProjectCommits(id) {
    try {
      const data = await api.get(`/projects/${id}/commits`);
      return data.commits || [];
    } catch (error) {
      console.error(`Failed to fetch commits for project ${id}:`, error);
      throw error;
    }
  },

  // Delete project
  async deleteProject(id) {
    try {
      const data = await api.delete(`/projects/${id}`);
      return data;
    } catch (error) {
      console.error(`Failed to delete project ${id}:`, error);
      throw error;
    }
  },

  // Search projects
  async searchProjects(query) {
    try {
      const data = await api.get(`/projects/search/${query}`);
      return data.projects || [];
    } catch (error) {
      console.error('Failed to search projects:', error);
      throw error;
    }
  },

  // Checkout project
  async checkoutProject(id, userId) {
    try {
      const data = await api.post(`/projects/${id}/checkout`, { userId });
      return data;
    } catch (error) {
      console.error(`Failed to checkout project ${id}:`, error);
      throw error;
    }
  },

  // Checkin project (commit changes)
  async checkinProject(id, userId, message, files) {
    try {
      const data = await api.post(`/projects/${id}/checkin`, { userId, message, files });
      return data;
    } catch (error) {
      console.error(`Failed to checkin project ${id}:`, error);
      throw error;
    }
  },

  // Get project files
  async getProjectFiles(id) {
    try {
      const data = await api.get(`/projects/${id}/files`);
      return data.files || [];
    } catch (error) {
      console.error(`Failed to fetch files for project ${id}:`, error);
      throw error;
    }
  },

  // Create a new file in project
  async createFile(projectId, fileData) {
    try {
      const data = await api.post(`/projects/${projectId}/files`, fileData);
      return data;
    } catch (error) {
      console.error(`Failed to create file in project ${projectId}:`, error);
      throw error;
    }
  },

  // Add commit to project
  async addCommit(id, commitData) {
    try {
      const data = await api.post(`/projects/${id}/commits`, commitData);
      return data;
    } catch (error) {
      console.error(`Failed to add commit to project ${id}:`, error);
      throw error;
    }
  },

  // Add collaborator to project
  async addCollaborator(projectId, userId) {
    try {
      const data = await api.post(`/projects/${projectId}/collaborators`, { userId });
      return data;
    } catch (error) {
      console.error(`Failed to add collaborator to project ${projectId}:`, error);
      throw error;
    }
  },

  // Remove collaborator from project
  async removeCollaborator(projectId, userId) {
    try {
      const data = await api.delete(`/projects/${projectId}/collaborators/${userId}`);
      return data;
    } catch (error) {
      console.error(`Failed to remove collaborator from project ${projectId}:`, error);
      throw error;
    }
  }
};
