/**
 * Art Touch for Wood Works — Master Data Source
 * Generated via Art Touch Control Center
 * BUILD_ID:build-at-mt064xhx-n63k
 */
window.ArtTouchData = {
  "version": "2026.08.19",
  "buildId": "build-at-mt064xhx-n63k",
  "publishedAt": "2026-08-19T14:10:05.590Z",
  "totalProjects": 0,
  "totalServices": 0,
  "totalFaqs": 0,
  "projects": [],
  "services": [],
  "faqs": [],
  "company": {}
,

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
  module.exports = window.ArtTouchData;
}
