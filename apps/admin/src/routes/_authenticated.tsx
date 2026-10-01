import { signIn } from '@alexa-lashes/auth/client';
import { getSession } from '@alexa-lashes/auth/server';
import { GoogleIcon } from '@alexa-lashes/ui/icons';
import { Button } from '@alexa-lashes/ui/shadcn';
import { createFileRoute } from '@tanstack/react-router';

import { Header } from '@/components/Header';

const RouteComponent = () => {
  const handleGoogleSignIn = async () => {
    await signIn.social({
      provider: 'google',
    });
  };

  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-300px)] mx-auto max-w-6xl p-4 mt-6">
        <div className="lg:grid lg:grid-cols-2">
          <div className="card p-6 space-y-5">
            <h1 className="font-bold text-xl md:text-2xl">Welcome to Alexa Lashes Admin</h1>
            <p>Please sign in with your Google account to access the admin dashboard.</p>
            <Button variant="outline" onClick={handleGoogleSignIn}>
              <GoogleIcon className="size-5" />
              Sign in with Google
            </Button>
          </div>
        </div>
      </main>
    </>
  );
};

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async () => {
    const session = await getSession();
    if (session) {
      throw Route.redirect({ to: '/dashboard' });
    }
  },
  component: RouteComponent,
});
