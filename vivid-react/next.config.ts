import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/services.html", destination: "/services", permanent: true },
      { source: "/services-detail.html", destination: "/services", permanent: true },
      { source: "/gallery.html", destination: "/gallery", permanent: true },
      { source: "/blog.html", destination: "/blog", permanent: true },
      { source: "/faqs.html", destination: "/faqs", permanent: true },
      {
        source: "/blog-ceramic-vs-ppf.html",
        destination: "/blog/ceramic-vs-ppf",
        permanent: true,
      },
      {
        source: "/blog-ceramic-maintenance.html",
        destination: "/blog/ceramic-maintenance",
        permanent: true,
      },
      {
        source: "/blog-sacramento-car-damage.html",
        destination: "/blog/sacramento-car-damage",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
