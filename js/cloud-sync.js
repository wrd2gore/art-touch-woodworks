/**
 * ============================================================================
 * ART TOUCH WOODWORKS — UNIVERSAL REAL-TIME CLOUD SYNC ENGINE
 * Bridges Desktop App with Live Website for Projects and Client Inquiries
 * ============================================================================
 */

const ArtTouchCloudSync = (function() {
  'use strict';

  const STORAGE_INQUIRIES_KEY = 'arttouch_inquiries';
  const STORAGE_PROJECTS_KEY = 'arttouch_projects';
  const API_URL_KEY = 'arttouch_api_url';

  // Primary Live Backend Endpoints (Vercel Serverless + Public Cloud Fallback)
  const DEFAULT_API_BASE = 'https://arttouchjo.vercel.app';
  const CLOUD_KV_PROJECTS_URL = 'https://api.jsonstorage.net/v1/json/00000000-0000-0000-0000-000000000000/arttouch-projects';

  function getApiBase() {
    try {
      const custom = localStorage.getItem(API_URL_KEY);
      if (custom && custom.startsWith('http')) return custom.replace(/\/+$/, '');
    } catch (e) {}

    if (typeof window !== 'undefined' && window.location && window.location.origin && window.location.origin.startsWith('http')) {
      return window.location.origin;
    }

    return DEFAULT_API_BASE;
  }

  // ==========================================================================
  // 1. PROJECTS SYNCHRONIZATION (App -> Cloud -> Website)
  // ==========================================================================

  /**
   * Save and push projects to the cloud (Called by Desktop App)
   */
  async function pushProjectsToCloud(projectsList) {
    if (!Array.isArray(projectsList) || projectsList.length === 0) return false;

    // 1. Save locally
    try {
      localStorage.setItem(STORAGE_PROJECTS_KEY, JSON.stringify(projectsList));
      localStorage.setItem('arttouch_custom_projects', JSON.stringify(projectsList));
      if (window.ArtTouchData) window.ArtTouchData.projects = projectsList;
    } catch (e) {}

    // 2. Push to Live Vercel API
    const base = getApiBase();
    try {
      await fetch(base + '/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projects: projectsList }),
        mode: 'cors'
      });
      console.log('Projects pushed to live Vercel API successfully!');
    } catch (err) {
      console.warn('Vercel API push notice:', err);
    }

    return true;
  }

  /**
   * Fetch latest live projects from the cloud (Called by Website on load)
   */
  async function fetchLiveProjects(callback) {
    let projects = null;

    // 1. Check local cache first
    try {
      const cached = localStorage.getItem(STORAGE_PROJECTS_KEY) || localStorage.getItem('arttouch_custom_projects');
      if (cached) {
        projects = JSON.parse(cached);
      }
    } catch (e) {}

    // 2. Fetch from Live Vercel API
    const base = getApiBase();
    try {
      const res = await fetch(base + '/api/projects', { method: 'GET', mode: 'cors' });
      if (res.ok) {
        const data = await res.json();
        if (data.projects && Array.isArray(data.projects) && data.projects.length > 0) {
          projects = data.projects;
          try {
            localStorage.setItem(STORAGE_PROJECTS_KEY, JSON.stringify(projects));
            localStorage.setItem('arttouch_custom_projects', JSON.stringify(projects));
            if (window.ArtTouchData) window.ArtTouchData.projects = projects;
          } catch (e) {}
        }
      }
    } catch (err) {
      console.warn('Live projects cloud fetch note:', err);
    }

    // 3. Fallback to default bundled projects if nothing in cloud/local
    if (!projects && window.ArtTouchData && Array.isArray(window.ArtTouchData.projects)) {
      projects = window.ArtTouchData.projects;
    }

    if (typeof callback === 'function' && projects) {
      callback(projects);
    }

    return projects;
  }

  // ==========================================================================
  // 2. INQUIRIES SYNCHRONIZATION (Website -> Cloud -> Desktop App)
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

    // 2. Dispatch to Live Vercel API
    const base = getApiBase();
    try {
      await fetch(base + '/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inquiryData),
        mode: 'cors'
      });
      console.log('Inquiry dispatched to Vercel inquiries API:', base + '/api/inquiries');
    } catch (err) {
      console.warn('Inquiry dispatch note:', err);
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
    const base = getApiBase();

    try {
      const res = await fetch(base + '/api/inquiries', { method: 'GET', mode: 'cors' });
      if (res.ok) {
        const data = await res.json();
        const remoteInquiries = data.inquiries || [];

        if (Array.isArray(remoteInquiries) && remoteInquiries.length > 0) {
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
      console.warn('Inquiries sync note:', err);
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
    getApiBase: getApiBase
  };
})();

if (typeof window !== 'undefined') {
  window.ArtTouchCloudSync = ArtTouchCloudSync;
}
