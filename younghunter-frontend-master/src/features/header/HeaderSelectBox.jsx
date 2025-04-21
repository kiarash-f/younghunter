import { useEffect } from "react";
import { useLanguage } from "../../context/useLanguageContext";

function HeaderSelectBox() {
  const { language, changeLanguage, direction } = useLanguage();

  useEffect(() => {
    document.documentElement.setAttribute("dir", direction);
    document.documentElement.setAttribute("lang", language);
  }, [direction, language]);

  const changeLanguageHandler = (event) => {
    changeLanguage(event.target.value);
  };

  return (
    <select
      name="language"
      className="appearance-none text-sm font-semibold px-3 md:w-28 border border-gray-400 focus:ring-transparent focus:border-gray-400 focus:outline-none rounded-xl shadow-md shadow-slate-800 transition-all duration-300 dark:border-neutral-200 dark:shadow-transparent dark:bg-inherit dark:[&>option]:bg-zinc-950 w-full"
      value={language}
      onChange={changeLanguageHandler}
    >
      <option value="en">English</option>
      <option value="fa">فارسی</option>
    </select>
  );
}

export default HeaderSelectBox;
