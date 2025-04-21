import toast from "react-hot-toast";
import { useLanguage } from "../../../context/useLanguageContext";
import useImages from "../../../hooks/useImages";
import Loading from "../../../ui/Loading";
import Table from "../../../ui/Table";
import ImagesRow from "./ImagesRow";

function ImagesTable({ sortImages }) {
  const { images, isLoading, isError, error } = useImages();
  const { language } = useLanguage();

  let sortedImages = images;

  sortImages === "carouselImages"
    ? (sortedImages = images.filter(
        (image) => image.isFeaturedCarousel === true
      ))
    : sortImages === "not-carouselImages"
    ? (sortedImages = images.filter(
        (image) => image.isFeaturedCarousel === false
      ))
    : images;

  if (isLoading) return <Loading />;
  if (isError)
    return toast.error(error?.response?.data?.message || error.message);

  if (!images.length)
    return (
      <p className="text-neutral-200">
        {language === "en" ? "There is no Image!" : "عکسی یافت نشد!"}
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
        {sortedImages.map((image, index) => (
          <ImagesRow key={image._id} image={image} index={index} />
        ))}
      </Table.Body>
    </Table>
  );
}

export default ImagesTable;
