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
      <main className="min-h-[calc(100vh-300px)] mx-auto max-w-6xl p-4">
        <button
          className="rounded p-2 border border-neutral-500 [&_svg]:mx-2 [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5 inline-flex items-center cursor-pointer hover:bg-neutral-100 bg-white"
          onClick={handleGoogleSignIn}
        >
          <GoogleIcon />
          Sign in with Google
        </button>
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
