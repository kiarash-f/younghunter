import { Outlet } from "react-router-dom";
import AlbumsHeader from "./AlbumsHeader";
import AlbumsTable from "./AlbumsTable";

function AdminAlbumsPageLayout() {
  return (
    <>
      <AlbumsHeader />
      <AlbumsTable />
      <Outlet />
    </>
  );
}

export default AdminAlbumsPageLayout;
