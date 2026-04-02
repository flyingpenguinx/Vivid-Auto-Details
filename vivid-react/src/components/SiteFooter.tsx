import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link href="#home" className="footer-logo">
              <Image src="/images/logo.jpg" alt="Vivid" width={40} height={40} />
              <span>VIVID</span>
            </Link>
            <p>Premium auto detailing in Elk Grove, CA. In-shop and mobile services for the Greater Sacramento area.</p>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/#about">About</Link></li>
              <li><Link href="/gallery">Gallery</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/faqs">FAQs</Link></li>
              <li><Link href="/#contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Hours</h4>
            <ul className="hours">
              <li>Mon - Sat: 9am - 7pm</li>
              <li>Sunday: Closed</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Vivid Auto Details. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
