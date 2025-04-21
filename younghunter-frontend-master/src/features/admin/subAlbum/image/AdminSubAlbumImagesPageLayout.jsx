import { useParams } from "react-router-dom";
import ImageHeader from "./ImageHeader";
import ImagesTable from "./ImageTable";
import useAlbums from "../../../../hooks/useAlbums";
import Loading from "../../../../ui/Loading";
import toast from "react-hot-toast";

function AdminSubAlbumImagesPageLayout() {
  const { albums, error, isError, isLoading } = useAlbums();
  const { albumId, subAlbumId } = useParams();
  const album = albums?.find((album) => album._id === albumId);
  const subAlbum = album?.subAlbums?.find(
    (subAlbum) => subAlbum._id === subAlbumId
  );

  if (isLoading) return <Loading />;
  if (isError)
    return toast.error(error?.response?.data?.message || error?.message);

  return (
    <>
      <ImageHeader album={album} subAlbum={subAlbum} />
      <ImagesTable album={album} subAlbum={subAlbum} />
    </>
  );
}

export default AdminSubAlbumImagesPageLayout;
