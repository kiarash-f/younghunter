import { useState } from "react";
import { HiOutlinePlus } from "react-icons/hi";
import ImageForm from "./ImageForm";
import { useLanguage } from "../../../context/useLanguageContext";
import Modal from "../../../ui/Modal";

function ImagesHeader({ sortImages, setSortImages }) {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4 mx-4 flex items-center justify-between flex-col md:flex-row gap-y-2 md:gap-y-0">
      <button
        className="btn flex items-center justify-between w-64 bg-green-600"
        onClick={() => setIsOpen(true)}
      >
        <span>{language === "en" ? "Add New Image" : "افزودن عکس جدید"}</span>
        <HiOutlinePlus className="w-5 h-5" />
      </button>
      <select
        name="preferSearch"
        className="appearance-none text-xs font-semibold px-3 md:w-40 w-64 border border-gray-400 focus:ring-transparent focus:border-gray-400 focus:outline-none rounded-xl shadow-md shadow-slate-800 transition-all duration-300 dark:bg-inherit dark:[&>option]:bg-zinc-950 dark:text-neutral-200 dark:border dark:border-gray100"
        value={sortImages}
        onChange={(e) => setSortImages(e.target.value)}
      >
        <option value="all">
          {language === "en" ? "All Images" : "همه عکس ها"}
        </option>
        <option value="carouselImages">
          {language === "en"
            ? "Based on Carousel Images"
            : "براساس عکس های کاروسل"}
        </option>
        <option value="not-carouselImages">
          {language === "en"
            ? "Based on Images not in  Carousel"
            : "براساس عکس های غیر از کاروسل"}
        </option>
      </select>
      {isOpen && (
        <Modal
          title={language === "en" ? "Create New Image" : "افزودن عکس جدید"}
          onClose={() => setIsOpen(false)}
        >
          <ImageForm onClose={() => setIsOpen(false)} />
        </Modal>
      )}
    </div>
  );
}

export default ImagesHeader;
