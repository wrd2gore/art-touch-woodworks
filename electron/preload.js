/**
 * ART TOUCH CONTROL CENTER — ELECTRON SECURE PRELOAD BRIDGE
 * Exposes a minimal, context-isolated API to the renderer window.
 */

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('artTouchElectron', {
  isElectron: true,

  // Secure GitHub Token Operations (OS safeStorage / DPAPI)
  saveToken: (token) => ipcRenderer.invoke('auth:saveToken', token),
  hasToken: () => ipcRenderer.invoke('auth:hasToken'),
  testToken: (token) => ipcRenderer.invoke('auth:testToken', token),
  clearToken: () => ipcRenderer.invoke('auth:clearToken'),

  // Secure Inquiries Backend (Supabase REST + RLS)
  saveBackendConfig: (config) => ipcRenderer.invoke('inquiries:saveBackendConfig', config),
  getBackendConfig: () => ipcRenderer.invoke('inquiries:getBackendConfig'),
  fetchRemoteInquiries: () => ipcRenderer.invoke('inquiries:fetchRemote'),
  updateInquiryStatus: (id, newStatus) => ipcRenderer.invoke('inquiries:updateStatus', id, newStatus),
  deleteInquiry: (id) => ipcRenderer.invoke('inquiries:delete', id),

  // Publishing Pipeline (Executed in Node.js Main Process)
  publish: (payload) => ipcRenderer.invoke('publish:start', payload),
  onPublishProgress: (callback) => {
    const handler = (_event, data) => callback(data);
    ipcRenderer.on('publish:progress', handler);
    return () => ipcRenderer.removeListener('publish:progress', handler);
  },

  // Local Data & Files
  readLocalMasterData: () => ipcRenderer.invoke('data:readLocalMaster'),
  saveLocalMasterData: (dataJsContent) => ipcRenderer.invoke('data:saveLocalMaster', dataJsContent),

  // Shell & Utilities
  openExternal: (url) => ipcRenderer.invoke('shell:openExternal', url),
  getAppInfo: () => ipcRenderer.invoke('app:getInfo')
});
