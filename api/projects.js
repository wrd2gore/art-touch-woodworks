// Vercel Serverless Function for Live Project Portfolio Sync
// Allows the Desktop App to update live website projects in real time without redeploying!

let liveProjectsStore = null;

module.exports = (req, res) => {
  // Enable CORS from any origin (Desktop App, local files, Vercel, mobile)
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Save / Update Projects from Desktop App
  if (req.method === 'POST' || req.method === 'PUT') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
      const projects = Array.isArray(body) ? body : (body.projects || []);
      
      if (Array.isArray(projects) && projects.length > 0) {
        liveProjectsStore = projects;
        return res.status(200).json({ success: true, count: liveProjectsStore.length, timestamp: new Date().toISOString() });
      } else {
        return res.status(400).json({ success: false, error: 'Invalid projects array' });
      }
    } catch (err) {
      return res.status(400).json({ success: false, error: err.message });
    }
  }

  // Get Latest Projects on Live Website
  res.status(200).json({ 
    success: true, 
    projects: liveProjectsStore, 
    updatedAt: new Date().toISOString() 
  });
};
