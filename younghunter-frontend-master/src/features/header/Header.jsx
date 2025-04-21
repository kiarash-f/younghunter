import { useState } from "react";
import { Link } from "react-router-dom";
import HeaderNavlink from "./HeaderNavlink";
import HeaderSelectBox from "./HeaderSelectBox";
import Authentication from "./Authentication";
import HeaderOffcanvas from "./HeaderOffcanvas";
import HeaderHashlink from "./HeaderHashlink";
import { useLanguage } from "../../context/useLanguageContext";
import ThemeMode from "../../ui/ThemeMode";
import { useAdmin } from "../../context/useAdminContext";
import AdminAccess from "../admin/AdminAccess";

function Header() {
  const [open, setOpen] = useState(false);
  const { language } = useLanguage();
  const { isAdmin } = useAdmin();

  return (
    <>
      <div
        className="flex border-black border-b-2 dark:border-neutral-200 items-center justify-between dark:bg-zinc-950 dark:text-neutral-200 transition-all duration-300"
        style={{ direction: "ltr" }}
      >
        <div className="flex items-center gap-x-4">
          <button className="w-24">
            <Link to="/">
              <img src="/logo demo.jpg" alt="" />
            </Link>
          </button>
          <h5 className="md:text-4xl text-sm sm:text-2xl tracking-wide font-headerFont font-bold">
            Y O U N G H U N T E R
          </h5>
        </div>
        <div className="flex items-center mr-11 md:mr-10">
          <ThemeMode />
        </div>
      </div>
      <div className="md:border-b dark:border-neutral-200 md:border-black md:border-opacity-20 md:pt-2 dark:bg-zinc-950 dark:text-neutral-200 transition-all duration-300">
        <div className="flex flex-wrap items-center justify-between">
          <button
            data-testid="navbar-default"
            className="absolute top-4 right-1 p-2 w-10 h-10 text-2xl text-gray-700 dark:text-neutral-200 md:hidden focus:outline-none"
            style={{ direction: "ltr" }}
            aria-controls="navbar-default"
            aria-expanded="false"
            onClick={() => setOpen(!open)}
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <ul className="hidden md:flex md:flex-row items-center gap-x-12 text-xl ml-2">
            <HeaderNavlink to="/">
              <span>{language === "en" ? "Home" : "صفحه اصلی"}</span>
            </HeaderNavlink>
            <HeaderNavlink to="/albums">
              <span>{language === "en" ? "Gallery" : "گالری"}</span>
            </HeaderNavlink>
            <HeaderHashlink to="/#about">
              <span>{language === "en" ? "Contact" : "تماس با ما"}</span>
            </HeaderHashlink>
            <HeaderHashlink to="/#about">
              <span>{language === "en" ? "About" : "درباره ما"}</span>
            </HeaderHashlink>
          </ul>
          <div className="md:flex hidden items-center justify-center gap-x-4 mb-2 relative px-4">
            <HeaderSelectBox onClose={() => setOpen(false)} />
            <Authentication />
            {isAdmin && <AdminAccess />}
          </div>
          <HeaderOffcanvas open={open} onClose={() => setOpen(false)} />
        </div>
      </div>
    </>
  );
}

export default Header;
