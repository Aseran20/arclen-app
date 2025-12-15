import Link from "next/link";
import { Container } from "./container";
import { Logo } from "./logo";
import { SubHeading } from "./subheading";

export const Footer = () => {
  const product = [
    {
      title: "Excel - AI Bulk",
      href: "#",
    },
    {
      title: "Excel - AI Audit",
      href: "#",
    },
    {
      title: "PowerPoint - AI Audit",
      href: "#",
    },
  ];

  const company = [
    {
      title: "About",
      href: "/about",
    },
    {
      title: "Pricing",
      href: "/pricing",
    },
    {
      title: "Contact",
      href: "/contact",
    },
  ];

  const resources = [
    {
      title: "Who it's for",
      href: "#",
    },
    {
      title: "Security",
      href: "#",
    },
    {
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "FAQ",
      href: "/faq",
    },
  ];

  const legal = [
    {
      title: "Privacy Policy",
      href: "/privacy",
    },
    {
      title: "Terms of Service",
      href: "/terms",
    },
    {
      title: "Legal Notice",
      href: "/legal",
    },
  ];

  return (
    <Container>
      <div className="grid grid-cols-1 px-4 py-20 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7">
        <div className="mb-6 sm:col-span-2 md:col-span-4 lg:col-span-3">
          <Logo />
          <SubHeading as="p" className="mt-4 max-w-lg text-left">
            AI copilots for Excel & PowerPoint, built for M&A and finance teams
          </SubHeading>
        </div>
        <div className="col-span-1 mb-4 flex flex-col gap-2 md:col-span-1 md:mb-0">
          <p className="text-sm font-medium text-gray-600">Product</p>
          {product.map((item) => (
            <Link
              href={item.href}
              key={item.title}
              className="text-footer-link my-2 text-sm font-medium"
            >
              {item.title}
            </Link>
          ))}
        </div>
        <div className="col-span-1 mb-4 flex flex-col gap-2 md:col-span-1 md:mb-0">
          <p className="text-sm font-medium text-gray-600">Company</p>
          {company.map((item) => (
            <Link
              href={item.href}
              key={item.title}
              className="text-footer-link my-2 text-sm font-medium"
            >
              {item.title}
            </Link>
          ))}
        </div>
        <div className="col-span-1 mb-4 flex flex-col gap-2 md:col-span-1 md:mb-0">
          <p className="text-sm font-medium text-gray-600">Resources</p>
          {resources.map((item) => (
            <Link
              href={item.href}
              key={item.title}
              className="text-footer-link my-2 text-sm font-medium"
            >
              {item.title}
            </Link>
          ))}
        </div>
        <div className="col-span-1 mb-4 flex flex-col gap-2 md:col-span-1 md:mb-0">
          <p className="text-sm font-medium text-gray-600">Legal</p>
          {legal.map((item) => (
            <Link
              href={item.href}
              key={item.title}
              className="text-footer-link my-2 text-sm font-medium"
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
      <div className="my-4 flex flex-col items-center justify-between px-4 pt-8 md:flex-row">
        <p className="text-footer-link text-sm">
          © {new Date().getFullYear()} Arclen. All rights reserved.
        </p>
        <div className="mt-4 flex items-center gap-4 md:mt-0">
          <Link
            href="https://linkedin.com/company/arclen"
            target="_blank"
            rel="noopener noreferrer"
            className="text-footer-link transition-colors hover:text-gray-900"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect width="4" height="12" x="2" y="9" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </Link>
        </div>
      </div>
    </Container>
  );
};
