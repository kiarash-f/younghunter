import { Outlet, useParams } from "react-router-dom";
import useAlbums from "../../../hooks/useAlbums";
import SubAlbumsHeader from "./SubAlbumHeader";
import SubAlbumsTable from "./SubAlbumsTable";
import Loading from "../../../ui/Loading";
import toast from "react-hot-toast";

function AdminSubAlbumPageLayout() {
  const { albums, isError, isLoading, error } = useAlbums();
  const { albumId } = useParams();
  const album = albums?.find((album) => album._id === albumId);

  if (isLoading) return <Loading />;
  if (isError)
    return toast.error(error?.response?.data?.message || error?.message);

  return (
    <>
      <SubAlbumsHeader album={album} />
      <SubAlbumsTable album={album} />
      <Outlet />
    </>
  );
}

export default AdminSubAlbumPageLayout;
