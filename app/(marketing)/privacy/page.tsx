import { Badge } from "@/components/marketing/badge";
import { Container } from "@/components/marketing/container";
import { DivideX } from "@/components/marketing/divide";
import { Heading } from "@/components/marketing/heading";
import { SubHeading } from "@/components/marketing/subheading";
import { getSEOTags } from "@/lib/seo";

export const metadata = getSEOTags({
  title: "Privacy Policy | Arclen",
  description:
    "Learn how Arclen collects, uses, and protects your personal information.",
});

export default function PrivacyPage() {
  return (
    <main>
      <DivideX />
      <Container className="border-divide border-x px-4 py-16 md:px-8 md:py-24">
        <Badge text="Legal" />
        <Heading className="mt-4 text-left">Privacy Policy</Heading>
        <SubHeading className="mt-4 text-left">
          Last updated: December 2024
        </SubHeading>

        <div className="prose prose-neutral dark:prose-invert mt-12 max-w-none">
          <h2>1. Overview</h2>
          <p>
            This Privacy Policy explains how Arclen collects, uses, and protects personal
            data in connection with the use of its website and services.
          </p>
          <p>
            Arclen is committed to complying with applicable data protection regulations,
            including the GDPR and Swiss data protection laws.
          </p>

          <h2>2. Data We Collect</h2>
          <p>We may collect the following categories of data:</p>
          <ul>
            <li>Identification data (name, email address, company)</li>
            <li>Account and authentication data</li>
            <li>Usage data related to the use of our services</li>
            <li>Billing and subscription data</li>
            <li>Technical data (IP address, browser, device)</li>
          </ul>

          <h2>3. Purpose of Processing</h2>
          <p>Personal data is processed for the following purposes:</p>
          <ul>
            <li>Providing and operating the services</li>
            <li>User authentication and account management</li>
            <li>Billing and subscription management</li>
            <li>Improving product performance and reliability</li>
            <li>Customer support and communication</li>
            <li>Compliance with legal obligations</li>
          </ul>

          <h2>4. Legal Basis</h2>
          <p>Processing is based on one or more of the following legal grounds:</p>
          <ul>
            <li>Performance of a contract</li>
            <li>Legitimate interest</li>
            <li>Legal obligation</li>
            <li>User consent, where applicable</li>
          </ul>

          <h2>5. Data Retention</h2>
          <p>
            Personal data is retained only for as long as necessary to fulfill the purposes
            described above or to comply with legal obligations.
          </p>

          <h2>6. Third-Party Processors</h2>
          <p>Arclen may rely on trusted third-party processors, including:</p>
          <ul>
            <li><strong>Stripe</strong> (payments and billing)</li>
            <li><strong>Vercel</strong> (frontend hosting)</li>
            <li><strong>Railway</strong> (backend and database hosting)</li>
            <li>AI service providers for processing user requests</li>
          </ul>
          <p>All processors are subject to contractual data protection obligations.</p>

          <h2>7. Security Measures</h2>
          <p>
            Arclen implements appropriate technical and organizational measures to protect
            personal data against unauthorized access, alteration, or loss.
          </p>

          <h2>8. User Rights</h2>
          <p>Users have the right to:</p>
          <ul>
            <li>Access their personal data</li>
            <li>Rectify inaccurate data</li>
            <li>Request deletion of data</li>
            <li>Object to or restrict processing</li>
            <li>Request data portability</li>
          </ul>
          <p>
            Requests can be made by contacting{" "}
            <a href="mailto:contact@arclen.app">contact@arclen.app</a>.
          </p>

          <h2>9. Contact</h2>
          <p>
            For any privacy-related questions, please contact:{" "}
            <a href="mailto:contact@arclen.app">contact@arclen.app</a>
          </p>
        </div>
      </Container>
      <DivideX />
    </main>
  );
}
