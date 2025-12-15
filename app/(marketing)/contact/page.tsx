import { Contact } from "@/components/marketing/contact";
import { DivideX } from "@/components/marketing/divide";
import { SignUp } from "@/components/marketing/sign-up";

import { getSEOTags } from "@/lib/seo";

export const metadata = getSEOTags({
  title: "Sign Up | Nodus",
  description:
    "Sign up for Nodus and start building your own autonomous agents today.",
});

export default function SignupPage() {
  return (
    <main>
      <DivideX />
      <Contact />
      <DivideX />
    </main>
  );
}
