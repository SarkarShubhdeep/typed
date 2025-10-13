import type { Document } from '../../types/electron';

// Client-side wrapper for Electron database operations
// This provides a clean API for React components to interact with the database

export const dbClient = {
  async saveDocument(title: string, content: string): Promise<number> {
    if (!window.electron) {
      throw new Error('Electron API not available');
    }

    const result = await window.electron.db.saveDocument({ title, content });
    
    if (!result.success || result.id === undefined) {
      throw new Error(result.error || 'Failed to save document');
    }

    return result.id;
  },

  async getDocument(id: number): Promise<Document | null> {
    if (!window.electron) {
      throw new Error('Electron API not available');
    }

    const result = await window.electron.db.getDocument(id);
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to get document');
    }

    return result.document || null;
  },

  async getAllDocuments(): Promise<Document[]> {
    if (!window.electron) {
      throw new Error('Electron API not available');
    }

    const result = await window.electron.db.getAllDocuments();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to get documents');
    }

    return result.documents || [];
  },

  async updateDocument(id: number, title: string, content: string): Promise<void> {
    if (!window.electron) {
      throw new Error('Electron API not available');
    }

    const result = await window.electron.db.updateDocument(id, title, content);
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to update document');
    }
  },

  async deleteDocument(id: number): Promise<void> {
    if (!window.electron) {
      throw new Error('Electron API not available');
    }

    const result = await window.electron.db.deleteDocument(id);
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to delete document');
    }
  },
};
