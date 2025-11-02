/*
Name: Mthokozisi Duba
Student number: u24690059
Position: 51
*/

import { api } from './apiClient';

export const filesApi = {
  // Get file by ID
  async getFileById(fileId) {
    try {
      const data = await api.get(`/files/${fileId}`);
      return data.file;
    } catch (error) {
      console.error(`Failed to fetch file ${fileId}:`, error);
      throw error;
    }
  },

  // Update file content
  async updateFileContent(fileId, content, updatedBy) {
    try {
      const data = await api.post(`/files/${fileId}`, { content, updatedBy });
      return data;
    } catch (error) {
      console.error(`Failed to update file ${fileId}:`, error);
      throw error;
    }
  },

  // Get file history
  async getFileHistory(fileId) {
    try {
      const data = await api.get(`/files/${fileId}/history`);
      return data.history || [];
    } catch (error) {
      console.error(`Failed to fetch history for file ${fileId}:`, error);
      throw error;
    }
  }
};
