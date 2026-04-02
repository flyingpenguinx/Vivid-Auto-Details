import { notFound } from "next/navigation";
import { SitePage } from "@/components/SitePage";
import { blogPosts } from "@/data/blogPosts";

type Params = {
  slug: string;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <SitePage>
      <section className="page-hero blog-post-hero">
        <div className="page-hero-bg">
          <img src={post.heroImage} alt={post.title} />
          <div className="page-hero-overlay"></div>
        </div>
        <div className="container">
          <div className="page-hero-content">
            <span className="section-label">{post.category}</span>
            <h1 className="page-title">{post.title}</h1>
            <div className="blog-post-meta">
              <span>{post.date}</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="blog-post-content">
        <div className="container">
          <article className="blog-post-body">
            {post.content.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </article>
        </div>
      </section>
    </SitePage>
  );
}
