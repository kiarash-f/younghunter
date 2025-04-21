import { TbAlbum } from "react-icons/tb";
import GalleryNavbar from "../gallery/GalleryNavbar";
import { useGalleryContext } from "../../context/useGalleryContext";
import { Outlet } from "react-router-dom";
import ScrollToTopButton from "../../ui/ScrollButton";
import GalleryOffcanvas from "../gallery/GalleryOffcanvas";

function AlbumLayout() {
  const { setIsOpen } = useGalleryContext();

  return (
    <div className="">
      <div className="bg-gray-950 bg-opacity-70 dark:bg-opacity-90 shadow-sm shadow-gray-500 mt-1 flex items-center justify-center relative">
        <GalleryNavbar />

        <button
          className=" text-gray-200 hover:text-gray-300 mx-4"
          onClick={() => setIsOpen(true)}
        >
          <TbAlbum className="h-10 w-10" />
        </button>
      </div>
      <div className="w-full mx-auto py-8 dark:bg-zinc-950 transition-all duration-300">
        <div className="rounded-2xl shadow-3xl flex items-center flex-col flex-wrap p-5 max-w-[85%] mx-auto bg-neutral-100 dark:shadow-neutral-600">
          <Outlet />
        </div>
        <GalleryOffcanvas />
      </div>
      <ScrollToTopButton />
    </div>
  );
}

export default AlbumLayout;
