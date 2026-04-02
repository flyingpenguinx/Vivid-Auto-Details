import { FaqSection } from "@/components/FaqSection";
import { PageHero } from "@/components/PageHero";
import { SitePage } from "@/components/SitePage";
import { faqs } from "@/data/faqs";

export default function FaqsPage() {
  return (
    <SitePage>
      <PageHero
        imageSrc="/images/hero.jpg"
        imageAlt="FAQs"
        label="FAQ"
        title="Frequently Asked"
        emphasized="Questions"
      />
      <FaqSection items={faqs} />
    </SitePage>
  );
}
