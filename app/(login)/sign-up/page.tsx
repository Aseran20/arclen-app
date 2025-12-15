import { Suspense } from 'react';
import { AuthForm } from '@/components/marketing/auth-form';
import { DivideX } from '@/components/marketing/divide';

export default function SignUpPage() {
  return (
    <main>
      <DivideX />
      <Suspense>
        <AuthForm mode="signup" />
      </Suspense>
      <DivideX />
    </main>
  );
}
