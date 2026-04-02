export type FaqItem = {
  id: string;
  category: "services" | "booking" | "protection";
  question: string;
  answer: string;
};

export const faqs: FaqItem[] = [
  {
    id: "full-detail-time",
    category: "services",
    question: "How long does a full detail take?",
    answer:
      "Most full details take 4-7 hours depending on vehicle size and condition. We'll confirm timing when booking.",
  },
  {
    id: "mobile-available",
    category: "services",
    question: "Do you offer mobile detailing?",
    answer:
      "Yes. We offer both in-shop and mobile services throughout Elk Grove and the Greater Sacramento area.",
  },
  {
    id: "ceramic-lifespan",
    category: "protection",
    question: "How long does ceramic coating last?",
    answer:
      "Depending on the package and maintenance, ceramic coating can last from 2 to 8 years.",
  },
  {
    id: "booking-online",
    category: "booking",
    question: "Can I book online?",
    answer:
      "Yes. You can use our booking link for immediate scheduling or submit a quote request for custom work.",
  },
  {
    id: "ppf-and-tint",
    category: "protection",
    question: "Do you provide PPF and tint?",
    answer:
      "Yes. We provide paint protection film and window tint services with multiple coverage and film options.",
  },
];
