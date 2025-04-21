import GalleryContextProvider from "../context/useGalleryContext";
import PaginationProvider from "../context/usePaginationContext";
import SortingProvider from "../context/useSortingContext";
import AlbumLayout from "../features/album/AlbumLayout";

function Gallery() {
  return (
    <GalleryContextProvider>
      <SortingProvider>
        <PaginationProvider>
          <AlbumLayout />
        </PaginationProvider>
      </SortingProvider>
    </GalleryContextProvider>
  );
}

export default Gallery;
