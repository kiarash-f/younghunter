import { useState } from "react";
import { useLanguage } from "../../../context/useLanguageContext";
import Table from "../../../ui/Table";
import { TbPencilMinus } from "react-icons/tb";
import { FiLayers } from "react-icons/fi";
import Modal from "../../../ui/Modal";
import AlbumForm from "./AlbumForm";
import { HiOutlineTrash } from "react-icons/hi";
import ConfirmDelete from "../../../ui/ConfirmDelete";
import useDeleteAlbum from "../../../hooks/useDeleteAlbum";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function AlbumRow({ album, index }) {
  const { language } = useLanguage();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const { deleteAlbum, isRemoving } = useDeleteAlbum();

  return (
    <Table.Row>
      <td>{index + 1}</td>
      <td>{album.title.en}</td>
      <td>{album.title.fa}</td>
      <td>
        <Link to={`${album._id}/sub-albums`}>
          <button className="flex items-center justify-between btn w-32 bg-emerald-700">
            <span>{language === "en" ? "Sub Albums" : "زیر آلبوم ها"}</span>
            <FiLayers className="w-5 h-5" />
          </button>
        </Link>
      </td>
      <td className="flex items-center justify-center gap-x-8">
        <button
          className="flex items-center justify-between btn bg-cyan-600"
          onClick={() => setIsEditOpen(true)}
        >
          <span>{language === "en" ? "Edit" : "ویرایش"}</span>
          <TbPencilMinus className="w-5 h-5" />
        </button>

        <button
          className="flex items-center justify-between btn bg-red-600"
          onClick={() => setIsDeleteOpen(true)}
        >
          <span>{language === "en" ? "Delete" : "حذف کردن"}</span>
          <HiOutlineTrash className="w-5 h-5" />
        </button>
      </td>
      {isEditOpen && (
        <Modal
          title={language === "en" ? "Edit Album" : "ویرایش آلبوم"}
          onClose={() => setIsEditOpen(false)}
        >
          <AlbumForm albumToEdit={album} onClose={() => setIsEditOpen(false)} />
        </Modal>
      )}
      {isDeleteOpen && (
        <Modal
          title={language === "en" ? "Delete Album" : "حذف آلبوم"}
          onClose={() => setIsDeleteOpen(false)}
        >
          <ConfirmDelete
            englishTitle={album.title.en}
            persianTitle={album.title.fa}
            onClose={() => setIsDeleteOpen(false)}
            onConfirm={async () =>
              await deleteAlbum(album._id, {
                onSuccess: () => {
                  setIsDeleteOpen(false);
                  toast.success(
                    `${
                      language === "en"
                        ? `You deleted ${album.title.en} successfully!`
                        : `آلبوم ${album.title.fa} با موفقیت حذف شد!`
                    }`
                  );
                },
                onError: () => setIsDeleteOpen(false),
              })
            }
            isRemoving={isRemoving}
            disabled={false}
          />
        </Modal>
      )}
    </Table.Row>
  );
}

export default AlbumRow;
