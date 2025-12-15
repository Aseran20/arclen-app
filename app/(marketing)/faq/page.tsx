import { FAQs } from "@/components/marketing/faqs";
import { DivideX } from "@/components/marketing/divide";
import { getSEOTags } from "@/lib/seo";

export const metadata = getSEOTags({
  title: "FAQ | Arclen",
  description:
    "Frequently asked questions about Arclen's AI copilots for Excel and PowerPoint. Find answers about features, security, integrations, and more.",
});

export default function FAQPage() {
  return (
    <main>
      <DivideX />
      <FAQs />
      <DivideX />
    </main>
  );
}
