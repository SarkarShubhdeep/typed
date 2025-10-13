import { contextBridge, ipcRenderer } from 'electron';

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electron', {
  db: {
    saveDocument: (document: { title: string; content: string }) =>
      ipcRenderer.invoke('db:saveDocument', document),
    
    getDocument: (id: number) =>
      ipcRenderer.invoke('db:getDocument', id),
    
    getAllDocuments: () =>
      ipcRenderer.invoke('db:getAllDocuments'),
    
    updateDocument: (id: number, title: string, content: string) =>
      ipcRenderer.invoke('db:updateDocument', id, title, content),
    
    deleteDocument: (id: number) =>
      ipcRenderer.invoke('db:deleteDocument', id),
  },
});
