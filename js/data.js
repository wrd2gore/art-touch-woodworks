/**
 * ============================================================================
 * ART TOUCH FOR WOOD WORKS — AMMAN, JORDAN
 * Centralized Project Database & Independent Gallery Collections
 * Auto-Generated from Art Touch Admin Control Center
 * ============================================================================
 */

const ArtTouchData = {
  // 1. Projects Database with Dedicated Independent Galleries
  projects: [
  {
    "id": "dddddd",
    "category": "Commercial",
    "title": "dddddd",
    "location": "Amman, Jordan",
    "dateCompleted": "2026",
    "area": "",
    "coverImage": "",
    "description": "",
    "gallery": []
  }
],

  // 2. Official Core Services
  services: [],

  // 3. Official Frequently Asked Questions
  faqs: [],

  // 4. Centralized Business Configuration
  businessHours: {},

  // 5. Helper Functions
  getAllCategories: function() {
    return Array.from(new Set(this.projects.map(p => p.category))).filter(Boolean);
  },

  getProjectsByCategory: function(category) {
    if (!category || category === 'all') return this.projects;
    const catNorm = category.toLowerCase().replace(/\s+/g, '-');
    return this.projects.filter(p => p.category.toLowerCase().replace(/\s+/g, '-') === catNorm);
  },

  getProjectById: function(id) {
    if (!id) return null;
    return this.projects.find(p => p.id === id) || null;
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = ArtTouchData;
}
