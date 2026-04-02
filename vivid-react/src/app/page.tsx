import Image from "next/image";
import { InstagramSection } from "@/components/InstagramSection";
import { QuoteForm } from "@/components/QuoteForm";
import { ReviewsSection } from "@/components/ReviewsSection";
import { ServicesSection } from "@/components/ServicesSection";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main>
        <section className="hero" id="home">
          <div className="hero-media">
            <video className="hero-video hero-video-desktop" autoPlay muted loop playsInline preload="auto" poster="/images/hero.jpg">
              <source src="/images/hero-video.mp4" type="video/mp4" />
            </video>
            <video className="hero-video hero-video-mobile" autoPlay muted loop playsInline preload="metadata" poster="/images/hero-mobile.jpg">
              <source src="/images/hero-video mobile.mp4" type="video/mp4" />
            </video>
            <Image src="/images/hero.jpg" alt="Premium Auto Detailing" className="hero-img hero-img-desktop" fill priority />
            <Image src="/images/hero-mobile.jpg" alt="Premium Auto Detailing" className="hero-img hero-img-mobile" fill priority />
            <div className="hero-overlay"></div>
          </div>
          <div className="hero-container">
            <div className="hero-content">
              <span className="hero-label">Premium Detailing Service</span>
              <h1 className="hero-title">
                <span className="title-line">Your ride.</span>
                <span className="title-line">Make it <em>shine.</em></span>
              </h1>
              <p className="hero-text">
                Welcome to Vivid Auto Details, your one-stop shop for premium car care in Elk Grove, CA. In-shop and mobile services across Greater Sacramento.
              </p>
              <div className="hero-actions">
                <a href="https://vividautodetails.fieldd.co/" target="_blank" className="btn-primary">
                  <span>Book Now</span>
                </a>
                <a href="#contact" className="btn-text">Get a Quote</a>
              </div>
            </div>
          </div>
        </section>

        <ServicesSection />

        <section className="about" id="about">
          <div className="container">
            <div className="about-layout">
              <div className="about-left">
                <span className="section-label">About Us</span>
                <h2 className="section-title">Why Choose <em>Vivid?</em></h2>
                <p className="about-lead">
                  Founded in 2020 by Erik Pham, Vivid Auto Details grew from passion into a full professional shop focused on trust, quality, and relationships.
                </p>
              </div>
              <div className="about-right">
                <div className="about-image">
                  <Image src="/images/Vivid Van.jpg" alt="Vivid Auto Details Van" width={800} height={600} />
                  <div className="image-frame"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InstagramSection />
        <ReviewsSection />

        <section className="contact" id="contact">
          <div className="container">
            <div className="contact-header">
              <span className="section-label">Get In Touch</span>
              <h2 className="section-title">Ready to <em>Transform</em> Your Vehicle?</h2>
              <p className="contact-intro">Book online or request a custom quote.</p>
            </div>

            <div className="contact-grid">
              <div className="contact-info">
                <div className="contact-card">
                  <h3>Contact Information</h3>
                  <div className="contact-details">
                    <a href="tel:+19165838532" className="detail-item">
                      <div className="detail-text">
                        <span className="detail-label">Phone</span>
                        <span className="detail-value">(916) 583-8532</span>
                      </div>
                    </a>
                    <a href="mailto:vividautodetailsca@gmail.com" className="detail-item">
                      <div className="detail-text">
                        <span className="detail-label">Email</span>
                        <span className="detail-value">vividautodetailsca@gmail.com</span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              <div className="contact-form-wrap">
                <h3>Request a Quote</h3>
                <p>Fill out the form below and we&apos;ll get back to you within 24 hours.</p>
                <QuoteForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
