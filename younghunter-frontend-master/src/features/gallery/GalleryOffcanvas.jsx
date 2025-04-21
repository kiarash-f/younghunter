import useAlbums from "../../hooks/useAlbums";
import Loading from "../../ui/Loading";
import { Drawer, Sidebar } from "flowbite-react";
import { HiMiniXMark } from "react-icons/hi2";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import { useGalleryContext } from "../../context/useGalleryContext";
import GalleryNavlink from "./GalleryNavlink";
import { AccordionProvider } from "../../context/useAccordionContext";
import { useLanguage } from "../../context/useLanguageContext";
import toast from "react-hot-toast";

function GalleryOffcanvas() {
  const { isLoading, isError, error } = useAlbums();
  const { isOpen, setIsOpen, value, setValue, handleSearch } =
    useGalleryContext();
  const { direction, language } = useLanguage();

  if (isError) return toast.error(error.response.data.message);

  return (
    <div className="flex flex-col">
      <Drawer
        open={isOpen}
        onClose={() => setIsOpen(false)}
        position={`${direction === "ltr" ? "right" : "left"}`}
        className="dark:bg-zinc-950 transition-all duration-300"
      >
        <div className="flex items-center justify-between w-64 mx-auto">
          <button
            className="rounded-md p-1 hover:bg-gray-200"
            onClick={() => setIsOpen(false)}
          >
            <HiMiniXMark className="w-5 h-5 text-gray-400 hover:text-gray-600" />
          </button>
          <div className="flex items-center">
            <img src="/logo demo.jpg" alt="" className="w-10" />
          </div>
        </div>
        <div className="w-64 relative mx-auto">
          <input
            type="text"
            placeholder={`${language === "en" ? "Search..." : "جستجو ..."}`}
            className="my-2 rounded-xl w-full bg-gray-800 text-white hover:border-blue-500 focus:border-blue-500 focus:bg-gray-900 transition-all duration-300 ease-out shadow-sm shadow-slate-800 focus:shadow-slate-950 focus:shadow-md placeholder-white placeholder-opacity-70 dark:bg-neutral-200 dark:text-black dark:placeholder-black dark:placeholder-opacity-60 dark:shadow-neutral-500"
            value={value}
            onChange={(e) => {
              setValue(e.target.value), handleSearch();
            }}
          />
          <button
            className={`absolute top-2 py-1.5 text-neutral-200 dark:text-zinc-950 ${
              language === "en" ? "right-1 rounded-r-lg" : "left-1 rounded-l-xl"
            }`}
          >
            <PiMagnifyingGlassBold className="size-7" />
          </button>
        </div>
        {isLoading ? (
          <Loading />
        ) : (
          <Drawer.Items>
            <Sidebar
              aria-label="Sidebar with multi-level dropdown example"
              className="[&>div]:bg-transparent [&>div]:p-0 w-64 mx-auto"
            >
              <div className="flex h-full flex-col justify-between py-2 dark:bg-zinc-950">
                <div>
                  <Sidebar.Items>
                    <Sidebar.ItemGroup>
                      <AccordionProvider>
                        <GalleryNavlink />
                      </AccordionProvider>
                    </Sidebar.ItemGroup>
                  </Sidebar.Items>
                </div>
              </div>
            </Sidebar>
          </Drawer.Items>
        )}
      </Drawer>
    </div>
  );
}

export default GalleryOffcanvas;
