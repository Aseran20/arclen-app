import Link from "next/link";
import {
  IconRocket,
  IconTablePlus,
  IconPresentation,
  IconArrowRight,
} from "@tabler/icons-react";

export const metadata = {
  title: "Documentation - Arclen",
  description:
    "Learn how to use Arclen AI copilots for Excel and PowerPoint.",
};

export default function DocsPage() {
  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none">
      <h1>Welcome to Arclen Documentation</h1>

      <p className="lead">
        Arclen provides AI-powered copilots for Excel and PowerPoint, designed
        specifically for M&A and finance teams. This documentation will help you
        get started and make the most of our tools.
      </p>

      <h2>Quick Links</h2>

      <div className="not-prose grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <QuickLinkCard
          href="/docs/quick-start"
          icon={<IconRocket className="h-6 w-6" />}
          title="Quick Start"
          description="Get up and running in under 5 minutes"
        />
        <QuickLinkCard
          href="/docs/excel-bulk"
          icon={<IconTablePlus className="h-6 w-6" />}
          title="Excel - AI Bulk"
          description="Process multiple cells with AI"
        />
        <QuickLinkCard
          href="/docs/powerpoint-audit"
          icon={<IconPresentation className="h-6 w-6" />}
          title="PowerPoint - AI Audit"
          description="Review presentations automatically"
        />
      </div>

      <h2>What is Arclen?</h2>

      <p>
        Arclen is a suite of AI copilots that integrate directly into Microsoft
        Office applications. Our tools help finance professionals:
      </p>

      <ul>
        <li>
          <strong>Save time</strong> on repetitive data tasks in Excel
        </li>
        <li>
          <strong>Ensure consistency</strong> across financial models and
          presentations
        </li>
        <li>
          <strong>Reduce errors</strong> with AI-powered auditing and validation
        </li>
      </ul>

      <h2>Available Products</h2>

      <h3>Excel Add-ins</h3>

      <ul>
        <li>
          <strong>AI Bulk</strong> - Process hundreds of cells simultaneously
          with AI. Perfect for data cleaning, categorization, and enrichment.
        </li>
        <li>
          <strong>AI Audit</strong> - Automatically review your spreadsheets for
          errors, inconsistencies, and best practices.
        </li>
      </ul>

      <h3>PowerPoint Add-ins</h3>

      <ul>
        <li>
          <strong>AI Audit</strong> - Review presentations for formatting
          consistency, typos, and alignment with brand guidelines.
        </li>
      </ul>

      <h2>Getting Help</h2>

      <p>
        If you need assistance, check our{" "}
        <Link href="/faq">FAQ</Link> or{" "}
        <Link href="/contact">contact our support team</Link>.
      </p>
    </article>
  );
}

function QuickLinkCard({
  href,
  icon,
  title,
  description,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-xl border border-neutral-200 bg-neutral-50 p-5 transition-all hover:border-primary/50 hover:bg-primary/5 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-primary/50 dark:hover:bg-primary/10"
    >
      <div className="mb-3 text-primary">{icon}</div>
      <h3 className="mb-1 font-semibold text-neutral-900 dark:text-neutral-100">
        {title}
      </h3>
      <p className="mb-3 text-sm text-neutral-600 dark:text-neutral-400">
        {description}
      </p>
      <div className="mt-auto flex items-center gap-1 text-sm font-medium text-primary">
        Learn more
        <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
