import { useLanguage } from "../../context/useLanguageContext";
import { useSorting } from "../../context/useSortingContext";

function GallerySortSelectBox() {
  const { language } = useLanguage();
  const { sortOption, setSortOption } = useSorting()

  return (
    <select
      name="preferSearch"
      className="appearance-none text-xs font-semibold px-3 md:w-40 border border-gray-400 focus:ring-transparent focus:border-gray-400 focus:outline-none rounded-xl shadow-md shadow-slate-800 transition-all duration-300 dark:bg-inherit dark:[&>option]:bg-zinc-950 w-full dark:text-neutral-200 dark:border dark:border-gray100"
      value={sortOption}
      onChange={(e) => setSortOption(e.target.value)}
    >
      <option value="new">
        {language === "en" ? "Based on Newest" : "براساس جدید ترین"}
      </option>
      <option value="old">
        {language === "en" ? "Based on Oldest" : "براساس قدیمی ترین"}
      </option>
    </select>
  );
}

export default GallerySortSelectBox;
