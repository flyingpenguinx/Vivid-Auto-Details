import Script from "next/script";

export function InstagramSection() {
  return (
    <section className="gallery" id="gallery">
      <div className="container">
        <div className="section-header center">
          <span className="section-label reveal-text">Follow Us</span>
          <h2 className="section-title reveal-text">
            Latest from <em>Instagram</em>
          </h2>
          <p className="section-subtitle reveal-text">
            See what we&apos;ve been up to{" "}
            <a href="https://www.instagram.com/vivid.autodetails/" target="_blank" className="instagram-link">
              @vivid.autodetails
            </a>
          </p>
        </div>

        <div className="instagram-feed reveal-card" id="instagram-feed">
          <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />
          <div className="elfsight-app-082bba7c-1881-438b-a99b-cb99b0745642" data-elfsight-app-lazy></div>
        </div>

        <div className="instagram-cta">
          <a href="https://www.instagram.com/vivid.autodetails/" target="_blank" className="btn-secondary">
            <span>Follow Us on Instagram</span>
          </a>
        </div>
      </div>
    </section>
  );
}
