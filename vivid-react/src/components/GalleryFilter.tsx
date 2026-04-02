"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type GalleryItem = {
  src: string;
  category: "detail" | "ceramic" | "ppf" | "tint";
};

const items: GalleryItem[] = [
  { src: "1.jpg", category: "detail" },
  { src: "4.jpg", category: "detail" },
  { src: "8.jpg", category: "ceramic" },
  { src: "11.jpg", category: "ceramic" },
  { src: "14.jpg", category: "ppf" },
  { src: "18.jpg", category: "ppf" },
  { src: "21.jpg", category: "tint" },
  { src: "24.jpg", category: "tint" },
  { src: "28.jpg", category: "detail" },
  { src: "31.jpg", category: "ceramic" },
];

const filters = [
  { label: "All", value: "all" },
  { label: "Detail", value: "detail" },
  { label: "Ceramic", value: "ceramic" },
  { label: "PPF", value: "ppf" },
  { label: "Tint", value: "tint" },
] as const;

export function GalleryFilter() {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]["value"]>("all");

  const filteredItems = useMemo(() => {
    if (activeFilter === "all") {
      return items;
    }
    return items.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  return (
    <>
      <div className="gallery-filters">
        {filters.map((filter) => (
          <button
            key={filter.value}
            className={`filter-btn ${activeFilter === filter.value ? "active" : ""}`}
            onClick={() => setActiveFilter(filter.value)}
            type="button"
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="gallery-full-grid">
        {filteredItems.map((item) => (
          <div className="gallery-full-item" data-category={item.category} key={`${item.category}-${item.src}`}>
            <Image src={`/images/${item.src}`} alt="Vivid detail result" width={900} height={700} />
          </div>
        ))}
      </div>
    </>
  );
}
