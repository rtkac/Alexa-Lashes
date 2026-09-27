import logo from '/logo_primary.svg';
import { MenuToggle } from '@alexa-lashes/ui/components';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@alexa-lashes/ui/shadcn';
import { Link } from '@tanstack/react-router';
import { XIcon } from 'lucide-react';
import { useState } from 'react';

import LanguageSwitcher from './LanguageSwitcher';

import { m } from '@/paraglide/messages';

export const Header = () => {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  const links = [
    { to: '/', label: m.menu_home() },
    { to: '/about/', label: m.menu_about() },
    { to: '/prices/', label: m.menu_prices() },
    { to: '/training/', label: m.menu_trainings() },
    { to: '/gallery/', label: m.menu_gallery() },
    { to: '/contact/', label: m.menu_contact() },
  ] as const;

  return (
    <header className="z-2 w-full border-primary-light border-b">
      <nav>
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between p-4">
          <Link to="/" className="z-10 flex items-center space-x-3">
            <img src={logo} alt="Alexa Lashes Logo" width={42} height={36} />
            <span className="self-center whitespace-nowrap font-semibold text-foreground text-xl">
              Alexa Lashes
            </span>
          </Link>
          <button
            type="button"
            className="cursor-pointer md:hidden"
            aria-label={open ? m.menu_close() : m.menu_open()}
            aria-expanded={open}
            onClick={() => setOpen((prev) => !prev)}
          >
            <MenuToggle open={open} />
          </button>
          <div className="hidden md:flex md:items-center md:gap-8">
            <ul className="flex flex-row space-x-8 font-medium">
              {links.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="rounded-full px-3 py-1.5 text-base transition-colors hover:text-primary [&.active]:bg-primary-light [&.active]:font-semibold [&.active]:text-primary-strong"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <LanguageSwitcher />
          </div>
        </div>
      </nav>

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
              <span className="sr-only">{m.menu_close()}</span>
            </DrawerClose>
          </DrawerHeader>
          <ul className="flex flex-1 flex-col gap-1 overflow-y-auto p-4 font-medium">
            {links.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="block rounded-md px-3 py-2.5 text-lg transition-colors hover:bg-primary-light hover:text-primary [&.active]:bg-primary-light [&.active]:font-semibold [&.active]:text-primary-strong"
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="border-primary-light border-t p-4">
            <LanguageSwitcher />
          </div>
        </DrawerContent>
      </Drawer>
    </header>
  );
};
