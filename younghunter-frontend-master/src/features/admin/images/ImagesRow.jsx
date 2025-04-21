import { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { TbPencilMinus } from "react-icons/tb";
import { useLanguage } from "../../../context/useLanguageContext";
import Table from "../../../ui/Table";
import Modal from "../../../ui/Modal";
import ConfirmDelete from "../../../ui/ConfirmDelete";
import useDeleteImage from "../../../hooks/useDeleteImage";
import toast from "react-hot-toast";
import ImageForm from "./ImageForm";
import { ToggleSwitch } from "flowbite-react";
import useEditImage from "../../../hooks/useEditImage";

function ImagesRow({ image, index }) {
  const { deleteImage, isRemoving } = useDeleteImage();
  const { editImage } = useEditImage();
  const { language } = useLanguage();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <Table.Row>
      <td>{index + 1}</td>
      <td className="">
        <img src={image.url} alt="" className="w-9 h-9 mx-auto" />
      </td>
      <td>{image.title.en}</td>
      <td>{image.title.fa}</td>
      <td>
        <ToggleSwitch
          color="info"
          checked={image.isFeaturedCarousel}
          onChange={() =>
            editImage(
              {
                imageId: image._id,
                newImage: {
                  ...image,
                  isFeaturedCarousel: !image.isFeaturedCarousel,
                },
              },
              {
                onSuccess: () => {
                  toast.success(
                    `${
                      language === "en"
                        ? `You ${
                            image.isFeaturedCarousel === false
                              ? "added"
                              : "removed"
                          } ${image.title.en} ${
                            image.isFeaturedCarousel === false ? "to" : "from"
                          } Carousel successfully!`
                        : `عکس ${image.title.fa} با موفقیت ${
                            image.isFeaturedCarousel === false ? "به" : "از"
                          } کاروسل ${
                            image.isFeaturedCarousel === false
                              ? "اضافه گردید"
                              : "حذف گردید"
                          }`
                    }`
                  );
                },
                onError: () => setIsDeleteOpen(false),
              }
            )
          }
        />
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
          title={language === "en" ? "Edit Image" : "ویرایش عکس"}
          onClose={() => setIsEditOpen(false)}
        >
          <ImageForm imageToEdit={image} onClose={() => setIsEditOpen(false)} />
        </Modal>
      )}

      {isDeleteOpen && (
        <Modal
          title={language === "en" ? "Delete Image" : "حذف عکس"}
          onClose={() => setIsDeleteOpen(false)}
        >
          <ConfirmDelete
            englishTitle={image.title.en}
            persianTitle={image.title.fa}
            onClose={() => setIsDeleteOpen(false)}
            onConfirm={async () =>
              await deleteImage(image._id, {
                onSuccess: () => {
                  setIsDeleteOpen(false);
                  toast.success(
                    `${
                      language === "en"
                        ? `You deleted ${image.title.en} successfully!`
                        : `آلبوم ${image.title.fa} با موفقیت حذف شد!`
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

export default ImagesRow;
