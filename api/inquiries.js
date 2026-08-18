// Vercel Serverless Function for Art Touch Inquiries & Requests
// Handles CORS and persists inquiries across live website and desktop app

let globalInquiries = [];

module.exports = (req, res) => {
  // CORS Headers
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

  if (req.method === 'POST') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
      const record = {
        id: body.id || ('inq-' + Date.now()),
        type: body.type || 'contact',
        name: body.name || 'Anonymous Client',
        email: body.email || '',
        phone: body.phone || '',
        subject: body.subject || 'Website Inquiry',
        message: body.message || '',
        metadata: body.metadata || null,
        timestamp: body.timestamp || new Date().toISOString(),
        status: body.status || 'new'
      };

      globalInquiries.unshift(record);
      res.status(200).json({ success: true, record: record, total: globalInquiries.length });
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
    return;
  }

  if (req.method === 'DELETE') {
    const { id } = req.query;
    if (id) {
      globalInquiries = globalInquiries.filter(i => i.id !== id);
    }
    res.status(200).json({ success: true, total: globalInquiries.length });
    return;
  }

  // GET
  res.status(200).json({ success: true, inquiries: globalInquiries });
};
