"use client";

import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  IconMenu2,
  IconX,
  IconBook,
  IconTablePlus,
  IconPresentation,
  IconRocket,
  IconHelp,
  IconMail,
  IconExternalLink,
} from "@tabler/icons-react";
import Image from "next/image";

interface DocLink {
  label: string;
  href: string;
  icon: React.ReactNode;
  external?: boolean;
}

const gettingStartedLinks: DocLink[] = [
  {
    label: "Introduction",
    href: "/docs",
    icon: <IconBook className="h-5 w-5 flex-shrink-0" />,
  },
  {
    label: "Quick Start",
    href: "/docs/quick-start",
    icon: <IconRocket className="h-5 w-5 flex-shrink-0" />,
  },
];

const productLinks: DocLink[] = [
  {
    label: "Excel - AI Bulk",
    href: "/docs/excel-bulk",
    icon: <IconTablePlus className="h-5 w-5 flex-shrink-0" />,
  },
  {
    label: "Excel - AI Audit",
    href: "/docs/excel-audit",
    icon: <IconTablePlus className="h-5 w-5 flex-shrink-0" />,
  },
  {
    label: "PowerPoint - AI Audit",
    href: "/docs/powerpoint-audit",
    icon: <IconPresentation className="h-5 w-5 flex-shrink-0" />,
  },
];

const supportLinks: DocLink[] = [
  {
    label: "FAQ",
    href: "/faq",
    icon: <IconHelp className="h-5 w-5 flex-shrink-0" />,
  },
  {
    label: "Contact Support",
    href: "/contact",
    icon: <IconMail className="h-5 w-5 flex-shrink-0" />,
  },
];

export function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-white md:flex-row dark:bg-neutral-950">
      <DocsSidebar />
      <main className="min-h-screen flex-1">
        <div className="mx-auto max-w-4xl px-6 py-8 md:px-12 md:py-12">
          {children}
        </div>
      </main>
    </div>
  );
}

function DocsSidebar() {
  return (
    <>
      <DesktopSidebar />
      <MobileSidebar />
    </>
  );
}

function DesktopSidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-72 flex-shrink-0 border-r border-neutral-200 bg-neutral-50 md:block dark:border-neutral-800 dark:bg-neutral-900">
      <div className="flex h-full flex-col overflow-y-auto px-4 py-6">
        <DocsLogo />

        <nav className="mt-8 flex flex-1 flex-col gap-6">
          <SidebarSection title="Getting Started" links={gettingStartedLinks} />
          <SidebarSection title="Products" links={productLinks} />
          <SidebarSection title="Support" links={supportLinks} />
        </nav>

        <div className="mt-auto pt-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
          >
            <IconExternalLink className="h-4 w-4" />
            Back to website
          </Link>
        </div>
      </div>
    </aside>
  );
}

function MobileSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex h-14 items-center justify-between border-b border-neutral-200 bg-neutral-50 px-4 md:hidden dark:border-neutral-800 dark:bg-neutral-900">
        <DocsLogo />
        <button
          onClick={() => setOpen(true)}
          className="rounded-md p-2 text-neutral-600 hover:bg-neutral-200 dark:text-neutral-400 dark:hover:bg-neutral-800"
        >
          <IconMenu2 className="h-5 w-5" />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex flex-col bg-white dark:bg-neutral-950"
          >
            <div className="flex h-14 items-center justify-between border-b border-neutral-200 px-4 dark:border-neutral-800">
              <DocsLogo />
              <button
                onClick={() => setOpen(false)}
                className="rounded-md p-2 text-neutral-600 hover:bg-neutral-200 dark:text-neutral-400 dark:hover:bg-neutral-800"
              >
                <IconX className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex flex-1 flex-col gap-6 overflow-y-auto p-4">
              <SidebarSection
                title="Getting Started"
                links={gettingStartedLinks}
                onLinkClick={() => setOpen(false)}
              />
              <SidebarSection
                title="Products"
                links={productLinks}
                onLinkClick={() => setOpen(false)}
              />
              <SidebarSection
                title="Support"
                links={supportLinks}
                onLinkClick={() => setOpen(false)}
              />
            </nav>

            <div className="border-t border-neutral-200 p-4 dark:border-neutral-800">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 text-sm text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
              >
                <IconExternalLink className="h-4 w-4" />
                Back to website
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function DocsLogo() {
  return (
    <Link href="/docs" className="flex items-center gap-2">
      <Image
        src="/logo-white.svg"
        alt="Arclen"
        width={80}
        height={20}
        className="hidden dark:block"
      />
      <Image
        src="/logo-black.svg"
        alt="Arclen"
        width={80}
        height={20}
        className="block dark:hidden"
      />
      <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
        Docs
      </span>
    </Link>
  );
}

function SidebarSection({
  title,
  links,
  onLinkClick,
}: {
  title: string;
  links: DocLink[];
  onLinkClick?: () => void;
}) {
  return (
    <div>
      <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
        {title}
      </h3>
      <div className="flex flex-col gap-1">
        {links.map((link) => (
          <SidebarLink
            key={link.href}
            link={link}
            onClick={onLinkClick}
          />
        ))}
      </div>
    </div>
  );
}

function SidebarLink({
  link,
  onClick,
}: {
  link: DocLink;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const isActive = pathname === link.href;
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={link.href}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
        isActive
          ? "bg-primary/10 font-medium text-primary"
          : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
      )}
    >
      {hovered && !isActive && (
        <motion.div
          layoutId="hovered-doc-link"
          className="absolute inset-0 rounded-lg bg-neutral-200/50 dark:bg-neutral-800/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
      <span className="relative z-10">{link.icon}</span>
      <span className="relative z-10">{link.label}</span>
      {link.external && (
        <IconExternalLink className="relative z-10 ml-auto h-3 w-3 opacity-50" />
      )}
    </Link>
  );
}
