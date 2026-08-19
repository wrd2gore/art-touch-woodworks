/**
 * ART TOUCH CONTROL CENTER - ELECTRON MAIN PROCESS
 * Secure Desktop Management, Supabase Inquiries Hub & 1-Click GitHub Live Publisher
 */

const { app, BrowserWindow, ipcMain, safeStorage, shell, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const https = require('https');

const GITHUB_OWNER = 'wrd2gore';
const GITHUB_REPO = 'art-touch-woodworks';
const REPO_FULL_NAME = `${GITHUB_OWNER}/${GITHUB_REPO}`;
const PRODUCTION_LIVE_URL = 'https://wrd2gore.github.io/art-touch-woodworks/';
const LIVE_DATA_URL = 'https://wrd2gore.github.io/art-touch-woodworks/js/data.js';

let mainWindow = null;

// ============================================================================
// 1. SECURE TOKEN & BACKEND CREDENTIALS STORAGE (Windows DPAPI safeStorage)
// ============================================================================

function getAuthStorePath() {
  return path.join(app.getPath('userData'), 'auth.dat');
}

function getSupabaseStorePath() {
  return path.join(app.getPath('userData'), 'supabase_auth.dat');
}

function getWritableWorkspacePath() {
  const p = path.join(app.getPath('userData'), 'workspace');
  if (!fs.existsSync(p)) {
    try { fs.mkdirSync(p, { recursive: true }); } catch (e) {}
  }
  return p;
}

function storeEncryptedToken(token) {
  if (!token || typeof token !== 'string') {
    throw new Error('Invalid token provided');
  }

  const cleanToken = token.trim();
  if (safeStorage.isEncryptionAvailable()) {
    const encrypted = safeStorage.encryptString(cleanToken);
    fs.writeFileSync(getAuthStorePath(), encrypted);
    return true;
  } else {
    const buf = Buffer.from(cleanToken, 'utf-8');
    fs.writeFileSync(getAuthStorePath(), buf);
    return true;
  }
}

function getDecryptedToken() {
  const storePath = getAuthStorePath();
  if (!fs.existsSync(storePath)) return null;

  try {
    const rawData = fs.readFileSync(storePath);
    if (safeStorage.isEncryptionAvailable()) {
      return safeStorage.decryptString(rawData);
    } else {
      return rawData.toString('utf-8');
    }
  } catch (err) {
    console.error('Failed to decrypt GitHub token:', err);
    return null;
  }
}

function hasStoredToken() {
  const token = getDecryptedToken();
  return Boolean(token && token.length > 15 && (token.startsWith('ghp_') || token.startsWith('github_pat_') || token.startsWith('gho_')));
}

function deleteStoredToken() {
  const storePath = getAuthStorePath();
  if (fs.existsSync(storePath)) {
    try { fs.unlinkSync(storePath); } catch (e) {}
  }
  return true;
}

// Supabase backend credentials
function storeEncryptedSupabaseConfig(config) {
  const payloadStr = JSON.stringify({
    url: config.url || '',
    anonKey: config.anonKey || '',
    serviceKey: config.serviceKey || ''
  });

  if (safeStorage.isEncryptionAvailable()) {
    const encrypted = safeStorage.encryptString(payloadStr);
    fs.writeFileSync(getSupabaseStorePath(), encrypted);
  } else {
    fs.writeFileSync(getSupabaseStorePath(), Buffer.from(payloadStr, 'utf-8'));
  }
  return true;
}

function getDecryptedSupabaseConfig() {
  const storePath = getSupabaseStorePath();
  if (!fs.existsSync(storePath)) return null;

  try {
    const rawData = fs.readFileSync(storePath);
    let str = '';
    if (safeStorage.isEncryptionAvailable()) {
      str = safeStorage.decryptString(rawData);
    } else {
      str = rawData.toString('utf-8');
    }
    return JSON.parse(str);
  } catch (e) {
    return null;
  }
}

// ============================================================================
// 2. GITHUB REST & GIT DATA API ENGINE (Node.js Main Process)
// ============================================================================

function makeGithubRequest(endpoint, method = 'GET', body = null, token = null) {
  return new Promise((resolve, reject) => {
    const authToken = token || getDecryptedToken();
    if (!authToken) {
      return reject(new Error('No GitHub access token configured. Please save your token in the Publish tab.'));
    }

    const fullPath = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const payload = body ? JSON.stringify(body) : null;

    const options = {
      hostname: 'api.github.com',
      port: 443,
      path: fullPath,
      method: method.toUpperCase(),
      headers: {
        'User-Agent': 'Art-Touch-Control-Center/1.0',
        'Authorization': `Bearer ${authToken}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      }
    };

    if (payload) {
      options.headers['Content-Length'] = Buffer.byteLength(payload);
    }

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        let parsed = null;
        try {
          parsed = data ? JSON.parse(data) : {};
        } catch (e) {
          parsed = { raw: data };
        }

        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve({ status: res.statusCode, data: parsed });
        } else {
          const errMsg = (parsed && parsed.message) || `GitHub API error (HTTP ${res.statusCode})`;
          const err = new Error(errMsg);
          err.statusCode = res.statusCode;
          err.data = parsed;
          reject(err);
        }
      });
    });

    req.on('error', (err) => {
      reject(new Error(`Network request failed: ${err.message}`));
    });

    req.setTimeout(35000, () => {
      req.destroy();
      reject(new Error('GitHub API request timed out after 35 seconds'));
    });

    if (payload) {
      req.write(payload);
    }
    req.end();
  });
}

function verifyLiveUrlResponse(url, expectedBuildId) {
  return new Promise((resolve) => {
    const urlObj = new URL(url);
    urlObj.searchParams.set('_t', Date.now().toString());

    const options = {
      hostname: urlObj.hostname,
      port: 443,
      path: `${urlObj.pathname}${urlObj.search}`,
      method: 'GET',
      headers: {
        'User-Agent': 'Art-Touch-Verifier/1.0',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache'
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => {
        if (res.statusCode === 200 && body.includes(expectedBuildId)) {
          resolve({ verified: true, statusCode: res.statusCode, bodyLength: body.length });
        } else {
          resolve({ verified: false, statusCode: res.statusCode });
        }
      });
    });

    req.on('error', () => resolve({ verified: false, error: 'Network error' }));
    req.setTimeout(8000, () => {
      req.destroy();
      resolve({ verified: false, error: 'Timeout' });
    });
    req.end();
  });
}

// ============================================================================
// 3. PUBLISHING PIPELINE ENGINE
// ============================================================================

async function executePublishPipeline(payload, onProgress) {
  const token = getDecryptedToken();
  if (!token) {
    throw new Error('GitHub Personal Access Token is missing. Please enter and save your token in the Publish tab.');
  }

  const {
    targetBuildId,
    commitMessage,
    dataJsContent,
    projectsHtmlContent,
    servicesHtmlContent,
    indexHtmlContent,
    summary
  } = payload;

  const buildId = targetBuildId || `build-at-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`;
  const message = commitMessage || `Update website content via Art Touch Control Center [Build: ${buildId}]`;
  const workspacePath = getWritableWorkspacePath();

  // Step 1: Preparing changes with automatic cache-busting
  onProgress({ step: 1, state: 'active', message: 'Preparing multi-file commit tree with cache-busting...' });

  const treeItems = [];

  // 1a. js/data.js
  if (dataJsContent) {
    treeItems.push({ path: 'js/data.js', mode: '100644', type: 'blob', content: dataJsContent });
    try {
      fs.writeFileSync(path.join(workspacePath, 'data.js'), dataJsContent, 'utf-8');
    } catch (e) {}

    // If running in development workspace, also sync to local folder if present
    try {
      const devDataPath = path.join(__dirname, '..', 'js', 'data.js');
      if (fs.existsSync(path.dirname(devDataPath))) {
        fs.writeFileSync(devDataPath, dataJsContent, 'utf-8');
      }
    } catch (e) {}
  }

  // 1b. js/projects.js (Make sure public projects.js uses clean single-source-of-truth)
  try {
    let projJsContent = '';
    const localProjJs = path.join(__dirname, 'renderer', 'js', 'projects.js');
    const repoProjJs = path.join(__dirname, '..', 'js', 'projects.js');
    if (fs.existsSync(repoProjJs)) {
      projJsContent = fs.readFileSync(repoProjJs, 'utf-8');
    } else if (fs.existsSync(localProjJs)) {
      projJsContent = fs.readFileSync(localProjJs, 'utf-8');
    }

    if (projJsContent) {
      treeItems.push({ path: 'js/projects.js', mode: '100644', type: 'blob', content: projJsContent });
    }
  } catch (e) {}

  // 1c. Scan and update all public HTML files with cache-busting query parameter js/data.js?v=BUILD_ID
  const publicHtmlFiles = [
    'index.html', 'projects.html', 'project-details.html', 'about.html',
    'services.html', 'quote.html', 'contact.html', 'faq.html',
    'process.html', 'team.html', 'privacy.html', 'terms.html', '404.html'
  ];

  for (const htmlFile of publicHtmlFiles) {
    let content = '';

    if (htmlFile === 'projects.html' && projectsHtmlContent) {
      content = projectsHtmlContent;
    } else if (htmlFile === 'services.html' && servicesHtmlContent) {
      content = servicesHtmlContent;
    } else if (htmlFile === 'index.html' && indexHtmlContent) {
      content = indexHtmlContent;
    } else {
      const repoHtmlPath = path.join(__dirname, '..', htmlFile);
      if (fs.existsSync(repoHtmlPath)) {
        content = fs.readFileSync(repoHtmlPath, 'utf-8');
      }
    }

    if (content) {
      // Stamp cache busting version query string
      const stampedContent = content.replace(
        /<script src="js\/data\.js(\?v=[^"]*)?"><\/script>/g,
        `<script src="js/data.js?v=${buildId}"></script>`
      );

      // Save locally if dev repo exists
      try {
        const repoHtmlPath = path.join(__dirname, '..', htmlFile);
        if (fs.existsSync(repoHtmlPath)) {
          fs.writeFileSync(repoHtmlPath, stampedContent, 'utf-8');
        }
      } catch (e) {}

      // Add to commit tree
      treeItems.push({ path: htmlFile, mode: '100644', type: 'blob', content: stampedContent });
    }
  }

  onProgress({ step: 1, state: 'done', message: `Prepared ${treeItems.length} public static files for deployment.` });

  // Step 2: Local sync
  onProgress({ step: 2, state: 'active', message: 'Synchronizing local workspace...' });
  await new Promise(r => setTimeout(r, 200));
  onProgress({ step: 2, state: 'done', message: 'Local files updated.' });

  // Step 3: Git Tree on GitHub (Multi-File Atomic Commit)
  onProgress({ step: 3, state: 'active', message: 'Connecting to GitHub repository...' });

  const refRes = await makeGithubRequest(`/repos/${REPO_FULL_NAME}/git/ref/heads/main`, 'GET', null, token);
  const parentCommitSha = refRes.data.object.sha;

  const parentCommitRes = await makeGithubRequest(`/repos/${REPO_FULL_NAME}/git/commits/${parentCommitSha}`, 'GET', null, token);
  const baseTreeSha = parentCommitRes.data.tree.sha;

  onProgress({ step: 3, state: 'active', message: 'Building Git tree on GitHub...' });
  const treeRes = await makeGithubRequest(`/repos/${REPO_FULL_NAME}/git/trees`, 'POST', {
    base_tree: baseTreeSha,
    tree: treeItems
  }, token);
  const newTreeSha = treeRes.data.sha;
  onProgress({ step: 3, state: 'done', message: 'Git tree generated successfully.' });

  // Step 4: Create Commit & Update Main Branch
  onProgress({ step: 4, state: 'active', message: 'Creating verified commit...' });
  const commitRes = await makeGithubRequest(`/repos/${REPO_FULL_NAME}/git/commits`, 'POST', {
    message: message,
    tree: newTreeSha,
    parents: [parentCommitSha]
  }, token);
  const latestCommitSha = commitRes.data.sha;

  onProgress({ step: 4, state: 'active', message: 'Pushing to main branch...' });
  await makeGithubRequest(`/repos/${REPO_FULL_NAME}/git/refs/heads/main`, 'PATCH', {
    sha: latestCommitSha,
    force: true
  }, token);

  // Sync master as well
  try {
    await makeGithubRequest(`/repos/${REPO_FULL_NAME}/git/refs/heads/master`, 'PATCH', {
      sha: latestCommitSha,
      force: true
    }, token);
  } catch (e) {}

  onProgress({ step: 4, state: 'done', commitSha: latestCommitSha, message: `Pushed commit ${latestCommitSha.substring(0, 7)} to main.` });

  // Step 5: Trigger GitHub Pages CDN
  onProgress({ step: 5, state: 'active', message: 'GitHub Pages build started...' });
  await new Promise(r => setTimeout(r, 2000));
  onProgress({ step: 5, state: 'done', message: 'Deployment triggered on GitHub Pages.' });

  // Step 6: Verify Live Website CDN
  onProgress({ step: 6, state: 'active', message: `Verifying live CDN (polling ${PRODUCTION_LIVE_URL})...` });

  let isVerified = false;
  const maxAttempts = 30; // 30 attempts * 3s = 90s
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    onProgress({
      step: 6,
      state: 'active',
      message: `Polling live CDN (Attempt ${attempt}/${maxAttempts})...`,
      attempt: attempt,
      maxAttempts: maxAttempts
    });

    const check = await verifyLiveUrlResponse(LIVE_DATA_URL, buildId);
    if (check.verified) {
      isVerified = true;
      break;
    }

    await new Promise(r => setTimeout(r, 3000));
  }

  if (!isVerified) {
    throw new Error(`Deployment verification timed out after 90s. GitHub Pages is processing your commit (${latestCommitSha.substring(0, 7)}). Your changes were committed successfully and will appear live momentarily.`);
  }

  onProgress({ step: 6, state: 'done', message: 'Verified LIVE on public website!' });

  return {
    success: true,
    commitSha: latestCommitSha,
    buildId: buildId,
    verifiedUrl: PRODUCTION_LIVE_URL,
    publishedAt: new Date().toISOString(),
    summary: summary
  };
}

// ============================================================================
// 4. SUPABASE INQUIRIES REST CLIENT (Node.js Main Process)
// ============================================================================

function makeSupabaseRequest(endpoint, method = 'GET', body = null) {
  return new Promise((resolve, reject) => {
    const config = getDecryptedSupabaseConfig();
    if (!config || !config.url || !config.serviceKey) {
      return reject(new Error('Supabase backend not configured. Please enter your Supabase URL & Service Role Key in the Inquiries tab.'));
    }

    const urlObj = new URL(endpoint.startsWith('http') ? endpoint : `${config.url.replace(/\/+$/, '')}/${endpoint.replace(/^\/+/, '')}`);
    const payload = body ? JSON.stringify(body) : null;

    const options = {
      hostname: urlObj.hostname,
      port: 443,
      path: `${urlObj.pathname}${urlObj.search}`,
      method: method.toUpperCase(),
      headers: {
        'User-Agent': 'Art-Touch-Control-Center/1.0',
        'apikey': config.serviceKey,
        'Authorization': `Bearer ${config.serviceKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      }
    };

    if (payload) {
      options.headers['Content-Length'] = Buffer.byteLength(payload);
    }

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        let parsed = null;
        try { parsed = data ? JSON.parse(data) : []; } catch (e) { parsed = { raw: data }; }

        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve({ status: res.statusCode, data: parsed });
        } else {
          const errMsg = (parsed && (parsed.message || parsed.error)) || `Supabase HTTP error ${res.statusCode}`;
          reject(new Error(errMsg));
        }
      });
    });

    req.on('error', (err) => reject(new Error(`Supabase request failed: ${err.message}`)));
    req.setTimeout(25000, () => {
      req.destroy();
      reject(new Error('Supabase request timed out after 25s'));
    });

    if (payload) req.write(payload);
    req.end();
  });
}

// ============================================================================
// 5. IPC HANDLERS REGISTRATION
// ============================================================================

function registerIpcHandlers() {
  // GitHub Auth
  ipcMain.handle('auth:saveToken', async (_event, token) => {
    try {
      if (!token || typeof token !== 'string' || token.trim().length < 15) {
        return { success: false, error: 'Token must be a valid GitHub Personal Access Token.' };
      }
      storeEncryptedToken(token);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  });

  ipcMain.handle('auth:hasToken', async () => hasStoredToken());
  ipcMain.handle('auth:clearToken', async () => deleteStoredToken());

  ipcMain.handle('auth:testToken', async (_event, customToken) => {
    try {
      const token = customToken || getDecryptedToken();
      if (!token) {
        return { success: false, error: 'No token stored. Please enter your GitHub token.' };
      }

      const res = await makeGithubRequest(`/repos/${REPO_FULL_NAME}`, 'GET', null, token);
      const repoData = res.data;

      if (customToken) {
        storeEncryptedToken(customToken);
      }

      return {
        success: true,
        repo: repoData.full_name,
        defaultBranch: repoData.default_branch,
        permissions: repoData.permissions || {}
      };
    } catch (err) {
      return { success: false, error: err.message, statusCode: err.statusCode };
    }
  });

  // Supabase Backend Config & Inquiries Handlers
  ipcMain.handle('inquiries:saveBackendConfig', async (_event, config) => {
    try {
      if (!config || !config.url) {
        return { success: false, error: 'Supabase URL is required.' };
      }
      storeEncryptedSupabaseConfig(config);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  });

  ipcMain.handle('inquiries:getBackendConfig', async () => {
    const cfg = getDecryptedSupabaseConfig();
    if (!cfg) return { configured: false };
    return {
      configured: Boolean(cfg.url && cfg.serviceKey),
      url: cfg.url || '',
      anonKey: cfg.anonKey || '',
      hasServiceKey: Boolean(cfg.serviceKey && cfg.serviceKey.length > 20)
    };
  });

  ipcMain.handle('inquiries:fetchRemote', async () => {
    try {
      const res = await makeSupabaseRequest('rest/v1/inquiries?order=created_at.desc', 'GET');
      return { success: true, data: res.data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  });

  ipcMain.handle('inquiries:updateStatus', async (_event, id, newStatus) => {
    try {
      await makeSupabaseRequest(`rest/v1/inquiries?id=eq.${encodeURIComponent(id)}`, 'PATCH', { status: newStatus });
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  });

  ipcMain.handle('inquiries:delete', async (_event, id) => {
    try {
      await makeSupabaseRequest(`rest/v1/inquiries?id=eq.${encodeURIComponent(id)}`, 'DELETE');
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  });

  // Publishing handler
  ipcMain.handle('publish:start', async (event, payload) => {
    try {
      const result = await executePublishPipeline(payload, (progressData) => {
        if (!event.sender.isDestroyed()) {
          event.sender.send('publish:progress', progressData);
        }
      });
      return { success: true, ...result };
    } catch (err) {
      return { success: false, error: err.message };
    }
  });

  // Local master data file reading / writing (with safe workspace caching)
  ipcMain.handle('data:readLocalMaster', async () => {
    try {
      const workspaceFile = path.join(getWritableWorkspacePath(), 'data.js');
      if (fs.existsSync(workspaceFile)) {
        const content = fs.readFileSync(workspaceFile, 'utf-8');
        return { success: true, content };
      }

      const bundledFile = path.join(__dirname, 'renderer', 'js', 'data.js');
      if (fs.existsSync(bundledFile)) {
        const content = fs.readFileSync(bundledFile, 'utf-8');
        return { success: true, content };
      }

      return { success: false, error: 'Data file not found' };
    } catch (err) {
      return { success: false, error: err.message };
    }
  });

  ipcMain.handle('data:saveLocalMaster', async (_event, dataJsContent) => {
    try {
      const workspaceFile = path.join(getWritableWorkspacePath(), 'data.js');
      fs.writeFileSync(workspaceFile, dataJsContent, 'utf-8');
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  });

  // Shell & Utilities
  ipcMain.handle('shell:openExternal', async (_event, url) => {
    if (url && (url.startsWith('https://') || url.startsWith('http://') || url.startsWith('mailto:') || url.startsWith('tel:'))) {
      await shell.openExternal(url);
      return true;
    }
    return false;
  });

  ipcMain.handle('app:getInfo', async () => {
    return {
      version: app.getVersion(),
      name: app.getName(),
      isEncryptionAvailable: safeStorage.isEncryptionAvailable(),
      userDataPath: app.getPath('userData')
    };
  });
}

// ============================================================================
// 6. APPLICATION WINDOW CREATION
// ============================================================================

function createMainWindow() {
  const iconPath = path.join(__dirname, '..', 'art-touch.ico');

  mainWindow = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1120,
    minHeight: 720,
    title: 'Art Touch Control Center - Management & Live Publishing',
    icon: fs.existsSync(iconPath) ? iconPath : undefined,
    backgroundColor: '#0A0D12',
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false,
      devTools: true
    }
  });

  mainWindow.setMenuBarVisibility(false);

  // Failure visibility: Catch navigation or load failures
  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription, validatedURL) => {
    console.error(`[Main Process] Window load failed: ${errorCode} - ${errorDescription} (${validatedURL})`);
    dialog.showErrorBox(
      'Art Touch Control Center - Load Error',
      `Failed to load application interface:\n\nError Code: ${errorCode}\nDescription: ${errorDescription}\nTarget: ${validatedURL}\n\nPlease check installation integrity.`
    );
  });

  // Console message forwarding from Renderer to Main Process Node console
  mainWindow.webContents.on('console-message', (event, level, message, line, sourceId) => {
    const levelNames = ['LOG', 'WARN', 'ERROR', 'INFO'];
    const lvl = levelNames[level] || 'LOG';
    console.log(`[Renderer ${lvl}] ${message} (${path.basename(sourceId || '')}:${line})`);
  });

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:') || url.startsWith('http:') || url.startsWith('mailto:') || url.startsWith('tel:')) {
      shell.openExternal(url);
    }
    return { action: 'deny' };
  });

  const adminHtmlPath = path.join(__dirname, 'renderer', 'admin.html');
  console.log('[Main Process] Loading UI from:', adminHtmlPath);
  mainWindow.loadFile(adminHtmlPath);

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// ============================================================================
// 7. APP LIFECYCLE
// ============================================================================

app.whenReady().then(() => {
  registerIpcHandlers();
  createMainWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
