import { ContactFormGridWithDetails } from "@/components/marketing/contact-form-grid";
import { DivideX } from "@/components/marketing/divide";
import { getSEOTags } from "@/lib/seo";

export const metadata = getSEOTags({
  title: "Contact | Arclen",
  description:
    "Get in touch with the Arclen team. We're here to help with your AI-powered Office add-ins needs.",
});

export default function ContactPage() {
  return (
    <main>
      <DivideX />
      <ContactFormGridWithDetails />
      <DivideX />
    </main>
  );
}
