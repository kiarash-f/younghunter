import { useLanguage } from "../../../context/useLanguageContext";
import Table from "../../../ui/Table";
import SubAlbumRow from "./SubAlbumRow";

function SubAlbumsTable({ album }) {
  const { language } = useLanguage();

  if (!album.subAlbums.length)
    return (
      <p>
        {language === "en" ? "There is no Sub Album!" : "زیر آلبومی یافت نشد!"}
      </p>
    );

  return (
    <Table>
      <Table.Header>
        <th>#</th>
        <th>{language === "en" ? "English Title" : "عنوان به انگلیسی"}</th>
        <th>{language === "en" ? "Persian Title" : "عنوان به فارسی"}</th>
        <th>{language === "en" ? "Images" : "عکس ها"}</th>
        <th>{language === "en" ? "Operations" : "عملیات"}</th>
      </Table.Header>
      <Table.Body>
        {album.subAlbums.map((subAlbum, index) => (
          <SubAlbumRow
            key={subAlbum._id}
            album={album}
            subAlbum={subAlbum}
            index={index}
          />
        ))}
      </Table.Body>
    </Table>
  );
}

export default SubAlbumsTable;
