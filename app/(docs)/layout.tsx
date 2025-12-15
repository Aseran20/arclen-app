import { DocsLayout } from "@/components/docs/docs-sidebar";

export default function DocsRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DocsLayout>{children}</DocsLayout>;
}
