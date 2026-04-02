export type ServiceItem = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  bullets: string[];
};

export const services: ServiceItem[] = [
  {
    id: "exterior",
    title: "Exterior Detail",
    tagline: "Restore your vehicle's showroom shine",
    description:
      "Our exterior detailing service brings back the showroom shine to your vehicle's exterior with meticulous attention to every surface.",
    bullets: [
      "Deep wheel cleaning & tire dressing",
      "Foam prewash & hand wash",
      "Claybar treatment",
      "Paint sealant application",
      "Streak-free glass cleaning",
    ],
  },
  {
    id: "interior",
    title: "Interior Detail",
    tagline: "Experience that new car feel again",
    description:
      "Transform your vehicle's interior into a fresh, sanitized space with steam cleaning and extraction.",
    bullets: [
      "Steam cleaning & sanitization",
      "Carpet & upholstery extraction",
      "Odor elimination",
      "Leather conditioning",
      "Dashboard & trim cleaning",
    ],
  },
  {
    id: "full-detail",
    title: "Full Detail Package",
    tagline: "The complete transformation",
    description:
      "Our signature service combines interior and exterior detailing for a full vehicle refresh.",
    bullets: [
      "Complete exterior detail",
      "Complete interior detail",
      "Engine bay cleaning (upon request)",
      "Premium paint sealant",
      "Fabric/leather protectant",
    ],
  },
  {
    id: "ceramic",
    title: "Ceramic Coating",
    tagline: "Ultimate long-term protection",
    description:
      "Ceramic coating creates a durable protective layer for gloss, hydrophobicity, and easier maintenance.",
    bullets: [
      "Hydrophobic protection",
      "UV and oxidation resistance",
      "Chemical stain resistance",
      "Enhanced gloss and depth",
      "2-8 year durability",
    ],
  },
  {
    id: "ppf",
    title: "Paint Protection Film (PPF)",
    tagline: "Invisible armor for your paint",
    description:
      "Protect your paint from chips and road debris with high-clarity, self-healing film.",
    bullets: [
      "Self-healing technology",
      "Rock chip defense",
      "UV and stain protection",
      "Coverage options from partial to full body",
      "Long-term film warranty options",
    ],
  },
  {
    id: "tint",
    title: "Window Tint",
    tagline: "Style meets protection",
    description:
      "Professional tinting for heat reduction, UV protection, glare reduction, and privacy.",
    bullets: [
      "Heat reduction",
      "Blocks 99% UV rays",
      "Increased privacy",
      "Cleaner look",
      "Interior fade protection",
    ],
  },
];
