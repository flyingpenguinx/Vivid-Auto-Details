import Link from "next/link";

const cards = [
  {
    title: "Exterior Detail",
    description:
      "Deep wheel cleaning, foam prewash, claybar treatment, paint sealant, tire dressing, and streak-free glass cleaning.",
    featured: false,
  },
  {
    title: "Full Detail Package",
    description: "Complete interior and exterior detailing for a full vehicle refresh.",
    featured: true,
  },
  {
    title: "Interior Detail",
    description:
      "Steam cleaning, extraction, odor elimination, leather conditioning, and trim care.",
    featured: false,
  },
  {
    title: "Ceramic Coating",
    description:
      "Long-term paint protection with gloss, hydrophobic beading, and easier maintenance.",
    featured: false,
  },
  {
    title: "Paint Correction",
    description:
      "From enhancement to multi-step correction to restore depth and clarity.",
    featured: false,
  },
  {
    title: "Paint Protection Film",
    description:
      "Invisible protection against chips and road damage with self-healing technology.",
    featured: false,
  },
];

export function ServicesSection() {
  return (
    <section className="services" id="services">
      <div className="container">
        <div className="section-header center">
          <span className="section-label reveal-text">What We Offer</span>
          <h2 className="section-title reveal-text">
            Our <em>Services</em>
          </h2>
          <p className="section-subtitle reveal-text">
            Professional detailing services tailored to your vehicle&apos;s needs
          </p>
        </div>

        <div className="services-grid">
          {cards.map((card) => (
            <div key={card.title} className={`service-card reveal-card ${card.featured ? "featured" : ""}`}>
              {card.featured ? <div className="featured-badge">Most Popular</div> : null}
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <a href="https://vividautodetails.fieldd.co/" target="_blank" className="service-link">
                Book Service →
              </a>
            </div>
          ))}
        </div>

        <div className="instagram-cta" style={{ marginTop: "2rem" }}>
          <Link href="/services" className="btn-secondary">
            <span>View All Service Details</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
