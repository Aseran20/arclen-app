import { Suspense } from "react";
import { cookies } from "next/headers";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Force dynamic rendering by reading cookies (auth check)
  await cookies();

  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardShell>{children}</DashboardShell>
    </Suspense>
  );
}

function DashboardSkeleton() {
  return (
    <div className="flex h-screen w-full bg-gray-100 dark:bg-neutral-800">
      <div className="w-64 bg-neutral-100 dark:bg-neutral-900" />
      <div className="flex-1 p-2">
        <div className="h-full rounded-2xl border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900" />
      </div>
    </div>
  );
}
