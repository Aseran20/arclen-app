import { getSEOTags } from "@/lib/seo";

export const metadata = getSEOTags({
  title: "Playground | Arclen",
  description: "Component playground for testing",
});

export default function PlaygroundPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Playground</h1>
        <p className="text-muted-foreground">
          Component testing page - work in progress
        </p>
      </div>
    </div>
  );
}
