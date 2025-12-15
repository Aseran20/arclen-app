import { AgenticIntelligence } from "@/components/marketing/agentic-intelligence";
import { Benefits } from "@/components/marketing/benefits";
import { CTA, CTAOrbit } from "@/components/marketing/cta";
import { DivideX } from "@/components/marketing/divide";
import { FAQs } from "@/components/marketing/faqs";
import { Hero } from "@/components/marketing/hero";
import { HeroImage } from "@/components/marketing/hero-image";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { LogoCloud } from "@/components/marketing/logo-cloud";
import { Pricing } from "@/components/marketing/pricing";
import { Security } from "@/components/marketing/security";
import { Testimonials } from "@/components/marketing/testimonials";
import { UseCases } from "@/components/marketing/use-cases";

import { getSEOTags } from "@/lib/seo";

export const metadata = getSEOTags();

export default function Home() {
  return (
    <main>
      <DivideX />
      <Hero />
      <DivideX />
      <HeroImage />
      <DivideX />
      <LogoCloud />
      <DivideX />
      <HowItWorks />
      <DivideX />
      <AgenticIntelligence />
      <DivideX />
      <UseCases />
      <DivideX />
      <Benefits />
      <DivideX />
      <Testimonials />
      <DivideX />
      <Pricing />
      <DivideX />
      <Security />
      <DivideX />
      <FAQs />
      <DivideX />
      <CTA />
      <DivideX />
    </main>
  );
}
