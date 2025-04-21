import Loading from "../../ui/Loading";
import toast from "react-hot-toast";
import { useLanguage } from "../../context/useLanguageContext";
import { useNavigate } from "react-router-dom";
import useAllSubAlbums from "../../hooks/useAllSubAlbumsForSingleAlbum";
import { useEffect } from "react";
import { usePagination } from "../../context/usePaginationContext";
import Pagination from "../../ui/Pagination";
import { useSorting } from "../../context/useSortingContext";
import { useGalleryContext } from "../../context/useGalleryContext";
import Empty from "../../ui/Empty";

function SingleAlbum() {
  const { isError, isLoading, subAlbums, error } = useAllSubAlbums();
  const { language } = useLanguage();
  const { sortOption } = useSorting();
  const navigate = useNavigate();
  const { currentPage, setTotalPages, pageSize } = usePagination();
  const { searchResults, value } = useGalleryContext();

  useEffect(() => {
    if (subAlbums) setTotalPages(Math.ceil(subAlbums.length / pageSize));
  }, [subAlbums, pageSize, setTotalPages]);

  if (isLoading) return <Loading />;
  if (isError) return toast.error(error.response.data.message);

  // Sorting Sub Albums based on newest or oldest
  const sortedSubAlbums = [...subAlbums].sort((a, b) => {
    return sortOption === "new"
      ? new Date(b.createdAt) - new Date(a.createdAt)
      : new Date(a.createdAt) - new Date(b.createdAt);
  });

  // Slicing Sub Albums for pagination based on 9 items per page
  const currentSubAlbums = sortedSubAlbums.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <>
      <div
        className={`${
          value.trim() && searchResults.length === 0
            ? "flex items-center justify-center"
            : subAlbums.length > 0 || searchResults.length > 0
            ? " grid grid-cols-1 md:grid-cols-2 min-[1119px]:grid-cols-3 gap-x-16 gap-y-4 w-full px-4"
            : ""
        }`}
      >
        {value.trim() && searchResults.length > 0 ? (
          searchResults.map((subAlbum) => (
            <div
              key={subAlbum._id}
              className="flex flex-col shadow-3xl max-w-[300px] rounded-lg mx-auto py-3 gap-y-2 max-h-[600px]"
            >
              <button
                className="p-2"
                onClick={() => navigate(`${subAlbum._id}`)}
              >
                <img
                  src={subAlbum.imageCover}
                  className="object-contain shadow-3xl rounded-lg mx-auto w-[300px] h-[300px] p-1 bg-neutral-200"
                  alt=""
                />
              </button>
              <h1 className="font-bold text-2xl mx-2.5">
                {language === "en" ? subAlbum.title.en : subAlbum.title.fa}
              </h1>
            </div>
          ))
        ) : value.trim() && searchResults.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <Empty />
          </div>
        ) : currentSubAlbums.length > 0 ? (
          currentSubAlbums.map((subAlbum) => (
            <div
              key={subAlbum._id}
              className="flex flex-col shadow-3xl max-w-[300px] rounded-lg mx-auto py-3 gap-y-2 max-h-[600px]"
            >
              <button
                className="p-2"
                onClick={() => navigate(`${subAlbum._id}`)}
              >
                <img
                  src={subAlbum.imageCover}
                  className="object-contain shadow-3xl rounded-lg mx-auto w-[300px] h-[300px] p-1 bg-neutral-200"
                  alt=""
                />
              </button>
              <h1 className="font-bold text-2xl mx-2.5">
                {language === "en" ? subAlbum.title.en : subAlbum.title.fa}
              </h1>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-full">
            <Empty />
          </div>
        )}
      </div>
      {/* Pagination Controls */}
      {searchResults.length > 0
        ? searchResults.length > pageSize
        : subAlbums.length > pageSize && <Pagination />}
    </>
  );
}

export default SingleAlbum;
