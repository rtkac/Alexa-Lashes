import logo from '/logo_primary.svg';
import { MenuToggle } from '@alexa-lashes/ui/components';
import {
  Button,
  buttonVariants,
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
import { whatsAppNumber } from '@/types';

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
    <header className="z-2 w-full border-primary-line border-b">
      <nav>
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 p-4 sm:gap-4">
          <Link to="/" className="z-10 flex shrink-0 items-center gap-2.5 sm:gap-3">
            <img src={logo} alt="Alexa Lashes Logo" width={42} height={36} />
            <span className="self-center whitespace-nowrap font-semibold text-foreground text-lg max-[23rem]:hidden sm:text-xl">
              Alexa Lashes
            </span>
          </Link>
          <div className="hidden lg:flex lg:items-center lg:gap-4">
            <ul className="flex flex-row items-center gap-1 font-medium">
              {links.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="rounded-full px-3 py-1.5 text-base transition-colors hover:text-primary-strong [&.active]:bg-primary-light [&.active]:font-semibold [&.active]:text-primary-strong"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <LanguageSwitcher />
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <a href={whatsAppNumber} className={buttonVariants({ size: 'sm' })}>
              {m.header_book()}
              <span className="sr-only"> {m.link_whatsapp()}</span>
            </a>
            <Button
              variant="ghost"
              size="icon"
              className="-mr-3 lg:hidden"
              aria-label={open ? m.menu_close() : m.menu_open()}
              aria-expanded={open}
              onClick={() => setOpen((prev) => !prev)}
            >
              <MenuToggle open={open} />
            </Button>
          </div>
        </div>
      </nav>

      <Drawer open={open} onOpenChange={setOpen} swipeDirection="right">
        <DrawerContent className="w-full max-w-xs">
          <DrawerHeader className="flex-row items-center justify-between border-primary-line border-b">
            <div className="flex items-center gap-2.5">
              <img src={logo} alt="" width={42} height={36} />
              <DrawerTitle className="font-semibold [font-family:inherit] text-foreground text-lg tracking-normal">
                Alexa Lashes
              </DrawerTitle>
            </div>
            <DrawerClose render={<Button variant="ghost" size="icon" />}>
              <XIcon className="size-5" />
              <span className="sr-only">{m.menu_close()}</span>
            </DrawerClose>
          </DrawerHeader>
          <ul className="flex flex-1 flex-col gap-1 overflow-y-auto p-4 font-medium">
            {links.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="block rounded-md px-3 py-2.5 text-lg no-underline transition-colors hover:bg-primary-light hover:text-primary-strong [&.active]:bg-primary-light [&.active]:font-semibold [&.active]:text-primary-strong"
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="border-primary-line border-t p-4">
            <LanguageSwitcher />
          </div>
        </DrawerContent>
      </Drawer>
    </header>
  );
};
