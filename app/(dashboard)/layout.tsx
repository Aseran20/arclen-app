"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import {
  IconUsers,
  IconSettings,
  IconShield,
  IconActivity,
  IconCreditCard,
  IconHome,
} from "@tabler/icons-react";
import {
  Sidebar,
  SidebarBody,
  SidebarLink,
} from "@/components/ui/collapsible-sidebar";
import { ModeToggle } from "@/components/marketing/mode-toggle";
import { NavUser } from "@/components/dashboard/nav-user";

const accountLinks = [
  {
    label: "Team Settings",
    href: "/dashboard",
    icon: (
      <IconUsers className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
  {
    label: "General",
    href: "/dashboard/general",
    icon: (
      <IconSettings className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
  {
    label: "Security",
    href: "/dashboard/security",
    icon: (
      <IconShield className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
  {
    label: "Activity",
    href: "/dashboard/activity",
    icon: (
      <IconActivity className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
];

const billingLinks = [
  {
    label: "Subscription",
    href: "/subscription",
    icon: (
      <IconCreditCard className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
];

const otherLinks = [
  {
    label: "Back to Home",
    href: "/",
    icon: (
      <IconHome className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
];

function Logo({ open }: { open: boolean }) {
  return (
    <Link
      href="/"
      className="relative z-20 flex items-center space-x-2 px-2 py-1 text-sm font-normal"
    >
      {open ? (
        <>
          <Image
            src="/logo-white.svg"
            alt="Arclen"
            width={90}
            height={24}
            className="hidden dark:block"
          />
          <Image
            src="/logo-black.svg"
            alt="Arclen"
            width={90}
            height={24}
            className="block dark:hidden"
          />
        </>
      ) : (
        <>
          <Image
            src="/favicon-white-180x180.svg"
            alt="Arclen"
            width={24}
            height={24}
            className="hidden dark:block"
          />
          <Image
            src="/favicon-black-180x180.svg"
            alt="Arclen"
            width={24}
            height={24}
            className="block dark:hidden"
          />
        </>
      )}
    </Link>
  );
}

function SidebarLabel({ children, open }: { children: React.ReactNode; open: boolean }) {
  if (!open) return null;
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="px-2 text-xs font-medium text-neutral-500 dark:text-neutral-400"
    >
      {children}
    </motion.span>
  );
}

function DashboardSidebar() {
  const [open, setOpen] = useState(true);
  const pathname = usePathname();

  return (
    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody className="justify-between gap-10">
        <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
          <Logo open={open} />

          <div className="mt-8 flex flex-col gap-1">
            <SidebarLabel open={open}>Account</SidebarLabel>
            {accountLinks.map((link, idx) => (
              <SidebarLink
                key={idx}
                link={link}
                active={pathname === link.href}
              />
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-1">
            <SidebarLabel open={open}>Billing</SidebarLabel>
            {billingLinks.map((link, idx) => (
              <SidebarLink
                key={idx}
                link={link}
                active={pathname === link.href}
              />
            ))}
          </div>

          <div className="mt-4">
            <div className="h-px w-full bg-neutral-200 dark:bg-neutral-700" />
          </div>

          <div className="mt-4 flex flex-col gap-1">
            {otherLinks.map((link, idx) => (
              <SidebarLink
                key={idx}
                link={link}
                active={pathname === link.href}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <NavUser />
        </div>
      </SidebarBody>
    </Sidebar>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-gray-100 md:flex-row dark:bg-neutral-800">
      <DashboardSidebar />
      <div className="m-2 flex flex-1 flex-col overflow-hidden">
        <div className="flex h-full w-full flex-1 flex-col rounded-2xl border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900">
          <header className="flex h-14 shrink-0 items-center justify-end border-b border-neutral-200 px-4 dark:border-neutral-700">
            <ModeToggle />
          </header>
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
