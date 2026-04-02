export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  heroImage: string;
  content: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "ceramic-vs-ppf",
    title: "Ceramic Coating vs PPF: Which One Is Right for You?",
    excerpt:
      "A practical comparison of ceramic coating and paint protection film for Elk Grove and Sacramento drivers.",
    category: "Protection",
    date: "Feb 2026",
    readTime: "6 min read",
    heroImage: "/images/hero.jpg",
    content: [
      "Ceramic coating improves gloss and makes maintenance easier. It protects against UV and light chemical exposure.",
      "PPF is stronger for impact protection and road debris. It's ideal for high-risk panels or full-body coverage.",
      "Many owners combine both: PPF in impact zones, ceramic coating on top for easier cleaning and added shine.",
    ],
  },
  {
    slug: "ceramic-maintenance",
    title: "How to Maintain Ceramic Coating for Maximum Lifespan",
    excerpt:
      "Simple maintenance rules to keep your coating performing at a high level for years.",
    category: "Maintenance",
    date: "Feb 2026",
    readTime: "5 min read",
    heroImage: "/images/24.jpg",
    content: [
      "Use pH-neutral shampoo and soft wash media to protect the coating layer.",
      "Avoid automatic brush car washes that can induce marring.",
      "Schedule periodic decontamination and topper maintenance to preserve hydrophobic performance.",
    ],
  },
  {
    slug: "sacramento-car-damage",
    title: "Top Causes of Paint Damage in Sacramento (and How to Prevent Them)",
    excerpt:
      "Understand regional paint risks and practical ways to reduce long-term damage.",
    category: "Local Care",
    date: "Feb 2026",
    readTime: "4 min read",
    heroImage: "/images/19.jpg",
    content: [
      "Strong sun exposure accelerates oxidation and clear coat wear.",
      "Freeway debris and daily commuting can cause chips and micro-abrasions.",
      "Regular protection, proper washing, and early correction reduce compounding damage over time.",
    ],
  },
];
