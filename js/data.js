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
    "id": "qaia-government-services-center",
    "category": "Government Projects",
    "title": "QAIA Government Services Center",
    "location": "Amman - QAIA Airport",
    "dateCompleted": "2023",
    "area": "200 sqm",
    "coverImage": "images/projects/government-projects/qaia-government-services-center/01.png",
    "description": "Custom architectural woodwork and joinery for the QAIA Government Services Center at Queen Alia International Airport.",
    "gallery": [
      "images/projects/government-projects/qaia-government-services-center/01.png"
    ]
  },
  {
    "id": "water-awareness-center",
    "category": "Government Projects",
    "title": "Water Awareness Center",
    "location": "Amman, Jordan",
    "dateCompleted": "",
    "area": "",
    "coverImage": "",
    "description": "Architectural woodwork and interior fabrication for the Water Awareness Center.",
    "gallery": []
  },
  {
    "id": "embassy-of-qatar",
    "category": "Embassies",
    "title": "Embassy of Qatar",
    "location": "Amman, Jordan",
    "dateCompleted": "",
    "area": "",
    "coverImage": "",
    "description": "Custom diplomatic woodwork and joinery for the Embassy of Qatar.",
    "gallery": []
  },
  {
    "id": "embassy-of-ireland",
    "category": "Embassies",
    "title": "Embassy of Ireland",
    "location": "Amman, Jordan",
    "dateCompleted": "",
    "area": "",
    "coverImage": "",
    "description": "Custom diplomatic woodwork and joinery for the Embassy of Ireland.",
    "gallery": []
  },
  {
    "id": "rajha-villa",
    "category": "Residential",
    "title": "Rajha Villa",
    "location": "Amman, Jordan",
    "dateCompleted": "",
    "area": "",
    "coverImage": "",
    "description": "Bespoke residential joinery, custom kitchens, and luxury furniture for Rajha Villa.",
    "gallery": []
  },
  {
    "id": "al-hasan-villa",
    "category": "Residential",
    "title": "Al Hasan Villa",
    "location": "Amman, Jordan",
    "dateCompleted": "",
    "area": "",
    "coverImage": "",
    "description": "Custom luxury woodwork, architectural paneling, and interior fit-out for Al Hasan Villa.",
    "gallery": []
  },
  {
    "id": "pwc",
    "category": "Commercial",
    "title": "PwC",
    "location": "Amman, Jordan",
    "dateCompleted": "",
    "area": "",
    "coverImage": "",
    "description": "Corporate interior joinery and executive architectural woodwork for PwC.",
    "gallery": []
  },
  {
    "id": "specialized-leasing-company",
    "category": "Commercial",
    "title": "Specialized Leasing Company",
    "location": "Amman, Jordan",
    "dateCompleted": "",
    "area": "",
    "coverImage": "",
    "description": "Commercial office fit-out and custom counters for Specialized Leasing Company (Housing Bank Group).",
    "gallery": []
  },
  {
    "id": "yousef-afandi",
    "category": "Commercial",
    "title": "Yousef Afandi",
    "location": "Amman, Jordan",
    "dateCompleted": "",
    "area": "",
    "coverImage": "",
    "description": "Commercial woodwork and bespoke interior fabrication for Yousef Afandi.",
    "gallery": []
  },
  {
    "id": "safwa-islamic-bank",
    "category": "Banks",
    "title": "Safwa Islamic Bank",
    "location": "Amman, Jordan",
    "dateCompleted": "",
    "area": "",
    "coverImage": "",
    "description": "Branch joinery, teller counters, and custom bank woodwork for Safwa Islamic Bank.",
    "gallery": []
  },
  {
    "id": "jordan-kuwait-bank",
    "category": "Banks",
    "title": "Jordan Kuwait Bank",
    "location": "Amman, Jordan",
    "dateCompleted": "",
    "area": "",
    "coverImage": "",
    "description": "Bank branch architectural woodwork and interior fit-out for Jordan Kuwait Bank.",
    "gallery": []
  },
  {
    "id": "bank-al-etihad",
    "category": "Banks",
    "title": "Bank al Etihad",
    "location": "Amman, Jordan",
    "dateCompleted": "",
    "area": "",
    "coverImage": "",
    "description": "Architectural woodwork and branch joinery for Bank al Etihad.",
    "gallery": []
  },
  {
    "id": "invest-bank",
    "category": "Banks",
    "title": "Invest Bank",
    "location": "Amman, Jordan",
    "dateCompleted": "",
    "area": "",
    "coverImage": "",
    "description": "Custom banking counters, wall cladding, and branch joinery for Invest Bank (INVESTBANK).",
    "gallery": []
  },
  {
    "id": "jordan-islamic-bank",
    "category": "Banks",
    "title": "Jordan Islamic Bank",
    "location": "Amman, Jordan",
    "dateCompleted": "",
    "area": "",
    "coverImage": "",
    "description": "Branch joinery, counters, and architectural woodwork for Jordan Islamic Bank.",
    "gallery": []
  },
  {
    "id": "dddddd",
    "category": "Banks",
    "title": "dddddd",
    "location": "",
    "dateCompleted": "",
    "area": "",
    "coverImage": "",
    "description": "",
    "gallery": []
  }
],

  // 2. Centralized Business Configuration
  businessHours: {
    location: "Nadhmi Abdul Hadi St., Amman, Jordan",
    country: "Jordan",
    timezone: "Asia/Amman",
    days: "Sunday - Thursday",
    open: "09:00",
    close: "18:00",
    weekendDays: [5, 6],
    phone: "+962 (6) 222 3 707",
    phoneClean: "+96262223707",
    emails: {
      general: "info@arttouchjo.com",
      generalManager: "m.shaheen@arttouchjo.com",
      ceoPlantManager: "m.maghari@arttouchjo.com"
    }
  },

  // 3. Helper Functions
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
