export interface Document {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface ElectronAPI {
  db: {
    saveDocument: (document: { title: string; content: string }) => Promise<{
      success: boolean;
      id?: number;
      error?: string;
    }>;
    getDocument: (id: number) => Promise<{
      success: boolean;
      document?: Document;
      error?: string;
    }>;
    getAllDocuments: () => Promise<{
      success: boolean;
      documents?: Document[];
      error?: string;
    }>;
    updateDocument: (id: number, title: string, content: string) => Promise<{
      success: boolean;
      error?: string;
    }>;
    deleteDocument: (id: number) => Promise<{
      success: boolean;
      error?: string;
    }>;
  };
}

declare global {
  interface Window {
    electron: ElectronAPI;
  }
}
