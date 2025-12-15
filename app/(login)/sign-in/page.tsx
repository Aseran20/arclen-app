import { Suspense } from 'react';
import { AuthForm } from '@/components/marketing/auth-form';
import { DivideX } from '@/components/marketing/divide';

export default function SignInPage() {
  return (
    <main>
      <DivideX />
      <Suspense>
        <AuthForm mode="signin" />
      </Suspense>
      <DivideX />
    </main>
  );
}
