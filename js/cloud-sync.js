/**
 * ============================================================================
 * ART TOUCH WOODWORKS — UNIVERSAL CLOUD INQUIRY SYNC ENGINE
 * Connects Vercel, GitHub Pages, and Desktop App in Real-Time
 * ============================================================================
 */

const ArtTouchCloudSync = (function() {
  'use strict';

  const LOCAL_STORAGE_KEY = 'arttouch_inquiries';
  const API_URL_KEY = 'arttouch_api_url';

  /**
   * Get the active backend API endpoint URL
   */
  function getApiEndpoint() {
    try {
      const customUrl = localStorage.getItem(API_URL_KEY);
      if (customUrl && customUrl.startsWith('http')) {
        return customUrl.replace(/\/+$/, '') + '/api/inquiries';
      }
    } catch (e) {}

    // If running on a live web host (Vercel / Netlify / Node), use relative endpoint
    if (typeof window !== 'undefined' && window.location && window.location.protocol.startsWith('http')) {
      return '/api/inquiries';
    }

    return null;
  }

  /**
   * Save a new inquiry (Dispatched from Contact Form or Quote Wizard)
   */
  async function sendInquiry(inquiryData) {
    if (!inquiryData.id) inquiryData.id = 'inq-' + Date.now();
    if (!inquiryData.timestamp) inquiryData.timestamp = new Date().toISOString();
    if (!inquiryData.status) inquiryData.status = 'new';

    // 1. Instant Local Storage Save
    const localList = getLocalInquiries();
    const exists = localList.some(item => item.id === inquiryData.id);
    if (!exists) {
      localList.unshift(inquiryData);
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(localList));
      } catch (e) {}
    }

    // 2. Dispatch to Active Serverless API (e.g. Vercel)
    const endpoint = getApiEndpoint();
    if (endpoint) {
      try {
        await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(inquiryData),
          mode: 'cors'
        });
        console.log('Inquiry dispatched to serverless API:', endpoint);
      } catch (err) {
        console.warn('Serverless API dispatch fallback:', err);
      }
    }

    return true;
  }

  /**
   * Get all local inquiries from browser storage
   */
  function getLocalInquiries() {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  }

  /**
   * Fetch and synchronize cloud inquiries into the Desktop App
   */
  async function syncInquiries(callback) {
    let list = getLocalInquiries();

    const endpoint = getApiEndpoint();
    if (endpoint) {
      try {
        const response = await fetch(endpoint, { method: 'GET', mode: 'cors' });
        if (response.ok) {
          const data = await response.json();
          const remoteInquiries = data.inquiries || [];

          if (Array.isArray(remoteInquiries) && remoteInquiries.length > 0) {
            // Merge without duplicates
            const existingIds = new Set(list.map(i => i.id));
            remoteInquiries.forEach(remoteItem => {
              if (!existingIds.has(remoteItem.id)) {
                list.unshift(remoteItem);
                existingIds.add(remoteItem.id);
              }
            });

            try {
              localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
            } catch (e) {}
          }
        }
      } catch (err) {
        console.warn('Cloud sync fetch note:', err);
      }
    }

    if (typeof callback === 'function') {
      callback(list);
    }

    return list;
  }

  return {
    sendInquiry: sendInquiry,
    getLocalInquiries: getLocalInquiries,
    syncInquiries: syncInquiries,
    getApiEndpoint: getApiEndpoint
  };
})();

if (typeof window !== 'undefined') {
  window.ArtTouchCloudSync = ArtTouchCloudSync;
}
