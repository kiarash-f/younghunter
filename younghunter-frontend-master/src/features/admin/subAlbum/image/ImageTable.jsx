import { useLanguage } from "../../../../context/useLanguageContext";
import Table from "../../../../ui/Table";
import ImageRow from "./ImageRow";

function ImagesTable({ subAlbum, album }) {
  const { language } = useLanguage();

  if (!subAlbum.images.length)
    return (
      <p>
        {language === "en"
          ? "There is no Images in this Sub Album!"
          : "عکسی در این زیر آلبوم یافت نشد!"}
      </p>
    );

  return (
    <Table>
      <Table.Header>
        <th>#</th>
        <th>{language === "en" ? "Images" : "عکس ها"}</th>
        <th>{language === "en" ? "English Title" : "عنوان به انگلیسی"}</th>
        <th>{language === "en" ? "Persian Title" : "عنوان به فارسی"}</th>
        <th>{language === "en" ? "Carousel Image" : "عکس در کاروسل"}</th>
        <th>{language === "en" ? "Operations" : "عملیات"}</th>
      </Table.Header>
      <Table.Body>
        {subAlbum.images.map((image, index) => (
          <ImageRow
            key={image._id}
            image={image}
            subAlbum={subAlbum}
            index={index}
            album={album}
          />
        ))}
      </Table.Body>
    </Table>
  );
}

export default ImagesTable;
