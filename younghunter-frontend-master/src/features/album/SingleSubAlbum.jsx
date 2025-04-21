import toast from "react-hot-toast";
import useSingleSubAlbum from "../../hooks/useSingleSubAlbum";
import Loading from "../../ui/Loading";
import { useLanguage } from "../../context/useLanguageContext";
import { usePagination } from "../../context/usePaginationContext";
import { useEffect, useState } from "react";
import Pagination from "../../ui/Pagination";
import { useSorting } from "../../context/useSortingContext";
import { HiOutlineX } from "react-icons/hi";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa6";

function SingleSubAlbum() {
  const { subAlbum, error, isError, isLoading } = useSingleSubAlbum();
  const { sortOption } = useSorting();
  const { currentPage, setTotalPages, pageSize } = usePagination();
  const { language } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);

  useEffect(() => {
    if (subAlbum.length > 0)
      setTotalPages(Math.ceil(subAlbum.images.length / pageSize));
  }, [subAlbum, pageSize, setTotalPages]);

  if (isLoading) return <Loading />;
  if (isError) return toast.error(error?.response?.data?.message);

  // Sorting Albums based on newest or oldest
  const sortedSubAlbumImages = [...subAlbum.images].sort((a, b) => {
    return sortOption === "new"
      ? new Date(b.dateTaken) - new Date(a.dateTaken)
      : new Date(a.dateTaken) - new Date(b.dateTaken);
  });

  // Slicing Albums for pagination based on 9 items per page
  const currentSubAlbumImages = sortedSubAlbumImages.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleImageClick = (imageUrl, index) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
    setCurrentIndex(index);
  };
  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
    setCurrentIndex(null);
  };

  const nextImageItemHandler = () => {
    if (currentIndex < currentSubAlbumImages.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedImage(currentSubAlbumImages[currentIndex + 1].url);
    }
  };

  const previousImageItemHandler = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedImage(currentSubAlbumImages[currentIndex - 1].url);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 min-[1119px]:grid-cols-3 gap-x-16 gap-y-4">
        {currentSubAlbumImages.map((subAlbumImgs, index) => (
          <div
            key={subAlbumImgs._id}
            className="flex flex-col shadow-3xl max-w-[300px] rounded-lg mx-auto py-3 gap-y-2 max-h-[600px]"
          >
            <span className="text-[10px] text-center font-bold text-red-950">
              {language === "en"
                ? "The photos are uncropped and without any use of elements."
                : "عکس ها بدون برش و بدون هیچگونه استفاده از عناصر می باشد."}
            </span>
            <button
              className=""
              onClick={() => handleImageClick(subAlbumImgs.url, index)}
            >
              <img
                src={subAlbumImgs.url}
                className="object-contain shadow-3xl rounded-lg mx-auto w-[300px] h-[300px] bg-neutral-200"
                alt=""
              />
            </button>
            <div className="flex items-center justify-start text-sm mx-2 font-bold">
              <span>
                {language === "en"
                  ? `${subAlbumImgs.title.en},`
                  : `${subAlbumImgs.title.fa}،`}
              </span>
              <DateComponent date={subAlbumImgs.dateTaken} />
              <span>
                {language === "en"
                  ? `,${subAlbumImgs.location.name.en}`
                  : `،${subAlbumImgs.location.name.fa}`}
              </span>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination Controls */}
      {subAlbum.images.length > pageSize && <Pagination />}

      {/* Image Preview Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={closeModal}
        >
          <div
            className="bg-neutral-200 p-4 rounded-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-black text-3xl"
              onClick={closeModal}
            >
              <HiOutlineX className="h-5 w-5" />
            </button>
            <div className="flex justify-between items-center">
              <button
                className="min-[475px]:min-w-[40px] min-w-[30px] min-[475px]:h-[40px] h-[30px] rounded-full flex items-center justify-center text-white bg-neutral-800 hover:text-black hover:bg-neutral-500 duration-200 absolute left-1 disabled:bg-gray-300 disabled:text-gray-500"
                onClick={previousImageItemHandler}
                disabled={currentIndex === 0}
              >
                <FaCaretLeft className="w-5 h-5" />
              </button>
              <img
                src={selectedImage}
                alt="Preview"
                className="w-[80vw] md:h-[80vh] h-[60vh] object-contain"
              />
              <button
                className="min-[475px]:min-w-[40px] min-w-[30px] min-[475px]:h-[40px] h-[30px] rounded-full flex items-center justify-center text-white bg-neutral-800 hover:text-black hover:bg-neutral-500 duration-200 absolute right-1 disabled:text-gray-500 disabled:bg-gray-300"
                onClick={nextImageItemHandler}
                disabled={currentIndex === currentSubAlbumImages.length - 1}
              >
                <FaCaretRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SingleSubAlbum;

function formattedDate(isoString, language) {
  return new Date(isoString).toLocaleDateString(
    language === "en" ? "en-Us" : "fa-IR",
    {
      year: "numeric",
    }
  );
}

function DateComponent({ date }) {
  const { language } = useLanguage();
  return <span>{formattedDate(date, language)}</span>;
}
