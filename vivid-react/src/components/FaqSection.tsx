"use client";

import { useMemo, useState } from "react";
import { FaqItem } from "@/data/faqs";

type Category = "all" | "services" | "booking" | "protection";

type FaqSectionProps = {
  items: FaqItem[];
};

export function FaqSection({ items }: FaqSectionProps) {
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  const filtered = useMemo(() => {
    if (activeCategory === "all") {
      return items;
    }
    return items.filter((faq) => faq.category === activeCategory);
  }, [activeCategory, items]);

  return (
    <section className="faq-page">
      <div className="container">
        <div className="faq-categories" style={{ marginBottom: "1.5rem" }}>
          <button className={`filter-btn ${activeCategory === "all" ? "active" : ""}`} onClick={() => setActiveCategory("all")}>
            All
          </button>
          <button className={`filter-btn ${activeCategory === "services" ? "active" : ""}`} onClick={() => setActiveCategory("services")}>
            Services
          </button>
          <button className={`filter-btn ${activeCategory === "booking" ? "active" : ""}`} onClick={() => setActiveCategory("booking")}>
            Booking
          </button>
          <button className={`filter-btn ${activeCategory === "protection" ? "active" : ""}`} onClick={() => setActiveCategory("protection")}>
            Protection
          </button>
        </div>

        <div className="faq-section">
          {filtered.map((faq) => (
            <details className="faq-item" key={faq.id}>
              <summary className="faq-question">{faq.question}</summary>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
