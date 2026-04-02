import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { SitePage } from "@/components/SitePage";
import { blogPosts } from "@/data/blogPosts";

export default function BlogPage() {
  return (
    <SitePage>
      <PageHero imageSrc="/images/19.jpg" imageAlt="Blog" label="Vivid Insights" title="Detailing" emphasized="Blog" />

      <section className="blog-page">
        <div className="container">
          <div className="blog-grid">
            {blogPosts.map((post) => (
              <article className="blog-card" key={post.slug}>
                <div className="blog-card-content">
                  <div className="blog-meta">
                    <span className="blog-date">{post.date}</span>
                    <span className="blog-read">{post.readTime}</span>
                  </div>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <Link href={`/blog/${post.slug}`} className="blog-link">
                    Read Article →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SitePage>
  );
}
