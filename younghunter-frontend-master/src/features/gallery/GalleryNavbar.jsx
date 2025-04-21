import { useGalleryContext } from "../../context/useGalleryContext";
import { useLanguage } from "../../context/useLanguageContext";
import GallerySortSelectBox from "./GallerySortSelectBox";
import { PiMagnifyingGlassBold } from "react-icons/pi";

function GalleryNavbar() {
  const { value, setValue, handleSearch } = useGalleryContext();
  const { language } = useLanguage();

  return (
    <div className="flex items-center justify-center w-[50%] mx-auto md:flex-row flex-col-reverse md:gap-x-14 mb-1.5">
      <GallerySortSelectBox />
      <div className="md:w-[50%] w-full relative mx-auto">
        <input
          type="text"
          placeholder={`${language === "en" ? "Search..." : "جستجو ..."}`}
          className="my-2 rounded-xl w-full bg-neutral-200 text-black hover:border-blue-500 focus:border-blue-500  transition-all duration-300 ease-out  focus:shadow-slate-950 focus:shadow-md placeholder-black placeholder-opacity-70 dark:bg-neutral-200 dark:placeholder-white dark:placeholder-opacity-60 shadow-md shadow-slate-900 dark:bg-transparent dark:border dark:border-gray-100 dark:text-neutral-200"
          value={value}
          onChange={(e) => {
            setValue(e.target.value), handleSearch();
          }}
        />
        <button
          className={`absolute top-2 py-1.5  dark:text-neutral-200 ${
            language === "en" ? "right-1 rounded-r-lg" : "left-1 rounded-l-xl"
          }`}
        >
          <PiMagnifyingGlassBold className="size-7" />
        </button>
      </div>
    </div>
  );
}

export default GalleryNavbar;
