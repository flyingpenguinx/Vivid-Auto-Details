"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ClientEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    const desktopVideo = document.querySelector<HTMLVideoElement>(".hero-video-desktop");
    const mobileVideo = document.querySelector<HTMLVideoElement>(".hero-video-mobile");
    const heroImg = document.querySelector<HTMLElement>(".hero-img");
    const activeVideo = isMobile ? mobileVideo : desktopVideo;

    if (!activeVideo) {
      return;
    }

    const playVideo = () => {
      activeVideo.muted = true;
      activeVideo.playsInline = true;
      const playPromise = activeVideo.play();
      if (playPromise) {
        playPromise
          .then(() => {
            if (heroImg) {
              heroImg.style.opacity = "0";
            }
          })
          .catch(() => {
          });
      }
    };

    playVideo();

    const firstInteraction = () => playVideo();
    window.addEventListener("touchstart", firstInteraction, { passive: true });
    window.addEventListener("click", firstInteraction, { passive: true });

    return () => {
      window.removeEventListener("touchstart", firstInteraction);
      window.removeEventListener("click", firstInteraction);
    };
  }, [pathname]);

  useEffect(() => {
    const anchors = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');

    const handlers: Array<{ element: HTMLAnchorElement; handler: (e: MouseEvent) => void }> = [];

    anchors.forEach((anchor) => {
      const handler = (event: MouseEvent) => {
        const href = anchor.getAttribute("href");
        if (!href || href === "#") {
          return;
        }

        const target = document.querySelector<HTMLElement>(href);
        if (!target) {
          return;
        }

        event.preventDefault();
        const offset = window.innerWidth <= 768 ? 70 : 85;
        const position = target.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({ top: position, behavior: "smooth" });
      };

      anchor.addEventListener("click", handler);
      handlers.push({ element: anchor, handler });
    });

    return () => {
      handlers.forEach(({ element, handler }) => {
        element.removeEventListener("click", handler);
      });
    };
  }, [pathname]);

  useEffect(() => {
    const revealElements = document.querySelectorAll<HTMLElement>(".reveal-text, .reveal-card");

    if (!("IntersectionObserver" in window)) {
      revealElements.forEach((el) => el.classList.add("visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    revealElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add("visible");
      } else {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    const sections = document.querySelectorAll<HTMLElement>("section[id]");
    const navLinks = document.querySelectorAll<HTMLAnchorElement>(".nav-link");

    const updateActive = () => {
      const scrollY = window.scrollY;
      sections.forEach((section) => {
        const top = section.offsetTop - 160;
        const bottom = top + section.offsetHeight;
        if (scrollY >= top && scrollY < bottom) {
          const id = section.id;
          navLinks.forEach((link) => {
            const href = link.getAttribute("href") ?? "";
            if (href.includes(`#${id}`) || (id === "home" && href === "/")) {
              link.classList.add("active");
            } else {
              link.classList.remove("active");
            }
          });
        }
      });
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    return () => window.removeEventListener("scroll", updateActive);
  }, [pathname]);

  return null;
}
