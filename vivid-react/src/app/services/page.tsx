import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { SitePage } from "@/components/SitePage";
import { services } from "@/data/services";

export default function ServicesPage() {
  return (
    <SitePage>
      <PageHero
        imageSrc="/images/hero.jpg"
        imageAlt="Auto Detailing Services"
        label="Premium Auto Care"
        title="Our"
        emphasized="Services"
        subtitle="Professional detailing services tailored to your vehicle's needs."
        className="services-hero"
      />

      <section className="services-detail-section">
        <div className="container">
          {services.map((service) => (
            <article className="service-detail-card" id={service.id} key={service.id}>
              <div className="service-detail-content">
                <div className="service-detail-header">
                  <div>
                    <h2>{service.title}</h2>
                    <p className="service-tagline">{service.tagline}</p>
                  </div>
                </div>

                <p className="service-detail-intro">{service.description}</p>

                <div className="service-detail-features">
                  <h4>What&apos;s Included:</h4>
                  <ul>
                    {service.bullets.map((bullet) => (
                      <li key={bullet}>
                        <span className="check-icon">✓</span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="service-detail-cta">
                  <a href="https://vividautodetails.fieldd.co/" target="_blank" className="btn-primary">
                    <span>Book {service.title}</span>
                  </a>
                  <Link href="/#contact" className="btn-secondary">
                    <span>Request Quote</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </SitePage>
  );
}
