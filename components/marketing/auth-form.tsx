'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Input } from '@/components/marketing/ui/input';
import { Label } from '@/components/marketing/ui/label';
import { Button } from '@/components/marketing/button';
import { Loader2 } from 'lucide-react';
import { signIn, signUp } from '@/app/(login)/actions';
import { ActionState } from '@/lib/auth/middleware';
import { Container } from '@/components/marketing/container';
import { Logo } from '@/components/marketing/logo';
import { Heading } from '@/components/marketing/heading';
import { SubHeading } from '@/components/marketing/subheading';
import { AuthIllustration } from '@/components/marketing/auth-illustration';

export function AuthForm({ mode = 'signin' }: { mode?: 'signin' | 'signup' }) {
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');
  const priceId = searchParams.get('priceId');
  const inviteId = searchParams.get('inviteId');

  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    mode === 'signin' ? signIn : signUp,
    { error: '' }
  );

  return (
    <Container className="min-h-[calc(100vh-8rem)] py-10 md:py-20">
      <div className="grid grid-cols-1 gap-10 px-4 md:grid-cols-2 md:px-8 lg:gap-40">
        <div>
          <Logo />
          <Heading className="mt-4 text-left lg:text-4xl">
            {mode === 'signin' ? 'Welcome back!' : 'Get started today'}
          </Heading>
          <SubHeading as="p" className="mt-4 max-w-xl text-left">
            {mode === 'signin'
              ? 'Sign in to access your dashboard and manage your account'
              : 'Create an account to start building your SaaS product'
            }
          </SubHeading>

          <form action={formAction} className="mt-6 flex flex-col gap-8">
            <input type="hidden" name="redirect" value={redirect || ''} />
            <input type="hidden" name="priceId" value={priceId || ''} />
            <input type="hidden" name="inviteId" value={inviteId || ''} />

            <div className="h-full w-full rounded-2xl">
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                defaultValue={state.email}
                required
                maxLength={50}
                className="mt-4 border-none focus:ring-gray-300"
                placeholder="youremail@yourdomain.com"
              />
            </div>

            <div className="h-full w-full rounded-2xl">
              <Label>Password</Label>
              <Input
                type="password"
                name="password"
                defaultValue={state.password}
                required
                minLength={8}
                maxLength={100}
                className="mt-4 border-none focus:ring-gray-300"
                placeholder={mode === 'signin' ? 'Enter your password' : 'Create a password'}
                autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
              />
            </div>

            {state?.error && (
              <div className="text-red-500 text-sm">{state.error}</div>
            )}

            <Button type="submit" disabled={pending} className="w-full">
              {pending ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                  Loading...
                </>
              ) : mode === 'signin' ? (
                'Sign in'
              ) : (
                'Sign up'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <span className="text-sm text-gray-600">
              {mode === 'signin' ? "Don't have an account? " : "Already have an account? "}
            </span>
            <Link
              href={`${mode === 'signin' ? '/sign-up' : '/sign-in'}${
                redirect ? `?redirect=${redirect}` : ''
              }${priceId ? `&priceId=${priceId}` : ''}`}
              className="text-brand text-sm font-medium hover:underline"
            >
              {mode === 'signin' ? 'Sign up' : 'Sign in'}
            </Link>
          </div>
        </div>
        <AuthIllustration />
      </div>
    </Container>
  );
}
