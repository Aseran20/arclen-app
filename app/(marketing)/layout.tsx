import { Navbar } from '@/components/marketing/navbar';
import { Footer } from '@/components/marketing/footer';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-full bg-white antialiased dark:bg-black">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}
