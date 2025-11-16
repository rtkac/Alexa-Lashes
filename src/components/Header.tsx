import { Link } from "@tanstack/react-router";
import { useId, useState } from "react";

import LanguageSwitcher from "./LanguageSwitcher";

import { m } from "@/paraglide/messages";
import logo from "/logo.svg";

const Header = () => {
  const menuId = useId();
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full border-b border-primary-light">
      <nav>
        <div className="max-w-6xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/" className="flex items-center space-x-3">
            <img src={logo} alt="Alexa Lashes Logo" className="h-9" />
            <span className="self-center text-xl text-heading font-semibold whitespace-nowrap">
              Alexa Lashes
            </span>
          </Link>
          <button
            data-collapse-toggle={menuId}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary"
            aria-controls={menuId}
            aria-expanded="false"
            onClick={() => setOpen((prev) => !prev)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
                d="M5 7h14M5 12h14M5 17h14"
              />
            </svg>
          </button>
          <div className={`${open ? "block" : "hidden"} w-full md:flex md:w-auto`} id={menuId}>
            <ul className="font-medium md:flex text-center mt-4 md:mt-0 mr-0 md:mr-8 md:flex-row md:space-x-8 md:bg-neutral-primary">
              <li>
                <Link
                  to="/services"
                  className="block py-2 px-3 text-heading md:p-0 [&.active]:text-primary hover:text-primary"
                  aria-current="page"
                >
                  {m.menu_services()}
                </Link>
              </li>
              <li>
                <Link
                  to="/trainings"
                  className="block py-2 px-3 text-heading md:p-0 [&.active]:text-primary hover:text-primary"
                  aria-current="page"
                >
                  {m.menu_trainings()}
                </Link>
              </li>
              <li>
                <Link
                  to="/gallery"
                  className="block py-2 px-3 text-heading md:p-0 [&.active]:text-primary hover:text-primary"
                >
                  {m.menu_gallery()}
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="block py-2 px-3 text-heading md:p-0 [&.active]:text-primary hover:text-primary"
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
