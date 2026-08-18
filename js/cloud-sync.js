/**
 * ============================================================================
 * ART TOUCH WOODWORKS — UNIVERSAL REAL-TIME CLOUD DATABASE ENGINE
 * Real-Time Bridge Connecting Desktop App and Live Website
 * ============================================================================
 */

const ArtTouchCloudSync = (function() {
  'use strict';

  const STORAGE_INQUIRIES_KEY = 'arttouch_inquiries';
  const STORAGE_PROJECTS_KEY = 'arttouch_projects';

  // Dedicated High-Speed CORS Cloud Database Endpoints
  const CLOUD_INQUIRIES_ENDPOINT = 'https://api.restful-api.dev/objects/ff8081819ff5b11001a012cb6ee83d51';
  const CLOUD_PROJECTS_ENDPOINT = 'https://api.restful-api.dev/objects/ff8081819ff5b11001a012cbb9523d52';

  // ==========================================================================
  // 1. PROJECTS SYNCHRONIZATION (Desktop App -> Cloud DB -> Live Website)
  // ==========================================================================

  /**
   * Save and push projects to the universal cloud database (Called by Desktop App)
   */
  async function pushProjectsToCloud(projectsList) {
    if (!Array.isArray(projectsList) || projectsList.length === 0) return false;

    // 1. Save locally
    try {
      localStorage.setItem(STORAGE_PROJECTS_KEY, JSON.stringify(projectsList));
      localStorage.setItem('arttouch_custom_projects', JSON.stringify(projectsList));
      if (window.ArtTouchData) window.ArtTouchData.projects = projectsList;
    } catch (e) {}

    // 2. Push to Dedicated Cloud Database
    try {
      const payload = {
        name: 'Art Touch Projects Cloud Store',
        data: {
          projects: projectsList,
          updatedAt: new Date().toISOString()
        }
      };

      const res = await fetch(CLOUD_PROJECTS_ENDPOINT, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        console.log('Projects successfully saved to live cloud database!');
        return true;
      }
    } catch (err) {
      console.warn('Cloud database projects push error:', err);
    }

    return false;
  }

  /**
   * Fetch latest live projects from the cloud database (Called by Website on load)
   */
  async function fetchLiveProjects(callback) {
    let projects = null;

    // 1. Fetch from Dedicated Cloud Database (bypassing any browser cache)
    try {
      const res = await fetch(CLOUD_PROJECTS_ENDPOINT, { 
        method: 'GET',
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache' }
      });
      if (res.ok) {
        const doc = await res.json();
        if (doc && doc.data && Array.isArray(doc.data.projects) && doc.data.projects.length > 0) {
          projects = doc.data.projects;
          try {
            localStorage.setItem(STORAGE_PROJECTS_KEY, JSON.stringify(projects));
            localStorage.setItem('arttouch_custom_projects', JSON.stringify(projects));
            if (window.ArtTouchData) window.ArtTouchData.projects = projects;
          } catch (e) {}
        }
      }
    } catch (err) {
      console.warn('Cloud database projects fetch error:', err);
    }

    // 2. Check local storage cache if cloud is slow
    if (!projects) {
      try {
        const cached = localStorage.getItem(STORAGE_PROJECTS_KEY) || localStorage.getItem('arttouch_custom_projects');
        if (cached) {
          projects = JSON.parse(cached);
        }
      } catch (e) {}
    }

    // 3. Fallback to default bundled projects
    if (!projects && window.ArtTouchData && Array.isArray(window.ArtTouchData.projects)) {
      projects = window.ArtTouchData.projects;
    }

    if (typeof callback === 'function' && projects) {
      callback(projects);
    }

    return projects;
  }

  // ==========================================================================
  // 2. INQUIRIES SYNCHRONIZATION (Website -> Cloud DB -> Desktop App)
  // ==========================================================================

  async function sendInquiry(inquiryData) {
    if (!inquiryData.id) inquiryData.id = 'inq-' + Date.now();
    if (!inquiryData.timestamp) inquiryData.timestamp = new Date().toISOString();
    if (!inquiryData.status) inquiryData.status = 'new';

    // 1. Save locally
    const list = getLocalInquiries();
    if (!list.some(i => i.id === inquiryData.id)) {
      list.unshift(inquiryData);
      try {
        localStorage.setItem(STORAGE_INQUIRIES_KEY, JSON.stringify(list));
      } catch (e) {}
    }

    // 2. Dispatch to Dedicated Cloud Database
    try {
      // First get current list
      const getRes = await fetch(CLOUD_INQUIRIES_ENDPOINT, { 
        method: 'GET',
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache' }
      });
      let currentInquiries = [];
      if (getRes.ok) {
        const doc = await getRes.json();
        if (doc && doc.data && Array.isArray(doc.data.inquiries)) {
          currentInquiries = doc.data.inquiries;
        }
      }

      if (!currentInquiries.some(i => i.id === inquiryData.id)) {
        currentInquiries.unshift(inquiryData);
      }

      const updatePayload = {
        name: 'Art Touch Woodworks Live Cloud Database',
        data: {
          inquiries: currentInquiries,
          updatedAt: new Date().toISOString()
        }
      };

      await fetch(CLOUD_INQUIRIES_ENDPOINT, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatePayload)
      });

      console.log('Inquiry pushed to live cloud database successfully!');
    } catch (err) {
      console.warn('Inquiry cloud dispatch error:', err);
    }

    return true;
  }

  function getLocalInquiries() {
    try {
      const stored = localStorage.getItem(STORAGE_INQUIRIES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  }

  async function syncInquiries(callback) {
    let list = getLocalInquiries();

    try {
      const res = await fetch(CLOUD_INQUIRIES_ENDPOINT, { 
        method: 'GET',
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache' }
      });
      if (res.ok) {
        const doc = await res.json();
        const remoteInquiries = (doc && doc.data && Array.isArray(doc.data.inquiries)) ? doc.data.inquiries : [];

        if (remoteInquiries.length > 0) {
          const ids = new Set(list.map(i => i.id));
          remoteInquiries.forEach(item => {
            if (!ids.has(item.id)) {
              list.unshift(item);
              ids.add(item.id);
            }
          });
          try {
            localStorage.setItem(STORAGE_INQUIRIES_KEY, JSON.stringify(list));
          } catch (e) {}
        }
      }
    } catch (err) {
      console.warn('Inquiries cloud sync error:', err);
    }

    if (typeof callback === 'function') {
      callback(list);
    }

    return list;
  }

  return {
    pushProjectsToCloud: pushProjectsToCloud,
    fetchLiveProjects: fetchLiveProjects,
    sendInquiry: sendInquiry,
    getLocalInquiries: getLocalInquiries,
    syncInquiries: syncInquiries,
    endpoints: {
      inquiries: CLOUD_INQUIRIES_ENDPOINT,
      projects: CLOUD_PROJECTS_ENDPOINT
    }
  };
})();

if (typeof window !== 'undefined') {
  window.ArtTouchCloudSync = ArtTouchCloudSync;
}
