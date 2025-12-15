import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";

export const metadata = {
  title: "PowerPoint - AI Audit - Arclen Documentation",
  description:
    "Learn how to use AI Audit to review PowerPoint presentations.",
};

export default function PowerPointAuditPage() {
  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none">
      <h1>PowerPoint - AI Audit</h1>

      <p className="lead">
        AI Audit for PowerPoint automatically reviews your presentations for
        formatting issues, typos, and consistency problems. Perfect for
        polishing client-facing decks.
      </p>

      <h2>Overview</h2>

      <p>
        Professional presentations need to be pixel-perfect. AI Audit scans
        every slide for issues that are easy to miss during manual review,
        ensuring your presentations look polished and professional.
      </p>

      <h3>What AI Audit Checks</h3>

      <ul>
        <li>
          <strong>Text issues</strong> - Spelling, grammar, and punctuation
          errors
        </li>
        <li>
          <strong>Formatting consistency</strong> - Font sizes, colors, and
          styles across slides
        </li>
        <li>
          <strong>Alignment</strong> - Objects that are slightly misaligned
        </li>
        <li>
          <strong>Brand compliance</strong> - Colors and fonts matching your
          brand guidelines
        </li>
        <li>
          <strong>Image quality</strong> - Low resolution or stretched images
        </li>
        <li>
          <strong>Accessibility</strong> - Missing alt text, low contrast text
        </li>
      </ul>

      <h2>How to Use</h2>

      <h3>Running an Audit</h3>

      <ol>
        <li>
          <strong>Open your presentation</strong> - The deck you want to review
        </li>
        <li>
          <strong>Open Arclen</strong> - Click the Arclen button in the ribbon
        </li>
        <li>
          <strong>Start audit</strong> - Click &quot;Audit Presentation&quot;
        </li>
        <li>
          <strong>Review findings</strong> - Browse issues by slide or category
        </li>
        <li>
          <strong>Apply fixes</strong> - Fix issues one by one or in bulk
        </li>
      </ol>

      <h3>Setting Up Brand Guidelines</h3>

      <p>
        For brand compliance checks, you can configure your brand settings in
        the Arclen dashboard:
      </p>

      <ul>
        <li>Primary and secondary brand colors</li>
        <li>Approved fonts and sizes</li>
        <li>Logo usage rules</li>
        <li>Slide layout templates</li>
      </ul>

      <h2>Understanding Results</h2>

      <p>Findings are organized by category:</p>

      <div className="not-prose my-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-800">
          <h4 className="mb-2 font-semibold text-neutral-900 dark:text-neutral-100">
            Text &amp; Content
          </h4>
          <ul className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
            <li>Spelling mistakes</li>
            <li>Grammar issues</li>
            <li>Inconsistent capitalization</li>
            <li>Orphaned bullet points</li>
          </ul>
        </div>
        <div className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-800">
          <h4 className="mb-2 font-semibold text-neutral-900 dark:text-neutral-100">
            Design &amp; Layout
          </h4>
          <ul className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
            <li>Misaligned objects</li>
            <li>Inconsistent spacing</li>
            <li>Off-brand colors</li>
            <li>Font inconsistencies</li>
          </ul>
        </div>
        <div className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-800">
          <h4 className="mb-2 font-semibold text-neutral-900 dark:text-neutral-100">
            Media &amp; Assets
          </h4>
          <ul className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
            <li>Low-res images</li>
            <li>Stretched graphics</li>
            <li>Broken links</li>
            <li>Missing alt text</li>
          </ul>
        </div>
        <div className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-800">
          <h4 className="mb-2 font-semibold text-neutral-900 dark:text-neutral-100">
            Structure
          </h4>
          <ul className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
            <li>Empty slides</li>
            <li>Hidden content</li>
            <li>Slide number issues</li>
            <li>Missing titles</li>
          </ul>
        </div>
      </div>

      <h2>Bulk Fixes</h2>

      <p>
        Some issues can be fixed across the entire presentation at once. Look
        for the &quot;Fix All&quot; button when multiple slides have the same
        issue:
      </p>

      <ul>
        <li>Font replacements</li>
        <li>Color corrections</li>
        <li>Alignment fixes</li>
        <li>Spelling corrections</li>
      </ul>

      <h2>Export Report</h2>

      <p>
        Need to share findings with your team? Export the audit report as a PDF
        or Excel file for review and tracking.
      </p>

      <nav className="not-prose mt-12 flex items-center justify-between border-t border-neutral-200 pt-6 dark:border-neutral-800">
        <Link
          href="/docs/excel-audit"
          className="flex items-center gap-2 text-sm text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
        >
          <IconArrowLeft className="h-4 w-4" />
          Excel - AI Audit
        </Link>
        <div />
      </nav>
    </article>
  );
}
