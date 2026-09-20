import { signIn } from '@alexa-lashes/auth/client';
import { getSession } from '@alexa-lashes/auth/server';
import { GoogleIcon } from '@alexa-lashes/ui/icons';
import { createFileRoute } from '@tanstack/react-router';

import { Header } from '@/components/Header';

function RouteComponent() {
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
          <div className="rounded-md border border-primary-light bg-white p-6 dark:border-tertiary-light dark:bg-tertiary space-y-5">
            <h1 className="font-bold text-xl md:text-2xl">Welcome to Alexa Lashes Admin</h1>
            <p>Please sign in with your Google account to access the admin dashboard.</p>
            <button
              className="rounded p-2 pr-4 border border-neutral-500 [&_svg]:mx-2 [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5 inline-flex items-center cursor-pointer hover:bg-neutral-100 bg-white"
              onClick={handleGoogleSignIn}
            >
              <GoogleIcon />
              Sign in with Google
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async () => {
    const session = await getSession();
    if (session) {
      throw Route.redirect({ to: '/dashboard' });
    }
  },
  component: RouteComponent,
});
