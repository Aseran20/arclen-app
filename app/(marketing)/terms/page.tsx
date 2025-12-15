import { Badge } from "@/components/marketing/badge";
import { Container } from "@/components/marketing/container";
import { DivideX } from "@/components/marketing/divide";
import { Heading } from "@/components/marketing/heading";
import { SubHeading } from "@/components/marketing/subheading";
import { getSEOTags } from "@/lib/seo";

export const metadata = getSEOTags({
  title: "Terms of Service | Arclen",
  description:
    "Read the terms and conditions for using Arclen services.",
});

export default function TermsPage() {
  return (
    <main>
      <DivideX />
      <Container className="border-divide border-x px-4 py-16 md:px-8 md:py-24">
        <Badge text="Legal" />
        <Heading className="mt-4 text-left">Terms of Service</Heading>
        <SubHeading className="mt-4 text-left">
          Last updated: December 2024
        </SubHeading>

        <div className="prose prose-neutral dark:prose-invert mt-12 max-w-none">
          <h2>1. Description of the Service</h2>
          <p>
            Arclen provides AI-powered software tools integrated into Microsoft Excel
            and PowerPoint, designed for professional financial use cases.
          </p>

          <h2>2. Eligibility</h2>
          <p>
            The services are intended exclusively for business users acting in a
            professional capacity.
          </p>

          <h2>3. Accounts</h2>
          <p>
            Users are responsible for maintaining the confidentiality of their account
            credentials and for all activities conducted under their account.
          </p>

          <h2>4. Acceptable Use</h2>
          <p>Users agree not to:</p>
          <ul>
            <li>Use the service for unlawful purposes</li>
            <li>Attempt to reverse engineer or misuse the service</li>
            <li>Circumvent usage limits or security mechanisms</li>
          </ul>

          <h2>5. Usage Limits and Quotas</h2>
          <p>
            The service is subject to usage limits defined by the applicable subscription
            plan. Limits may apply to AI calls, audits, or other computational resources.
          </p>

          <h2>6. Subscription and Billing</h2>
          <p>
            Subscriptions are billed on a recurring basis. Fees are non-refundable except
            as required by law. Arclen may modify pricing with prior notice.
          </p>

          <h2>7. Data and Confidentiality</h2>
          <p>
            Users retain ownership of their data. Arclen does not claim ownership over
            user files or content. Data may be processed transiently to deliver the service.
          </p>

          <h2>8. Disclaimer of Warranties</h2>
          <p>
            The service is provided "as is" and "as available". Arclen makes no warranties
            regarding uninterrupted or error-free operation.
          </p>

          <h2>9. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, Arclen shall not be liable for indirect,
            incidental, or consequential damages.
          </p>

          <h2>10. Termination</h2>
          <p>
            Arclen may suspend or terminate access in case of breach of these terms.
            Users may terminate their subscription at any time.
          </p>

          <h2>11. Governing Law</h2>
          <p>
            These terms are governed by the laws of France. Any disputes shall be subject
            to the exclusive jurisdiction of the courts of Aix-en-Provence, France.
          </p>

          <h2>12. Contact</h2>
          <p>
            For questions regarding these terms:{" "}
            <a href="mailto:contact@arclen.app">contact@arclen.app</a>
          </p>
        </div>
      </Container>
      <DivideX />
    </main>
  );
}
