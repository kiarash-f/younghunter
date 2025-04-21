import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/useLanguageContext";
import useAlbums from "../../hooks/useAlbums";
import Loading from "../../ui/Loading";
import toast from "react-hot-toast";
import { useEffect, useMemo } from "react";
import { usePagination } from "../../context/usePaginationContext";
import Pagination from "../../ui/Pagination";
import { useSorting } from "../../context/useSortingContext";
import { useGalleryContext } from "../../context/useGalleryContext";
import Empty from "../../ui/Empty";

function GalleryMain() {
  const { albums, isLoading, isError, error } = useAlbums();
  const { language } = useLanguage();
  const { sortOption } = useSorting();
  const { searchResults, value, setValue, setSearchResults } =
    useGalleryContext();
  const navigate = useNavigate();
  const { currentPage, setTotalPages, pageSize } = usePagination();

  useEffect(() => {
    if (albums) setTotalPages(Math.ceil(albums.length / pageSize));
  }, [albums, pageSize, setTotalPages]);

  const sortedAlbums = useMemo(() => {
    return (
      albums &&
      [...albums].sort((a, b) => {
        return sortOption === "new"
          ? new Date(b.createdAt) - new Date(a.createdAt)
          : new Date(a.createdAt) - new Date(b.createdAt);
      })
    );
  }, [albums, sortOption]);

  if (isLoading) return <Loading />;
  if (isError) return toast.error(error.response.data.message);

  const currentAlbums = sortedAlbums.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleAlbumSearchClick = (albumId) => {
    navigate(`${albumId}/sub-albums`);
    setValue("");
    setSearchResults([]);
  };

  // If albums are empty, show Empty component
  if (albums.length === 0) return <Empty />;

  return (
    <>
      <div
        className={`${
          value.trim() && searchResults.length === 0
            ? "flex items-center justify-center"
            : albums.length > 0 || searchResults.length > 0
            ? " grid grid-cols-1 md:grid-cols-2 min-[1119px]:grid-cols-3 gap-x-16 gap-y-4 w-full px-4"
            : ""
        }`}
      >
        {/* Render search results if available */}
        {value.trim() && searchResults.length > 0 ? (
          searchResults.map((album) => (
            <div
              key={album._id}
              className="flex flex-col shadow-3xl max-w-[300px] rounded-lg mx-auto py-3 gap-y-2 max-h-[600px]"
            >
              <button
                className="p-2"
                onClick={() => handleAlbumSearchClick(album._id)}
              >
                <img
                  src={album.imageCover}
                  className="object-contain shadow-3xl rounded-lg mx-auto w-[300px] h-[300px] p-1 bg-neutral-200"
                  alt=""
                />
              </button>
              <h1 className="font-bold text-2xl mx-2.5">
                {language === "en" ? album.title.en : album.title.fa}
              </h1>
            </div>
          ))
        ) : value.trim() && searchResults.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <Empty />
          </div>
        ) : currentAlbums.length > 0 ? (
          currentAlbums.map((album) => (
            <div
              key={album._id}
              className="flex flex-col shadow-3xl max-w-[300px] rounded-lg mx-auto py-3 gap-y-2 max-h-[600px]"
            >
              <button
                className="p-2"
                onClick={() => navigate(`${album._id}/sub-albums`)}
              >
                <img
                  src={album.imageCover}
                  className="object-contain shadow-3xl rounded-lg mx-auto w-[300px] h-[300px] p-1 bg-neutral-200"
                  alt=""
                />
              </button>
              <h1 className="font-bold text-2xl mx-2.5">
                {language === "en" ? album.title.en : album.title.fa}
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
        : albums.length > pageSize && <Pagination />}
    </>
  );
}

export default GalleryMain;
