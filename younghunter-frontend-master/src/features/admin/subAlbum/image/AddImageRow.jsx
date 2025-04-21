import Table from "../../../../ui/Table";
import { useLanguage } from "../../../../context/useLanguageContext";
import { HiOutlinePlus } from "react-icons/hi";
import useAddImageToSubAlbum from "../../../../hooks/useAddImageToSubAlbum";
import toast from "react-hot-toast";

function AddImageRow({ image, index, subAlbum, album }) {
  const { addImage, isAdding } = useAddImageToSubAlbum();
  const { language } = useLanguage();

  const addImageHandler = async () => {
    await addImage(
      { subAlbumId: subAlbum._id, albumId: album._id, imageIds: image._id },
      {
        onSuccess: () => {
          toast.success(
            `${
              language === "en"
                ? `${image.title.en} added successfully`
                : `${image.title.fa} با موفقیت افزوده شد`
            }`
          );
        },
        onError: (error) => toast.error(error?.response?.data?.message),
      }
    );
  };

  return (
    <Table.Row>
      <td>{index + 1}</td>
      <td className="">
        <img src={image.url} alt="" className="w-9 h-9 mx-auto" />
      </td>
      <td>{image.title.en}</td>
      <td>{image.title.fa}</td>
      <td className="flex items-center justify-center gap-x-8">
        <button
          className="flex items-center justify-between btn bg-green-600"
          onClick={addImageHandler}
        >
          {isAdding ? (
            "..."
          ) : (
            <span>{language === "en" ? "Add" : "افزودن"}</span>
          )}
          <HiOutlinePlus className="w-5 h-5" />
        </button>
      </td>
    </Table.Row>
  );
}

export default AddImageRow;
