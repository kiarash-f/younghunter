import { useState } from "react";
import { useLanguage } from "../../../../context/useLanguageContext";
import { HiOutlinePlus } from "react-icons/hi";
import AddImage from "./AddImage";
import AccessModal from "../../../../ui/AccessModal";

function ImageHeader({ subAlbum, album }) {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4 mx-4">
      <button
        className="btn flex items-center justify-between w-64 bg-green-600"
        onClick={() => setIsOpen(true)}
      >
        <span>
          {language === "en"
            ? "Add Image to Sub album"
            : "افزودن عکس به زیر آلبوم"}
        </span>
        <HiOutlinePlus className="w-5 h-5" />
      </button>
      {isOpen && (
        <AccessModal
          title={
            language === "en"
              ? "Add Image to Sub Album"
              : "افزودن عکس به زیر آلبوم"
          }
          onClose={() => setIsOpen(false)}
        >
          <AddImage subAlbum={subAlbum} album={album} />
        </AccessModal>
      )}
    </div>
  );
}

export default ImageHeader;
