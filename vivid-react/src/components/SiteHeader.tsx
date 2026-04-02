"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const homeAnchor = (hash: string) => (pathname === "/" ? hash : `/${hash}`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen || megaOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen, megaOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMegaOpen(false);
        setMobileOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const closeMenu = () => {
    setMobileOpen(false);
    setMegaOpen(false);
  };

  const isActive = (route: string) => pathname === route;

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`} id="header">
      <nav className="nav">
        <button className={`menu-trigger ${megaOpen ? "active" : ""}`} onClick={() => setMegaOpen((prev) => !prev)}>
          <div className="trigger-box">
            <span className="trigger-line"></span>
            <span className="trigger-line"></span>
          </div>
        </button>

        <ul className="nav-left">
          <li><Link href="/" className={`nav-link ${isActive("/") ? "active" : ""}`}>Home</Link></li>
          <li><Link href="/services" className={`nav-link ${isActive("/services") ? "active" : ""}`}>Services</Link></li>
          <li><Link href={homeAnchor("#about")} className="nav-link">About</Link></li>
        </ul>

        <Link href="/" className="nav-center" onClick={closeMenu}>
          <Image src="/images/logo.jpg" alt="Vivid Auto Details" className="nav-logo" width={45} height={45} priority />
          <span className="nav-brand">VIVID</span>
        </Link>

        <ul className="nav-right">
          <li><Link href="/gallery" className={`nav-link ${isActive("/gallery") ? "active" : ""}`}>Gallery</Link></li>
          <li><Link href="/blog" className={`nav-link ${pathname.startsWith("/blog") ? "active" : ""}`}>Blog</Link></li>
          <li><Link href="/faqs" className={`nav-link ${isActive("/faqs") ? "active" : ""}`}>FAQs</Link></li>
          <li><Link href={homeAnchor("#contact")} className="nav-link">Contact</Link></li>
          <li><a href="https://vividautodetails.fieldd.co/" target="_blank" className="nav-link cta-link">Book Now</a></li>
        </ul>

        <button
          className={`mobile-toggle ${mobileOpen ? "active" : ""}`}
          aria-label="Open menu"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          <span></span>
          <span></span>
        </button>
      </nav>

      <nav className={`mega-nav ${megaOpen ? "active" : ""}`} id="megaNav">
        <button className="mega-nav-close" id="megaNavClose" aria-label="Close menu" onClick={() => setMegaOpen(false)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
        <div className="nav-background">
          <div className="nav-bg-slice"></div>
          <div className="nav-bg-slice"></div>
          <div className="nav-bg-slice"></div>
          <div className="nav-bg-slice"></div>
        </div>
        <div className="nav-content">
          <div className="nav-main">
            <ul className="mega-nav-links">
              <li className="mega-nav-item" data-index="01"><Link href="/" className="mega-nav-link" onClick={closeMenu}><span className="link-text">Home</span><span className="link-bg">Home</span></Link></li>
              <li className="mega-nav-item" data-index="02"><Link href="/services" className="mega-nav-link" onClick={closeMenu}><span className="link-text">Services</span><span className="link-bg">Services</span></Link></li>
              <li className="mega-nav-item" data-index="03"><Link href="/gallery" className="mega-nav-link" onClick={closeMenu}><span className="link-text">Gallery</span><span className="link-bg">Gallery</span></Link></li>
              <li className="mega-nav-item" data-index="04"><Link href="/blog" className="mega-nav-link" onClick={closeMenu}><span className="link-text">Blog</span><span className="link-bg">Blog</span></Link></li>
              <li className="mega-nav-item" data-index="05"><Link href="/faqs" className="mega-nav-link" onClick={closeMenu}><span className="link-text">FAQs</span><span className="link-bg">FAQs</span></Link></li>
            </ul>
          </div>
        </div>
      </nav>

      <div className={`mobile-menu ${mobileOpen ? "active" : ""}`} id="mobileMenu">
        <ul>
          <li><Link href="/" onClick={closeMenu}>Home</Link></li>
          <li><Link href="/services" onClick={closeMenu}>Services</Link></li>
          <li><Link href={homeAnchor("#about")} onClick={closeMenu}>About</Link></li>
          <li><Link href="/gallery" onClick={closeMenu}>Gallery</Link></li>
          <li><Link href="/blog" onClick={closeMenu}>Blog</Link></li>
          <li><Link href="/faqs" onClick={closeMenu}>FAQs</Link></li>
          <li><Link href={homeAnchor("#contact")} onClick={closeMenu}>Contact</Link></li>
          <li><a href="https://vividautodetails.fieldd.co/" target="_blank" className="mobile-cta" onClick={closeMenu}>Book Now</a></li>
        </ul>
      </div>
    </header>
  );
}
