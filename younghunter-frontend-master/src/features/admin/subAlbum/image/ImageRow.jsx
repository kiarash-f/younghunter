import { useState } from "react";
import Table from "../../../../ui/Table";
import { useLanguage } from "../../../../context/useLanguageContext";
import { HiOutlineTrash } from "react-icons/hi";
import { TbPencilMinus } from "react-icons/tb";
import { ToggleSwitch } from "flowbite-react";
import toast from "react-hot-toast";
import useEditImage from "../../../../hooks/useEditImage";
import Modal from "../../../../ui/Modal";
import ImageForm from "../../images/ImageForm";
import ConfirmDelete from "../../../../ui/ConfirmDelete";
import useDeleteSubAlbumImage from "../../../../hooks/useDeleteSubAlbumImage";
import Loading from "../../../../ui/Loading";

function ImageRow({ subAlbum, image, index, album }) {
  const { deleteSubAlbumImage, isRemoving } = useDeleteSubAlbumImage();
  const { editImage, isEditing } = useEditImage();
  const { language } = useLanguage();
  const [isSubAlbumEditOpen, setIsSubALbumEditOpen] = useState(false);
  const [isSubAlbumImageDeleteOpen, setIsSubALbumImageDeleteOpen] =
    useState(false);

  if (isEditing) return <Loading />;

  return (
    <Table.Row>
      <td>{index + 1}</td>
      <td>
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
                onError: (error) => toast.error(error.message),
              }
            )
          }
        />
      </td>
      <td className="flex items-center justify-center gap-x-8">
        <button
          className="flex items-center justify-between btn bg-cyan-600"
          onClick={() => setIsSubALbumEditOpen(true)}
        >
          <span>{language === "en" ? "Edit" : "ویرایش"}</span>
          <TbPencilMinus className="w-5 h-5" />
        </button>

        <button
          className="flex items-center justify-between btn bg-red-600"
          onClick={() => setIsSubALbumImageDeleteOpen(true)}
        >
          <span>{language === "en" ? "Delete" : "حذف کردن"}</span>
          <HiOutlineTrash className="w-5 h-5" />
        </button>
      </td>
      {isSubAlbumEditOpen && (
        <Modal
          title={language === "en" ? "Edit Image" : "ویرایش عکس"}
          onClose={() => setIsSubALbumEditOpen(false)}
        >
          <ImageForm
            imageToEdit={image}
            onClose={() => setIsSubALbumEditOpen(false)}
          />
        </Modal>
      )}

      {isSubAlbumImageDeleteOpen && (
        <Modal
          title={language === "en" ? "Delete Image" : "حذف عکس"}
          onClose={() => setIsSubALbumImageDeleteOpen(false)}
        >
          <ConfirmDelete
            englishTitle={image.title.en}
            persianTitle={image.title.fa}
            onClose={() => setIsSubALbumImageDeleteOpen(false)}
            onConfirm={async () =>
              await deleteSubAlbumImage(
                {
                  subAlbumId: subAlbum._id,
                  albumId: album._id,
                  imageId: image._id,
                },
                {
                  onSuccess: () => {
                    setIsSubALbumImageDeleteOpen(false);
                    toast.success(
                      `${
                        language === "en"
                          ? `You deleted ${image.title.en} from ${subAlbum.title.en} successfully!`
                          : `عکس ${image.title.fa} با موفقیت از زیر آلبوم ${subAlbum.title.fa} حذف شد!`
                      }`
                    );
                  },
                  onError: () => setIsSubALbumImageDeleteOpen(false),
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

export default ImageRow;
