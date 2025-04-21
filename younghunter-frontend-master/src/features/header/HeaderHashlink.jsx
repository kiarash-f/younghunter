import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

function HeaderHashlink({ children, to, onClose }) {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  const className = (hash) =>
    location.hash === hash ? `${hashLinkClass} text-black` : `${hashLinkClass}`;

  const hashLinkClass =
    "flex items-center transition-all duration-300 justify-center py-2 md:py-0 md:mt-0 mt-2 rounded-md md:hover:bg-inherit hover:bg-gray-500 md:bg-inherit hover:text-white md:hover:text-inherit md:dark:hover:bg-inherit dark:hover:bg-gray-500 dark:hover:text-white dark:text-neutral-200";

  return (
    <li>
      <HashLink smooth to={to} onClick={onClose} className={className(`${to}`)}>
        {children}
      </HashLink>
    </li>
  );
}

export default HeaderHashlink;
