import { getStripePrices, getStripeProducts } from '@/lib/payments/stripe';
import { Pricing } from '@/components/marketing/pricing';
import { PricingTable } from '@/components/marketing/pricing-table';
import { FAQs } from '@/components/marketing/faqs';
import { CTA } from '@/components/marketing/cta';
import { DivideX } from '@/components/marketing/divide';
import { getSEOTags } from '@/lib/seo';

export const metadata = getSEOTags({
  title: "Pricing - Your SaaS",
  description: "Simple and flexible pricing for your needs.",
});

export default async function PricingPage() {
  // Fetch Stripe data server-side
  const [prices, products] = await Promise.all([
    getStripePrices(),
    getStripeProducts(),
  ]);

  return (
    <main>
      <DivideX />
      <Pricing prices={prices} products={products} />
      <DivideX />
      <PricingTable />
      <FAQs />
      <DivideX />
      <CTA />
      <DivideX />
    </main>
  );
}
