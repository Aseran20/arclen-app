import Link from "next/link";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";

export const metadata = {
  title: "Quick Start - Arclen Documentation",
  description: "Get started with Arclen AI copilots in under 5 minutes.",
};

export default function QuickStartPage() {
  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none">
      <h1>Quick Start Guide</h1>

      <p className="lead">
        Get up and running with Arclen in under 5 minutes. This guide covers
        installation and your first AI-powered task.
      </p>

      <h2>Prerequisites</h2>

      <ul>
        <li>Microsoft 365 subscription (Excel and/or PowerPoint)</li>
        <li>An Arclen account with an active subscription</li>
        <li>Windows 10+ or macOS 10.14+</li>
      </ul>

      <h2>Step 1: Install the Add-in</h2>

      <ol>
        <li>Open Excel or PowerPoint</li>
        <li>
          Go to <strong>Insert</strong> &rarr; <strong>Get Add-ins</strong>
        </li>
        <li>Search for &quot;Arclen&quot;</li>
        <li>
          Click <strong>Add</strong> to install
        </li>
      </ol>

      <div className="not-prose my-6 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950">
        <p className="text-sm text-amber-800 dark:text-amber-200">
          <strong>Note:</strong> If you don&apos;t see the add-in in the store,
          your organization may need to approve it first. Contact your IT
          administrator or{" "}
          <Link href="/contact" className="underline">
            reach out to us
          </Link>{" "}
          for help.
        </p>
      </div>

      <h2>Step 2: Sign In</h2>

      <ol>
        <li>
          Click the <strong>Arclen</strong> button in the ribbon
        </li>
        <li>The Arclen panel will open on the right side</li>
        <li>Click &quot;Sign In&quot; and enter your credentials</li>
      </ol>

      <h2>Step 3: Run Your First Task</h2>

      <h3>For Excel - AI Bulk</h3>

      <ol>
        <li>Select the cells you want to process</li>
        <li>In the Arclen panel, choose your task type</li>
        <li>Click &quot;Run&quot; and watch the magic happen</li>
      </ol>

      <h3>For PowerPoint - AI Audit</h3>

      <ol>
        <li>Open the presentation you want to review</li>
        <li>Click &quot;Start Audit&quot; in the Arclen panel</li>
        <li>Review the suggestions and apply fixes</li>
      </ol>

      <h2>Next Steps</h2>

      <p>Now that you&apos;re set up, explore our detailed guides:</p>

      <ul>
        <li>
          <Link href="/docs/excel-bulk">Excel - AI Bulk Guide</Link>
        </li>
        <li>
          <Link href="/docs/excel-audit">Excel - AI Audit Guide</Link>
        </li>
        <li>
          <Link href="/docs/powerpoint-audit">PowerPoint - AI Audit Guide</Link>
        </li>
      </ul>

      <nav className="not-prose mt-12 flex items-center justify-between border-t border-neutral-200 pt-6 dark:border-neutral-800">
        <Link
          href="/docs"
          className="flex items-center gap-2 text-sm text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
        >
          <IconArrowLeft className="h-4 w-4" />
          Introduction
        </Link>
        <Link
          href="/docs/excel-bulk"
          className="flex items-center gap-2 text-sm font-medium text-primary"
        >
          Excel - AI Bulk
          <IconArrowRight className="h-4 w-4" />
        </Link>
      </nav>
    </article>
  );
}
