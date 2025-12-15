"use client";

import { useState, Suspense } from "react";
import {
  IconChevronDown as ChevronDown,
  IconMenu2 as Menu,
  IconX as X,
  IconChevronRight as ChevronRight,
} from "@tabler/icons-react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { Logo } from "./logo";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./button";
import Link from "next/link";
import useSWR from "swr";

const products = [
  {
    title: "Excel - AI Bulk",
    desc: "Process multiple cells with AI",
    href: "#",
  },
  {
    title: "Excel - AI Audit",
    desc: "Audit spreadsheets automatically",
    href: "#",
  },
  {
    title: "PowerPoint - AI Audit",
    desc: "Review presentations with AI",
    href: "#",
  },
];

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function UserButton({ onClose }: { onClose?: () => void }) {
  const { data: user } = useSWR("/api/user", fetcher);

  if (!user) {
    return (
      <Button as={Link} href="/sign-up" onClick={onClose}>
        Start building
      </Button>
    );
  }

  return (
    <Button as={Link} href="/dashboard" variant="secondary" onClick={onClose}>
      Dashboard
    </Button>
  );
}

// Floating navbar that appears on scroll
function FloatingNav() {
  const [megaOpen, setMegaOpen] = useState(false);
  const { scrollY } = useScroll();
  const springConfig = {
    stiffness: 300,
    damping: 30,
  };
  const y = useSpring(
    useTransform(scrollY, [100, 120], [-100, 10]),
    springConfig
  );

  return (
    <motion.div
      style={{ y }}
      className="shadow-aceternity fixed inset-x-0 top-0 z-50 mx-auto hidden max-w-[calc(80rem-4rem)] items-center justify-between bg-white/80 px-4 py-2 backdrop-blur-sm md:flex xl:rounded-2xl dark:bg-neutral-900/80 dark:shadow-[0px_2px_0px_0px_var(--color-neutral-800),0px_-2px_0px_0px_var(--color-neutral-800)]"
    >
      <Logo />
      <nav className="flex items-center gap-2">
        {/* Products dropdown */}
        <div className="relative">
          <motion.button
            onMouseEnter={() => setMegaOpen(true)}
            onMouseLeave={() => setMegaOpen(false)}
            className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
            whileTap={{ scale: 0.97 }}
            whileHover={{ y: -1 }}
          >
            Products <ChevronDown size={16} />
          </motion.button>
          <AnimatePresence>
            {megaOpen && (
              <motion.div
                onMouseEnter={() => setMegaOpen(true)}
                onMouseLeave={() => setMegaOpen(false)}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="absolute top-full left-0 z-50 mt-2 w-80 rounded-xl border border-neutral-200 bg-white p-4 shadow-lg dark:border-neutral-700 dark:bg-neutral-900"
              >
                <p className="px-2 pb-2 text-xs font-medium uppercase text-neutral-500 dark:text-neutral-400">
                  Products
                </p>
                <ul className="grid gap-1">
                  {products.map((p) => (
                    <li key={p.title}>
                      <motion.a
                        href={p.href}
                        className="block rounded-md px-2 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                        whileHover={{ x: 2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                          {p.title}
                        </p>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">
                          {p.desc}
                        </p>
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Simple links */}
        <motion.a
          href="/who-its-for"
          className="rounded-md px-3 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.97 }}
        >
          Who it&apos;s for
        </motion.a>
        <motion.a
          href="/security"
          className="rounded-md px-3 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.97 }}
        >
          Security
        </motion.a>
        <motion.a
          href="/pricing"
          className="rounded-md px-3 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.97 }}
        >
          Pricing
        </motion.a>
      </nav>
      <div className="flex items-center gap-2">
        <ModeToggle />
        <Suspense
          fallback={
            <Button as={Link} href="/sign-up">
              Start building
            </Button>
          }
        >
          <UserButton />
        </Suspense>
      </div>
    </motion.div>
  );
}

// Desktop navbar (initial, before scroll)
function DesktopNav() {
  const [megaOpen, setMegaOpen] = useState(false);

  return (
    <div className="hidden items-center justify-between px-4 py-4 md:flex">
      <Logo />
      <nav className="flex items-center gap-2">
        {/* Products dropdown */}
        <div className="relative">
          <motion.button
            onMouseEnter={() => setMegaOpen(true)}
            onMouseLeave={() => setMegaOpen(false)}
            className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
            whileTap={{ scale: 0.97 }}
            whileHover={{ y: -1 }}
          >
            Products <ChevronDown size={16} />
          </motion.button>
          <AnimatePresence>
            {megaOpen && (
              <motion.div
                onMouseEnter={() => setMegaOpen(true)}
                onMouseLeave={() => setMegaOpen(false)}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="absolute top-full left-0 z-50 mt-2 w-80 rounded-xl border border-neutral-200 bg-white p-4 shadow-lg dark:border-neutral-700 dark:bg-neutral-900"
              >
                <p className="px-2 pb-2 text-xs font-medium uppercase text-neutral-500 dark:text-neutral-400">
                  Products
                </p>
                <ul className="grid gap-1">
                  {products.map((p) => (
                    <li key={p.title}>
                      <motion.a
                        href={p.href}
                        className="block rounded-md px-2 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                        whileHover={{ x: 2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                          {p.title}
                        </p>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">
                          {p.desc}
                        </p>
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Simple links */}
        <motion.a
          href="/who-its-for"
          className="rounded-md px-3 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.97 }}
        >
          Who it&apos;s for
        </motion.a>
        <motion.a
          href="/security"
          className="rounded-md px-3 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.97 }}
        >
          Security
        </motion.a>
        <motion.a
          href="/pricing"
          className="rounded-md px-3 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.97 }}
        >
          Pricing
        </motion.a>
      </nav>
      <div className="flex items-center gap-2">
        <ModeToggle />
        <Suspense
          fallback={
            <Button as={Link} href="/sign-up">
              Start building
            </Button>
          }
        >
          <UserButton />
        </Suspense>
      </div>
    </div>
  );
}

// Mobile navbar
function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex items-center justify-between p-2 md:hidden">
      <Logo />
      <motion.button
        aria-label="Toggle menu"
        className="inline-flex size-10 items-center justify-center rounded-md border border-neutral-200 hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
        onClick={() => setOpen((s) => !s)}
        whileTap={{ scale: 0.92 }}
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] h-full w-full bg-white shadow-lg dark:bg-neutral-900"
          >
            <div className="absolute right-4 bottom-4">
              <ModeToggle />
            </div>

            <div className="flex items-center justify-between p-2">
              <Logo />
              <motion.button
                onClick={() => setOpen(false)}
                className="inline-flex size-10 items-center justify-center rounded-md border border-neutral-200 hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
                aria-label="Close menu"
                whileTap={{ scale: 0.92 }}
              >
                <X size={20} />
              </motion.button>
            </div>

            <div className="mt-6 flex flex-col divide-y divide-neutral-200 border-t border-neutral-200 dark:divide-neutral-700 dark:border-neutral-700">
              {/* Products accordion */}
              <details className="px-3">
                <summary className="flex cursor-pointer list-none items-center justify-between rounded-md px-1 py-3 text-sm font-medium text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800">
                  <span>Products</span>
                  <ChevronDown size={16} />
                </summary>
                <div className="mb-2 rounded-lg border border-neutral-200 p-2 dark:border-neutral-700">
                  <ul className="grid gap-1">
                    {products.map((p, index) => (
                      <li key={p.title}>
                        <motion.a
                          href={p.href}
                          className="flex items-center justify-between rounded-md px-2 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2, delay: index * 0.1 }}
                          onClick={() => setOpen(false)}
                        >
                          <div className="min-w-0">
                            <p className="font-medium text-neutral-900 dark:text-neutral-100">
                              {p.title}
                            </p>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400">
                              {p.desc}
                            </p>
                          </div>
                          <ChevronRight
                            size={16}
                            className="ml-3 shrink-0 text-neutral-400"
                          />
                        </motion.a>
                      </li>
                    ))}
                  </ul>
                </div>
              </details>

              {/* Simple mobile links */}
              <Link
                href="/who-its-for"
                className="flex items-center justify-between px-4 py-3 text-sm font-medium text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
                onClick={() => setOpen(false)}
              >
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                >
                  Who it&apos;s for
                </motion.span>
                <ChevronRight size={16} className="text-neutral-400" />
              </Link>
              <Link
                href="/security"
                className="flex items-center justify-between px-4 py-3 text-sm font-medium text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
                onClick={() => setOpen(false)}
              >
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: 0.2 }}
                >
                  Security
                </motion.span>
                <ChevronRight size={16} className="text-neutral-400" />
              </Link>
              <Link
                href="/pricing"
                className="flex items-center justify-between px-4 py-3 text-sm font-medium text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
                onClick={() => setOpen(false)}
              >
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: 0.3 }}
                >
                  Pricing
                </motion.span>
                <ChevronRight size={16} className="text-neutral-400" />
              </Link>

              {/* CTA */}
              <div className="mt-4 p-4">
                <Suspense
                  fallback={
                    <Button as={Link} href="/sign-up" onClick={() => setOpen(false)}>
                      Start building
                    </Button>
                  }
                >
                  <UserButton onClose={() => setOpen(false)} />
                </Suspense>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Navbar() {
  return (
    <nav>
      <FloatingNav />
      <DesktopNav />
      <MobileNav />
    </nav>
  );
}
