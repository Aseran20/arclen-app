import Link from "next/link";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";

export const metadata = {
  title: "Excel - AI Audit - Arclen Documentation",
  description:
    "Learn how to use AI Audit to automatically review Excel spreadsheets.",
};

export default function ExcelAuditPage() {
  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none">
      <h1>Excel - AI Audit</h1>

      <p className="lead">
        AI Audit automatically reviews your Excel spreadsheets for errors,
        inconsistencies, and best practices. Catch issues before they become
        problems.
      </p>

      <h2>Overview</h2>

      <p>
        Financial models and data spreadsheets can contain hidden errors that
        are difficult to spot manually. AI Audit scans your workbook and
        highlights potential issues with actionable recommendations.
      </p>

      <h3>What AI Audit Checks</h3>

      <ul>
        <li>
          <strong>Formula errors</strong> - #REF, #VALUE, circular references
        </li>
        <li>
          <strong>Inconsistent formulas</strong> - Formulas that break patterns
          in a range
        </li>
        <li>
          <strong>Hardcoded values</strong> - Numbers embedded in formulas that
          should be references
        </li>
        <li>
          <strong>Formatting inconsistencies</strong> - Mixed number formats,
          date formats
        </li>
        <li>
          <strong>Data validation</strong> - Values outside expected ranges
        </li>
        <li>
          <strong>Best practices</strong> - Naming conventions, structure
          recommendations
        </li>
      </ul>

      <h2>How to Use</h2>

      <h3>Running an Audit</h3>

      <ol>
        <li>
          <strong>Open your workbook</strong> - The workbook you want to audit
        </li>
        <li>
          <strong>Open Arclen</strong> - Click the Arclen button in the ribbon
        </li>
        <li>
          <strong>Select audit type</strong> - Choose full audit or specific
          checks
        </li>
        <li>
          <strong>Run audit</strong> - Click &quot;Start Audit&quot;
        </li>
        <li>
          <strong>Review findings</strong> - Navigate through issues in the
          panel
        </li>
      </ol>

      <h3>Understanding Results</h3>

      <p>Audit findings are categorized by severity:</p>

      <div className="not-prose my-6 space-y-3">
        <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-3 dark:border-red-900 dark:bg-red-950">
          <span className="rounded bg-red-500 px-2 py-0.5 text-xs font-medium text-white">
            Critical
          </span>
          <p className="text-sm text-red-800 dark:text-red-200">
            Errors that will cause incorrect calculations or broken references
          </p>
        </div>
        <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-3 dark:border-amber-900 dark:bg-amber-950">
          <span className="rounded bg-amber-500 px-2 py-0.5 text-xs font-medium text-white">
            Warning
          </span>
          <p className="text-sm text-amber-800 dark:text-amber-200">
            Potential issues that may indicate problems or inconsistencies
          </p>
        </div>
        <div className="flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 p-3 dark:border-blue-900 dark:bg-blue-950">
          <span className="rounded bg-blue-500 px-2 py-0.5 text-xs font-medium text-white">
            Info
          </span>
          <p className="text-sm text-blue-800 dark:text-blue-200">
            Suggestions for best practices and improvements
          </p>
        </div>
      </div>

      <h2>Audit Types</h2>

      <h3>Full Audit</h3>

      <p>
        Comprehensive review of the entire workbook. Best for final review
        before sharing or after major changes.
      </p>

      <h3>Quick Check</h3>

      <p>
        Fast scan for critical issues only. Useful for regular check-ins during
        development.
      </p>

      <h3>Custom Audit</h3>

      <p>
        Select specific checks to run. Ideal when you know what you&apos;re
        looking for.
      </p>

      <h2>Fixing Issues</h2>

      <p>For each finding, you can:</p>

      <ul>
        <li>
          <strong>Navigate</strong> - Click to jump to the cell
        </li>
        <li>
          <strong>Auto-fix</strong> - Apply suggested fix (when available)
        </li>
        <li>
          <strong>Ignore</strong> - Mark as intentional (won&apos;t flag again)
        </li>
        <li>
          <strong>Learn more</strong> - See detailed explanation of the issue
        </li>
      </ul>

      <nav className="not-prose mt-12 flex items-center justify-between border-t border-neutral-200 pt-6 dark:border-neutral-800">
        <Link
          href="/docs/excel-bulk"
          className="flex items-center gap-2 text-sm text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
        >
          <IconArrowLeft className="h-4 w-4" />
          Excel - AI Bulk
        </Link>
        <Link
          href="/docs/powerpoint-audit"
          className="flex items-center gap-2 text-sm font-medium text-primary"
        >
          PowerPoint - AI Audit
          <IconArrowRight className="h-4 w-4" />
        </Link>
      </nav>
    </article>
  );
}
