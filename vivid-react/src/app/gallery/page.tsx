import { GalleryFilter } from "@/components/GalleryFilter";
import { PageHero } from "@/components/PageHero";
import { SitePage } from "@/components/SitePage";

export default function GalleryPage() {
  return (
    <SitePage>
      <PageHero
        imageSrc="/images/24.jpg"
        imageAlt="Gallery"
        label="Our Work"
        title="Detailing"
        emphasized="Gallery"
        subtitle="Recent projects from Vivid Auto Details."
      />

      <section className="gallery-page">
        <div className="container">
          <GalleryFilter />
        </div>
      </section>
    </SitePage>
  );
}
