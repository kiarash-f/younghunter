import { Link, NavLink } from "react-router-dom";
import { useAccordion } from "../../context/useAccordionContext";
import useAlbums from "../../hooks/useAlbums";
import Loading from "../../ui/Loading";
import { HiChevronDown } from "react-icons/hi2";
import { useLanguage } from "../../context/useLanguageContext";
import toast from "react-hot-toast";
import { useGalleryContext } from "../../context/useGalleryContext";

function GalleryNavlink() {
  const { albums, isLoading, isError, error } = useAlbums();

  const { openSubAlbumId, openAccordion, closeAccordion } = useAccordion();

  const openAccordionHandler = (id) => {
    openAccordion(id === openSubAlbumId ? null : id);
  };

  const navlinkClass =
    "flex items-center transition-all duration-300 bg-gray-300 dark:bg-gray-700 dark:text-neutral-200 py-2 rounded-md";

  if (isLoading) return <Loading />;
  if (isError) return toast.error(error.response.data.message);

  return albums.map((album) => (
    <li className="" key={album._id}>
      <NavLink
        onClick={() => openAccordionHandler(album._id)}
        className={
          album._id === openSubAlbumId
            ? `${navlinkClass} !bg-gray-500 hover:!bg-gray-600 text-black dark:!bg-gray-900 dark:!text-neutral-200 dark:hover:!bg-gray-950`
            : `${navlinkClass} hover:bg-gray-400 dark:hover:bg-gray-800`
        }
      >
        <SubAlbum
          album={album}
          openSubAlbumId={openSubAlbumId}
          onClose={closeAccordion}
        />
      </NavLink>
    </li>
  ));
}

export default GalleryNavlink;

const SubAlbum = ({ album, openSubAlbumId, onClose }) => {
  const { language } = useLanguage();
  const isOpen = album._id === openSubAlbumId;
  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center justify-between px-4">
        <span>{`${language === "en" ? album.title.en : album.title.fa}`}</span>
        <button onClick={() => onClose()}>
          <HiChevronDown
            className={`text-lg`}
            style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
          />
        </button>
      </div>
      <SubAlbumItem
        album={album}
        isOpen={isOpen}
        onClose={onClose}
        language={language}
      />
    </div>
  );
};

const SubAlbumItem = ({ album, isOpen, onClose, language }) => {
  const { setIsOpen } = useGalleryContext();
  return (
    <div
      className={`${
        isOpen
          ? "flex flex-col w-[95%] mx-auto mt-1 transition duration-300"
          : "hidden"
      }`}
    >
      {album.subAlbums.map((subAlbum) => (
        <div
          className="w-full bg-gray-300 text-black rounded-md px-4 mt-1 hover:bg-gray-400 py-1 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-800"
          key={subAlbum._id}
          onClick={() => onClose()}
        >
          <Link
            to={`/albums/${album._id}/sub-albums/${subAlbum._id}`}
            className="flex items-center justify-start w-full"
            onClick={() => setIsOpen(false)}
          >{`${
            language === "en" ? subAlbum.title.en : subAlbum.title.fa
          }`}</Link>
        </div>
      ))}
    </div>
  );
};
