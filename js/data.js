/**
 * ============================================================================
 * ART TOUCH FOR WOOD WORKS — AMMAN, JORDAN
 * Dynamic Project Management & Independent Gallery Engine
 * ============================================================================
 * 
 * HOW TO MANUALLY EDIT PROJECTS & GALLERIES:
 * ----------------------------------------------------------------------------
 * 1. To add photos to any project, put the image files inside that project's
 *    folder (e.g. images/projects/government-projects/qaia-government-services-center/)
 *    and add the file path into the `gallery` array below.
 * 
 * 2. To change metadata (Location, Date Completed, Area), edit the fields directly
 *    in the project object (e.g. location, dateCompleted, area).
 * 
 * 3. The project details page automatically displays the information block:
 *      Location: [location]
 *      Date Completed: [dateCompleted]
 *      Area: [area]
 *    under the gallery slider.
 * ============================================================================
 */

const ArtTouchData = {
  // 1. Projects Database with Dedicated Independent Galleries
  projects: [
    // ------------------------------------------------------------------------
    // GOVERNMENT PROJECTS
    // ------------------------------------------------------------------------
    {
      id: "qaia-government-services-center",
      category: "Government Projects",
      title: "QAIA Government Services Center",
      location: "Amman - QAIA Airport",
      dateCompleted: "2023",
      area: "200 sqm",
      coverImage: "images/projects/government-projects/qaia-government-services-center/01.png",
      description: "Custom architectural woodwork and joinery for the QAIA Government Services Center at Queen Alia International Airport.",
      // Independent Gallery for QAIA Government Services Center:
      gallery: [
        "images/projects/government-projects/qaia-government-services-center/01.png"
      ]
    },
    {
      id: "water-awareness-center",
      category: "Government Projects",
      title: "Water Awareness Center",
      location: "Amman, Jordan",
      dateCompleted: "",
      area: "",
      coverImage: "",
      description: "Architectural woodwork and interior fabrication for the Water Awareness Center.",
      // Independent Gallery for Water Awareness Center:
      gallery: []
    },

    // ------------------------------------------------------------------------
    // EMBASSIES
    // ------------------------------------------------------------------------
    {
      id: "embassy-of-qatar",
      category: "Embassies",
      title: "Embassy of Qatar",
      location: "Amman, Jordan",
      dateCompleted: "",
      area: "",
      coverImage: "",
      description: "Custom diplomatic woodwork and joinery for the Embassy of Qatar.",
      // Independent Gallery for Embassy of Qatar:
      gallery: []
    },
    {
      id: "embassy-of-ireland",
      category: "Embassies",
      title: "Embassy of Ireland",
      location: "Amman, Jordan",
      dateCompleted: "",
      area: "",
      coverImage: "",
      description: "Custom diplomatic woodwork and joinery for the Embassy of Ireland.",
      // Independent Gallery for Embassy of Ireland:
      gallery: []
    },

    // ------------------------------------------------------------------------
    // RESIDENTIAL PROJECTS
    // ------------------------------------------------------------------------
    {
      id: "rajha-villa",
      category: "Residential",
      title: "Rajha Villa",
      location: "Amman, Jordan",
      dateCompleted: "",
      area: "",
      coverImage: "",
      description: "Bespoke residential joinery, custom kitchens, and luxury furniture for Rajha Villa.",
      // Independent Gallery for Rajha Villa:
      gallery: []
    },
    {
      id: "al-hasan-villa",
      category: "Residential",
      title: "Al Hasan Villa",
      location: "Amman, Jordan",
      dateCompleted: "",
      area: "",
      coverImage: "",
      description: "Custom luxury woodwork, architectural paneling, and interior fit-out for Al Hasan Villa.",
      // Independent Gallery for Al Hasan Villa:
      gallery: []
    },

    // ------------------------------------------------------------------------
    // COMMERCIAL PROJECTS
    // ------------------------------------------------------------------------
    {
      id: "pwc",
      category: "Commercial",
      title: "PwC",
      location: "Amman, Jordan",
      dateCompleted: "",
      area: "",
      coverImage: "",
      description: "Corporate interior joinery and executive architectural woodwork for PwC.",
      // Independent Gallery for PwC:
      gallery: []
    },
    {
      id: "specialized-leasing-company",
      category: "Commercial",
      title: "Specialized Leasing Company",
      location: "Amman, Jordan",
      dateCompleted: "",
      area: "",
      coverImage: "",
      description: "Commercial office fit-out and custom counters for Specialized Leasing Company (Housing Bank Group).",
      // Independent Gallery for Specialized Leasing Company:
      gallery: []
    },
    {
      id: "yousef-afandi",
      category: "Commercial",
      title: "Yousef Afandi",
      location: "Amman, Jordan",
      dateCompleted: "",
      area: "",
      coverImage: "",
      description: "Commercial woodwork and bespoke interior fabrication for Yousef Afandi.",
      // Independent Gallery for Yousef Afandi:
      gallery: []
    },

    // ------------------------------------------------------------------------
    // BANKS
    // ------------------------------------------------------------------------
    {
      id: "safwa-islamic-bank",
      category: "Banks",
      title: "Safwa Islamic Bank",
      location: "Amman, Jordan",
      dateCompleted: "",
      area: "",
      coverImage: "",
      description: "Branch joinery, teller counters, and custom bank woodwork for Safwa Islamic Bank.",
      // Independent Gallery for Safwa Islamic Bank:
      gallery: []
    },
    {
      id: "jordan-kuwait-bank",
      category: "Banks",
      title: "Jordan Kuwait Bank",
      location: "Amman, Jordan",
      dateCompleted: "",
      area: "",
      coverImage: "",
      description: "Bank branch architectural woodwork and interior fit-out for Jordan Kuwait Bank.",
      // Independent Gallery for Jordan Kuwait Bank:
      gallery: []
    },
    {
      id: "bank-al-etihad",
      category: "Banks",
      title: "Bank al Etihad",
      location: "Amman, Jordan",
      dateCompleted: "",
      area: "",
      coverImage: "",
      description: "Architectural woodwork and branch joinery for Bank al Etihad.",
      // Independent Gallery for Bank al Etihad:
      gallery: []
    },
    {
      id: "invest-bank",
      category: "Banks",
      title: "Invest Bank",
      location: "Amman, Jordan",
      dateCompleted: "",
      area: "",
      coverImage: "",
      description: "Custom banking counters, wall cladding, and branch joinery for Invest Bank (INVESTBANK).",
      // Independent Gallery for Invest Bank:
      gallery: []
    },
    {
      id: "jordan-islamic-bank",
      category: "Banks",
      title: "Jordan Islamic Bank",
      location: "Amman, Jordan",
      dateCompleted: "",
      area: "",
      coverImage: "",
      description: "Branch joinery, counters, and architectural woodwork for Jordan Islamic Bank.",
      // Independent Gallery for Jordan Islamic Bank:
      gallery: []
    }
  ],

  // 2. Dynamic Helper Methods for Project & Category Management
  getAllCategories: function() {
    const defaultCategories = ["Banks", "Commercial", "Residential", "Embassies", "Government Projects"];
    const foundCategories = new Set(defaultCategories);
    this.projects.forEach(p => {
      if (p.category && typeof p.category === 'string') {
        foundCategories.add(p.category.trim());
      }
    });
    return Array.from(foundCategories);
  },

  getProjectById: function(projectId) {
    if (!projectId) return null;
    const cleanId = String(projectId).trim().toLowerCase();
    return this.projects.find(p => p.id.toLowerCase() === cleanId) || null;
  },

  getProjectsByCategory: function(category) {
    if (!category || category.toLowerCase() === 'all') return this.projects;
    const cleanCat = String(category).trim().toLowerCase();
    return this.projects.filter(p => (p.category && p.category.toLowerCase() === cleanCat));
  },

  /**
   * Convention handler: Adds or updates project galleries from category\project format
   * Case-insensitive matching ensures "banks\bank al etihad" matches "Bank al Etihad"
   */
  addOrUpdateProject: function(categoryName, projectTitle, images = [], meta = {}) {
    if (!categoryName || !projectTitle) return null;

    const trimmedTitle = projectTitle.trim();
    const trimmedCat = categoryName.trim();
    const normalizedTitle = trimmedTitle.toLowerCase();

    // Check if project exists case-insensitively
    let existingProject = this.projects.find(p => p.title.toLowerCase() === normalizedTitle);

    if (existingProject) {
      existingProject.category = trimmedCat;
      // Append images to existing gallery without duplicates
      images.forEach(img => {
        if (img && !existingProject.gallery.includes(img)) {
          existingProject.gallery.push(img);
        }
      });
      if (meta.location) existingProject.location = meta.location;
      if (meta.dateCompleted) existingProject.dateCompleted = meta.dateCompleted;
      if (meta.area) existingProject.area = meta.area;
      if (meta.description) existingProject.description = meta.description;

      if (!existingProject.coverImage && existingProject.gallery.length > 0) {
        existingProject.coverImage = existingProject.gallery[0];
      }
      return existingProject;
    } else {
      // Create new project
      const slug = trimmedTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const newProject = {
        id: slug || `project-${Date.now()}`,
        category: trimmedCat,
        title: trimmedTitle,
        location: meta.location || "Amman, Jordan",
        dateCompleted: meta.dateCompleted || meta.year || "",
        area: meta.area || "",
        coverImage: images.length > 0 ? images[0] : (meta.coverImage || ""),
        description: meta.description || "",
        gallery: [...images]
      };
      this.projects.push(newProject);
      return newProject;
    }
  },

  // 3. Core Joinery Services
  services: [
    {
      id: "custom-woodwork",
      title: "Custom Woodwork & Joinery",
      icon: "fa-solid fa-hammer",
      shortDesc: "Bespoke carpentry and millwork tailored to architectural drawings.",
      fullDesc: "Bespoke carpentry and millwork tailored to precise architectural drawings and custom client dimensions in Amman, Jordan.",
      features: ["Architectural Millwork", "Solid Wood & Veneers", "Precision Joinery", "Factory Pre-Assembly"]
    },
    {
      id: "custom-furniture",
      title: "Custom Luxury Furniture",
      icon: "fa-solid fa-couch",
      shortDesc: "Handcrafted dining tables, executive desks, consoles, and bedroom suites.",
      fullDesc: "Engineered for durability with kiln-dried hardwoods, bookmatched grain matching, and custom metal details.",
      features: ["Solid Slab Tables", "Executive Desks", "Dressing Rooms", "Custom Consoles"]
    },
    {
      id: "architectural-woodwork",
      title: "Architectural Woodwork",
      icon: "fa-solid fa-compass-drafting",
      shortDesc: "Large-scale timber features, acoustic baffles, ceiling beams, and column covers.",
      fullDesc: "Monumental timber features, acoustic baffles, ceiling beams, fluted column covers, and atrium walls.",
      features: ["Acoustic Timber Louvers", "Ceiling Systems", "Curved Columns", "Atrium Paneling"]
    },
    {
      id: "kitchens-pantries",
      title: "High-End Kitchens & Pantries",
      icon: "fa-solid fa-utensils",
      shortDesc: "Bespoke cabinetry with moisture-resistant substrates and European hardware.",
      fullDesc: "Bespoke cabinetry with moisture-resistant substrates, soft-close hardware, and integrated storage solutions.",
      features: ["Full Island Joinery", "Handleless J-Pull", "Integrated Appliances", "Bespoke Pantries"]
    },
    {
      id: "doors-frames",
      title: "Custom Doors & Frames",
      icon: "fa-solid fa-door-open",
      shortDesc: "Oversized pivot doors, concealed frameless doors, and sliding partitions.",
      fullDesc: "Engineered internal steel subframes, acoustic seals, and custom architectural ironmongery.",
      features: ["Pivot Doors", "Flush Frames", "Acoustic Rated", "Custom Ironmongery"]
    },
    {
      id: "wall-ceiling-cladding",
      title: "Wall & Ceiling Cladding",
      icon: "fa-solid fa-layer-group",
      shortDesc: "Wood veneer panels, fluted slats, and geometric wall features.",
      fullDesc: "Veneer panels, fluted slats, acoustic grooved timber, and geometric wall paneling.",
      features: ["Veneer Paneling", "3D Slatted Panels", "Concealed Secret Doors", "Fire-Retardant Finishes"]
    }
  ],

  // 4. Client FAQs
  faqs: [
    {
      q: "What types of woodwork and joinery projects does Art Touch handle?",
      a: "Art Touch specializes in custom woodwork, architectural wall and ceiling paneling, bespoke furniture, high-end kitchens, oversized pivot doors, acoustic timber baffles, and commercial fit-outs across Amman and the region."
    },
    {
      q: "Can you manufacture from our architect’s or interior designer’s drawings?",
      a: "Yes. Our team works directly with CAD/BIM shop drawings, conducting site surveys and producing detailed 1:1 joinery shop drawings for client approval before fabrication."
    },
    {
      q: "What are Art Touch's working hours and workshop location?",
      a: "Art Touch is located in Amman, Jordan. Our working hours are Sunday through Thursday, 9:00 AM to 6:00 PM (Jordan local time). Friday and Saturday are closed."
    }
  ]
};

// Store pristine default projects snapshot for reset / restoration
ArtTouchData.defaultProjects = JSON.parse(JSON.stringify(ArtTouchData.projects));

// Dynamic Custom Projects Sync from local/cloud store
try {
  if (typeof localStorage !== 'undefined') {
    const customProjects = localStorage.getItem('arttouch_projects') || localStorage.getItem('arttouch_custom_projects');
    if (customProjects) {
      const parsed = JSON.parse(customProjects);
      if (Array.isArray(parsed) && parsed.length > 0) {
        ArtTouchData.projects = parsed;
      }
    }
  }
} catch (e) {}

// Export to window
if (typeof window !== 'undefined') {
  window.ArtTouchData = ArtTouchData;
}
