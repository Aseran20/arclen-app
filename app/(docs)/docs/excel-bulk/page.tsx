import Link from "next/link";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";

export const metadata = {
  title: "Excel - AI Bulk - Arclen Documentation",
  description:
    "Learn how to use AI Bulk to process multiple Excel cells with AI.",
};

export default function ExcelBulkPage() {
  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none">
      <h1>Excel - AI Bulk</h1>

      <p className="lead">
        AI Bulk lets you process hundreds of Excel cells simultaneously using
        AI. Perfect for data cleaning, categorization, enrichment, and
        transformation tasks.
      </p>

      <h2>Overview</h2>

      <p>
        AI Bulk is designed for repetitive data tasks that would normally
        require manual work or complex formulas. Select your data, describe what
        you want to do, and let AI handle the rest.
      </p>

      <h3>Common Use Cases</h3>

      <ul>
        <li>
          <strong>Data Cleaning</strong> - Standardize company names, fix
          formatting inconsistencies
        </li>
        <li>
          <strong>Categorization</strong> - Classify transactions, tag data by
          industry or type
        </li>
        <li>
          <strong>Enrichment</strong> - Add missing information, expand
          abbreviations
        </li>
        <li>
          <strong>Extraction</strong> - Pull specific data from unstructured
          text
        </li>
        <li>
          <strong>Translation</strong> - Convert content between languages
        </li>
      </ul>

      <h2>How to Use</h2>

      <h3>Basic Workflow</h3>

      <ol>
        <li>
          <strong>Select your data</strong> - Highlight the cells you want to
          process
        </li>
        <li>
          <strong>Open Arclen</strong> - Click the Arclen button in the ribbon
        </li>
        <li>
          <strong>Choose output column</strong> - Select where results should
          appear
        </li>
        <li>
          <strong>Describe your task</strong> - Write a clear prompt explaining
          what you need
        </li>
        <li>
          <strong>Run</strong> - Click the run button and review results
        </li>
      </ol>

      <h3>Writing Effective Prompts</h3>

      <p>The quality of your results depends on your prompt. Here are tips:</p>

      <div className="not-prose my-6 rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-900 dark:bg-green-950">
        <p className="mb-2 text-sm font-medium text-green-800 dark:text-green-200">
          Good prompt example:
        </p>
        <p className="text-sm text-green-700 dark:text-green-300">
          &quot;Extract the company name from each cell. If the cell contains a
          person&apos;s name with a company, return only the company. If no
          company is found, return &apos;N/A&apos;.&quot;
        </p>
      </div>

      <div className="not-prose my-6 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950">
        <p className="mb-2 text-sm font-medium text-red-800 dark:text-red-200">
          Avoid vague prompts:
        </p>
        <p className="text-sm text-red-700 dark:text-red-300">
          &quot;Clean this data&quot; - Too vague, AI won&apos;t know what
          &quot;clean&quot; means for your use case.
        </p>
      </div>

      <h2>Usage Limits</h2>

      <p>
        AI Bulk usage is based on your subscription plan. Each cell processed
        counts against your monthly quota.
      </p>

      <table>
        <thead>
          <tr>
            <th>Plan</th>
            <th>Monthly Cells</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Starter</td>
            <td>1,000</td>
          </tr>
          <tr>
            <td>Professional</td>
            <td>10,000</td>
          </tr>
          <tr>
            <td>Enterprise</td>
            <td>Unlimited</td>
          </tr>
        </tbody>
      </table>

      <h2>Tips &amp; Best Practices</h2>

      <ul>
        <li>
          <strong>Start small</strong> - Test your prompt on a few cells before
          running on large datasets
        </li>
        <li>
          <strong>Be specific</strong> - Include examples of expected output in
          your prompt
        </li>
        <li>
          <strong>Review results</strong> - Always verify AI output before using
          in critical work
        </li>
      </ul>

      <nav className="not-prose mt-12 flex items-center justify-between border-t border-neutral-200 pt-6 dark:border-neutral-800">
        <Link
          href="/docs/quick-start"
          className="flex items-center gap-2 text-sm text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
        >
          <IconArrowLeft className="h-4 w-4" />
          Quick Start
        </Link>
        <Link
          href="/docs/excel-audit"
          className="flex items-center gap-2 text-sm font-medium text-primary"
        >
          Excel - AI Audit
          <IconArrowRight className="h-4 w-4" />
        </Link>
      </nav>
    </article>
  );
}
