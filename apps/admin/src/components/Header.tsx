import logo from '/logo_primary.svg';
import { signOut } from '@alexa-lashes/auth/client';
import { cn } from '@alexa-lashes/ui/lib/utils';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@alexa-lashes/ui/shadcn';
import { Link, useNavigate } from '@tanstack/react-router';
import { startTransition, useId, useState } from 'react';

type AvatarDropdownProps = {
  name: string;
  image?: string;
};

const AvatarDropdown = ({ name, image }: AvatarDropdownProps) => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    startTransition(async () => {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            navigate({ to: '/' });
          },
        },
      });
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button>
            <Avatar>
              <AvatarImage src={image} alt={name} />
              <AvatarFallback>{name[0]}</AvatarFallback>
            </Avatar>
          </button>
        }
      >
        Open
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => navigate({ to: '/dashboard/profile' })}>
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSignOut}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

type HeaderProps = {
  user?: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    emailVerified: boolean;
    name: string;
    image?: string | null | undefined;
  };
};
export const Header = ({ user }: HeaderProps) => {
  const menuId = useId();
  const [open, setOpen] = useState(false);

  const closeMenu = () => {
    if (open) {
      setOpen(false);
    }
  };

  return (
    <header
      className={cn('z-2 w-full border-primary-light border-b', { 'fixed md:relative': open })}
    >
      <nav>
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between p-4">
          <a
            href="https://alexalashes.sk/"
            className="z-10 flex items-center space-x-3"
            onClick={closeMenu}
          >
            <img src={logo} alt="Alexa Lashes Logo" width={42} height={36} />
            <span className="self-center whitespace-nowrap font-semibold text-heading text-xl dark:text-primary">
              Alexa Lashes
            </span>
          </a>
          <div className="flex items-center gap-6">
            {user && (
              <div className="flex items-center md:hidden z-1">
                <AvatarDropdown name={user.name} image={user.image ?? undefined} />
              </div>
            )}
            <button
              type="button"
              className="relative z-10 h-10 w-10 cursor-pointer rounded bg-primary focus:outline-none md:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls={menuId}
              onClick={() => setOpen((prev) => !prev)}
            >
              <div className="absolute top-1/2 left-4.5 block w-5 -translate-x-1/2 -translate-y-1/2 transform">
                <span
                  className={cn(
                    'absolute block h-0.5 w-6 transform bg-current text-white transition duration-250 ease-in-out',
                    { 'rotate-45': open, '-translate-y-1.5': !open },
                  )}
                ></span>
                <span
                  className={cn(
                    'absolute block h-0.5 w-6 transform bg-current text-white transition duration-250 ease-in-out',
                    { 'opacity-0': open },
                  )}
                ></span>
                <span
                  className={cn(
                    'absolute block h-0.5 w-6 transform bg-current text-white transition duration-250 ease-in-out',
                    { '-rotate-45': open, 'translate-y-1.5': !open },
                  )}
                ></span>
              </div>
            </button>
          </div>
          <div
            className={cn('w-full md:flex md:w-auto md:pt-0', {
              'fixed top-0 left-0 h-full bg-background pt-18 md:relative md:bg-transparent': open,
              hidden: !open,
            })}
            id={menuId}
          >
            {user && (
              <ul
                className={cn(
                  'border-primary-light border-t text-center font-medium md:mt-0 md:flex md:flex-row md:space-x-8 md:border-0 md:bg-neutral-primary',
                  { 'mb-10 space-y-5 pt-10 md:mb-0 md:space-y-0 md:pt-0': open },
                )}
              >
                <li className="flex items-center">
                  <Link
                    to="/dashboard"
                    className="block px-3 py-2 text-xl hover:text-primary md:p-0 md:text-base [&.active]:text-primary"
                    activeOptions={{ exact: true }}
                    onClick={closeMenu}
                  >
                    Dashboard
                  </Link>
                </li>
                <li className="md:flex items-center hidden">
                  <AvatarDropdown name={user.name} image={user.image ?? undefined} />
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};
