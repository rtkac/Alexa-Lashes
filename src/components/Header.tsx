import { Link } from "@tanstack/react-router";
import { useId, useState } from "react";

import LanguageSwitcher from "./LanguageSwitcher";

import { cn } from "@/lib/utils";
import { m } from "@/paraglide/messages";
import logo from "/logo.svg";

const Header = () => {
  const menuId = useId();
  const [open, setOpen] = useState(false);

  const closeMenu = () => {
    if (open) {
      setOpen(false);
    }
  };

  return (
    <header className={cn("w-full border-primary-light border-b", { "fixed md:relative": open })}>
      <nav>
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between p-4">
          <Link to="/" className="z-10 flex items-center space-x-3" onClick={closeMenu}>
            <img src={logo} alt="Alexa Lashes Logo" className="h-9" />
            <span className="self-center whitespace-nowrap font-semibold text-heading text-xl">
              Alexa Lashes
            </span>
          </Link>
          <button
            type="button"
            className="relative z-10 h-10 w-10 cursor-pointer rounded bg-primary focus:outline-none md:hidden"
            onClick={() => setOpen((prev) => !prev)}
          >
            <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-4.5 block w-5 transform">
              <span
                className={cn(
                  "absolute block h-0.5 w-6 transform bg-current text-white transition duration-250 ease-in-out",
                  { "rotate-45": open, "-translate-y-1.5": !open },
                )}
              ></span>
              <span
                className={cn(
                  "absolute block h-0.5 w-6 transform bg-current text-white transition duration-250 ease-in-out",
                  { "opacity-0": open },
                )}
              ></span>
              <span
                className={cn(
                  "absolute block h-0.5 w-6 transform bg-current text-white transition duration-250 ease-in-out",
                  { "-rotate-45": open, "translate-y-1.5": !open },
                )}
              ></span>
            </div>
          </button>
          <div
            className={cn("w-full md:flex md:w-auto md:pt-0", {
              "fixed top-0 left-0 h-full bg-background pt-18 md:relative md:bg-transparent": open,
              hidden: !open,
            })}
            id={menuId}
          >
            <ul
              className={cn(
                "border-primary-light border-t text-center font-medium md:mt-0 md:mr-20 md:flex md:flex-row md:space-x-8 md:border-0 md:bg-neutral-primary",
                { "mb-10 space-y-5 pt-10 md:mb-0 md:space-y-0 md:pt-0": open },
              )}
            >
              <li>
                <Link
                  to="/services"
                  className="block px-3 py-2 text-xl hover:text-primary md:p-0 md:text-base [&.active]:text-primary"
                  onClick={closeMenu}
                >
                  {m.menu_services()}
                </Link>
              </li>
              <li>
                <Link
                  to="/trainings"
                  className="block px-3 py-2 text-xl hover:text-primary md:p-0 md:text-base [&.active]:text-primary"
                  onClick={closeMenu}
                >
                  {m.menu_trainings()}
                </Link>
              </li>
              <li>
                <Link
                  to="/gallery"
                  className="block px-3 py-2 text-xl hover:text-primary md:p-0 md:text-base [&.active]:text-primary"
                  onClick={closeMenu}
                >
                  {m.menu_gallery()}
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="block px-3 py-2 text-xl hover:text-primary md:p-0 md:text-base [&.active]:text-primary"
                  onClick={closeMenu}
                >
                  {m.menu_contact()}
                </Link>
              </li>
            </ul>
            <LanguageSwitcher />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
