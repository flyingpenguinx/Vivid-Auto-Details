type PageHeroProps = {
  imageSrc: string;
  imageAlt: string;
  label: string;
  title: string;
  emphasized?: string;
  subtitle?: string;
  className?: string;
};

export function PageHero({
  imageSrc,
  imageAlt,
  label,
  title,
  emphasized,
  subtitle,
  className = "",
}: PageHeroProps) {
  return (
    <section className={`page-hero ${className}`.trim()}>
      <div className="page-hero-bg">
        <img src={imageSrc} alt={imageAlt} />
        <div className="page-hero-overlay"></div>
      </div>
      <div className="container">
        <div className="page-hero-content">
          <span className="section-label">{label}</span>
          <h1 className="page-title">
            {title} {emphasized ? <em>{emphasized}</em> : null}
          </h1>
          {subtitle ? <p className="page-subtitle">{subtitle}</p> : null}
        </div>
      </div>
    </section>
  );
}
