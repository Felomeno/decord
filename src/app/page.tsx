import type { Metadata } from "next";
import { BeforeAfter } from "@/components/home/BeforeAfter";
import { Faq } from "@/components/home/Faq";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { FinalCta } from "@/components/home/FinalCta";
import { Hero } from "@/components/home/Hero";
import { Process } from "@/components/home/Process";
import { Reviews } from "@/components/home/Reviews";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { TrustStrip } from "@/components/home/TrustStrip";
import { WhyUs } from "@/components/home/WhyUs";
import { BusinessJsonLd } from "@/components/JsonLd";
import { faq, steps } from "@/content/voice";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <BusinessJsonLd />
      <Hero />
      <TrustStrip />
      <WhyUs />
      <ServicesGrid />
      <FeaturedProjects />
      <BeforeAfter />
      <Process items={steps} />
      <Reviews />
      <Faq items={faq.slice(0, 7)} pale={false} />
      <FinalCta />
    </>
  );
}
