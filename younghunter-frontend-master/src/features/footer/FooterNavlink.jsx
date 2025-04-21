import { NavLink } from "react-router-dom";

function FooterNavlink({ to, children }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navlinkClass =
    "transition-all duration-300 w-36 mx-auto items-center justify-center py-1.5 flex rounded-md";

  return (
      <NavLink
        onClick={scrollToTop}
        to={to}
        className={({ isActive }) =>
          isActive
            ? `${navlinkClass} bg-neutral-200 dark:bg-black`
            : `${navlinkClass} dark:text-black`
        }
      >
        {children}
      </NavLink>
  );
}

export default FooterNavlink;
