import logo from '/logo_primary.svg';
import { signOut } from '@alexa-lashes/auth/client';
import { MenuToggle } from '@alexa-lashes/ui/components';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@alexa-lashes/ui/shadcn';
import { Link, useNavigate } from '@tanstack/react-router';
import { XIcon } from 'lucide-react';
import { startTransition, useState } from 'react';

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
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <header className="z-2 w-full border-primary-light border-b">
      <nav>
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between p-4">
          <a href="https://alexalashes.sk/" className="z-10 flex items-center space-x-3">
            <img src={logo} alt="Alexa Lashes Logo" width={42} height={36} />
            <span className="self-center whitespace-nowrap font-semibold text-foreground text-xl dark:text-primary">
              Alexa Lashes
            </span>
          </a>
          {user && (
            <div className="flex items-center gap-3">
              <div className="flex items-center md:hidden">
                <AvatarDropdown name={user.name} image={user.image ?? undefined} />
              </div>
              <button
                type="button"
                className="cursor-pointer md:hidden"
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
                onClick={() => setOpen((prev) => !prev)}
              >
                <MenuToggle open={open} />
              </button>
              <ul className="hidden items-center gap-8 font-medium md:flex">
                <li>
                  <Link
                    to="/dashboard"
                    className="text-base transition-colors hover:text-primary [&.active]:text-primary"
                    activeOptions={{ exact: true }}
                  >
                    Dashboard
                  </Link>
                </li>
                <li className="flex items-center">
                  <AvatarDropdown name={user.name} image={user.image ?? undefined} />
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>

      {user && (
        <Drawer open={open} onOpenChange={setOpen} swipeDirection="right">
          <DrawerContent className="w-full max-w-xs">
            <DrawerHeader className="flex-row items-center justify-between border-primary-light border-b">
              <DrawerTitle className="text-lg">Alexa Lashes</DrawerTitle>
              <DrawerClose
                render={
                  <button
                    type="button"
                    className="cursor-pointer rounded-full p-2 text-primary transition-colors hover:bg-primary-light"
                  />
                }
              >
                <XIcon className="size-5" />
                <span className="sr-only">Close menu</span>
              </DrawerClose>
            </DrawerHeader>
            <ul className="flex flex-1 flex-col gap-1 overflow-y-auto p-4 font-medium">
              <li>
                <Link
                  to="/dashboard"
                  className="block rounded-md px-3 py-2.5 text-lg transition-colors hover:bg-primary-light hover:text-primary [&.active]:text-primary"
                  activeOptions={{ exact: true }}
                  onClick={closeMenu}
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </DrawerContent>
        </Drawer>
      )}
    </header>
  );
};
