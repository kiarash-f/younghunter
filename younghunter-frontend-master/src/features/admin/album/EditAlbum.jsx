import { useLanguage } from "../../../context/useLanguageContext";
import Modal from "../../../ui/Modal";
import AlbumForm from "./AlbumForm";

function EditAlbum({ openModal, setOpenModal }) {
  const { language } = useLanguage();

  return (
    <>
      <button
        className="bg-cyan-600 adminRoleBtn max-w-40"
        onClick={() => setOpenModal(true)}
      >
        {language === "en" ? "Edit Album" : "ادیت کردن آلبوم"}
      </button>
      {openModal && (
        <Modal
          title={
            openModal && language === "en" ? "Edit Album" : "ادیت کردن آلبوم"
          }
          onClose={() => setOpenModal(false)}
        >
          <AlbumForm onClose={() => setOpenModal(false)} />
        </Modal>
      )}
    </>
  );
}

export default EditAlbum;
