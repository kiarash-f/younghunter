import { useState } from "react";
import { useLanguage } from "../../../context/useLanguageContext";
import Modal from "../../../ui/Modal";
import AlbumForm from "./AlbumForm";
import { HiOutlinePlus } from "react-icons/hi";

function AlbumsHeader() {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4 mx-4">
      <button
        className="btn flex items-center justify-between w-44 bg-green-600"
        onClick={() => setIsOpen(true)}
      >
        <span>{language === "en" ? "Add New Album" : "افزودن آلبوم جدید"}</span>
        <HiOutlinePlus className="w-5 h-5" />
      </button>
      {isOpen && (
        <Modal
          title={language === "en" ? "Create New Album" : "افزودن آلبوم جدید"}
          onClose={() => setIsOpen(false)}
        >
          <AlbumForm onClose={() => setIsOpen(false)} />
        </Modal>
      )}
    </div>
  );
}

export default AlbumsHeader;
