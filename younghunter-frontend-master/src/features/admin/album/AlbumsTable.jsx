import toast from "react-hot-toast";
import { useLanguage } from "../../../context/useLanguageContext";
import useAlbums from "../../../hooks/useAlbums";
import Loading from "../../../ui/Loading";
import Table from "../../../ui/Table";
import AlbumRow from "./AlbumRow";

function AlbumsTable() {
  const { albums, isError, error, isLoading } = useAlbums();
  const { language } = useLanguage();

  if (isLoading) return <Loading />;
  if (isError)
    return toast.error(error?.response?.data?.message || error.message);

  if (!albums.length)
    return (
      <p className="text-neutral-200">
        {language === "en" ? "There is no Album!" : "آلبومی یافت نشد!"}
      </p>
    );

  return (
    <Table>
      <Table.Header>
        <th>#</th>
        <th>{language === "en" ? "English Title" : "عنوان به انگلیسی"}</th>
        <th>{language === "en" ? "Persian Title" : "عنوان به فارسی"}</th>
        <th>{language === "en" ? "Sub Albums" : "زیر آلبوم"}</th>
        <th>{language === "en" ? "Operations" : "عملیات"}</th>
      </Table.Header>
      <Table.Body>
        {albums.map((album, index) => (
          <AlbumRow key={album._id} album={album} index={index} />
        ))}
      </Table.Body>
    </Table>
  );
}

export default AlbumsTable;
