import { useState } from "react";
import Table from "../../../ui/Table";
import { useLanguage } from "../../../context/useLanguageContext";
import { TbPencilMinus } from "react-icons/tb";
import { HiOutlineTrash } from "react-icons/hi";
import { SiMake } from "react-icons/si";
import Modal from "../../../ui/Modal";
import SubAlbumForm from "./SubAlbumForm";
import ConfirmDelete from "../../../ui/ConfirmDelete";
import toast from "react-hot-toast";
import useDeleteSubAlbum from "../../../hooks/useDeleteSubAlbum";
import { Link } from "react-router-dom";

function SubAlbumRow({ subAlbum, index, album }) {
  const { language } = useLanguage();
  const [isSubAlbumEditOpen, setIsSubAlbumEditOpen] = useState(false);
  const [isSubAlbumDeleteOpen, setIsSubAlbumDeleteOpen] = useState(false);
  const { deleteSubAlbum, isRemoving } = useDeleteSubAlbum();

  return (
    <Table.Row>
      <td>{index + 1}</td>
      <td>{subAlbum.title.en}</td>
      <td>{subAlbum.title.fa}</td>
      <td>
        <Link to={`${subAlbum._id}`}>
          <button className="flex items-center justify-center gap-x-8 btn bg-emerald-700">
            <span>{language === "en" ? "Images" : "عکس ها"}</span>
            <SiMake className="w-5 h-5" />
          </button>
        </Link>
      </td>
      <td className="flex items-center justify-center gap-x-8">
        <button
          className="flex items-center justify-between btn bg-cyan-600"
          onClick={() => setIsSubAlbumEditOpen(true)}
        >
          <span>{language === "en" ? "Edit" : "ویرایش"}</span>
          <TbPencilMinus className="w-5 h-5" />
        </button>

        <button
          className="flex items-center justify-between btn bg-red-600"
          onClick={() => setIsSubAlbumDeleteOpen(true)}
        >
          <span>{language === "en" ? "Delete" : "حذف کردن"}</span>
          <HiOutlineTrash className="w-5 h-5" />
        </button>
      </td>
      {isSubAlbumEditOpen && (
        <Modal
          title={language === "en" ? "Edit Album" : "ویرایش آلبوم"}
          onClose={() => setIsSubAlbumEditOpen(false)}
        >
          <SubAlbumForm
            subAlbumToEdit={subAlbum}
            album={album}
            onClose={() => setIsSubAlbumEditOpen(false)}
          />
        </Modal>
      )}
      {isSubAlbumDeleteOpen && (
        <Modal
          title={language === "en" ? "Delete Album" : "حذف آلبوم"}
          onClose={() => setIsSubAlbumDeleteOpen(false)}
        >
          <ConfirmDelete
            englishTitle={subAlbum.title.en}
            persianTitle={subAlbum.title.fa}
            onClose={() => setIsSubAlbumDeleteOpen(false)}
            onConfirm={() =>
              deleteSubAlbum(
                { albumId: album._id, subAlbumId: subAlbum._id },
                {
                  onSuccess: () => {
                    setIsSubAlbumDeleteOpen(false);
                    toast.success(
                      `${
                        language === "en"
                          ? `You deleted ${subAlbum.title.en} successfully!`
                          : `آلبوم ${subAlbum.title.fa} با موفقیت حذف شد!`
                      }`
                    );
                  },
                  onError: () => setIsSubAlbumDeleteOpen(false),
                }
              )
            }
            isRemoving={isRemoving}
            disabled={false}
          />
        </Modal>
      )}
    </Table.Row>
  );
}

export default SubAlbumRow;
