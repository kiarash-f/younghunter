import toast from "react-hot-toast";
import { useLanguage } from "../../../../context/useLanguageContext";
import useImages from "../../../../hooks/useImages";
import Loading from "../../../../ui/Loading";
import Table from "../../../../ui/Table";
import AddImageRow from "./AddImageRow";

function AddImage({ subAlbum, album }) {
  const { images, error, isError, isLoading } = useImages();
  const { language } = useLanguage();

  if (isLoading) return <Loading />;
  if (isError)
    return toast.error(error?.response?.data?.message || error.message);

  return (
    <>
      <Table>
        <Table.Header>
          <th>#</th>
          <th>{language === "en" ? "Images" : "عکس ها"}</th>
          <th>{language === "en" ? "English Title" : "عنوان به انگلیسی"}</th>
          <th>{language === "en" ? "Persian Title" : "عنوان به فارسی"}</th>
          <th>{language === "en" ? "Operations" : "عملیات"}</th>
        </Table.Header>
        <Table.Body>
          {images &&
            images.map((image, index) => (
              <AddImageRow
                key={image._id}
                image={image}
                index={index}
                subAlbum={subAlbum}
                album={album}
              />
            ))}
        </Table.Body>
      </Table>
    </>
  );
}

export default AddImage;
