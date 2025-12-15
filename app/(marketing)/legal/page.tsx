import { Badge } from "@/components/marketing/badge";
import { Container } from "@/components/marketing/container";
import { DivideX } from "@/components/marketing/divide";
import { Heading } from "@/components/marketing/heading";
import { SubHeading } from "@/components/marketing/subheading";
import { getSEOTags } from "@/lib/seo";

export const metadata = getSEOTags({
  title: "Legal Notice | Arclen",
  description:
    "Legal information and company details for Arclen.",
});

export default function LegalPage() {
  return (
    <main>
      <DivideX />
      <Container className="border-divide border-x px-4 py-16 md:px-8 md:py-24">
        <Badge text="Legal" />
        <Heading className="mt-4 text-left">Legal Notice</Heading>
        <SubHeading className="mt-4 text-left">
          Last updated: December 2024
        </SubHeading>

        <div className="prose prose-neutral dark:prose-invert mt-12 max-w-none">
          <h2>1. Publisher</h2>
          <p>This website is published by:</p>
          <ul>
            <li><strong>Company name:</strong> Arclen</li>
            <li><strong>Legal form:</strong> Entrepreneur individuel</li>
            <li><strong>Owner:</strong> TURION SERRANO ADRIAN</li>
            <li><strong>SIREN:</strong> 894 340 728</li>
            <li><strong>SIRET:</strong> 894 340 728 00019</li>
            <li><strong>VAT number:</strong> FR62894340728</li>
            <li><strong>RCS:</strong> 894 340 728 R.C.S. Aix-en-Provence</li>
            <li><strong>Email:</strong> contact@arclen.app</li>
          </ul>

          <h2>2. Hosting</h2>
          <p>The website is hosted by:</p>
          <ul>
            <li><strong>Hosting provider:</strong> Vercel Inc.</li>
            <li><strong>Address:</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, USA</li>
          </ul>
          <p>Backend services and databases are hosted by:</p>
          <ul>
            <li><strong>Railway</strong></li>
            <li>Infrastructure providers may include cloud services located in the EU and/or Switzerland.</li>
          </ul>

          <h2>3. Intellectual Property</h2>
          <p>
            All content on this website, including text, visuals, logos, code, and trademarks,
            is the exclusive property of Arclen or its licensors.
          </p>
          <p>
            Any reproduction, representation, modification, or distribution without prior
            written consent is strictly prohibited.
          </p>

          <h2>4. Liability</h2>
          <p>
            The information provided on this website is for informational purposes only.
            Arclen makes no guarantee regarding the accuracy, completeness, or timeliness
            of the information.
          </p>
          <p>
            Arclen shall not be held liable for any direct or indirect damages resulting
            from the use of the website.
          </p>

          <h2>5. Contact</h2>
          <p>
            For any questions regarding legal notices, please contact:{" "}
            <a href="mailto:contact@arclen.app">contact@arclen.app</a>
          </p>
        </div>
      </Container>
      <DivideX />
    </main>
  );
}
