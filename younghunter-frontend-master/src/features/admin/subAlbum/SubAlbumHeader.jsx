import { useState } from "react";
import { useLanguage } from "../../../context/useLanguageContext";
import Modal from "../../../ui/Modal";
import { HiOutlinePlus } from "react-icons/hi";
import SubAlbumForm from "./SubAlbumForm";

function SubAlbumsHeader({ album }) {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4 mx-4">
      <button
        className="btn flex items-center justify-between w-48 bg-green-600"
        onClick={() => setIsOpen(true)}
      >
        <span>{language === "en" ? "Add New Sub Album" : "افزودن زیر آلبوم جدید"}</span>
        <HiOutlinePlus className="w-5 h-5" />
      </button>
      {isOpen && (
        <Modal
          title={language === "en" ? "Create New Sub Album" : "افزودن زیر آلبوم جدید"}
          onClose={() => setIsOpen(false)}
        >
          <SubAlbumForm onClose={() => setIsOpen(false)} album={album} />
        </Modal>
      )}
    </div>
  );
}

export default SubAlbumsHeader;
