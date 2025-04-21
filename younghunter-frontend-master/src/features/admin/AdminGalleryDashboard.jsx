import toast from "react-hot-toast";
import { useLanguage } from "../../context/useLanguageContext";
import useAlbums from "../../hooks/useAlbums";
import Loading from "../../ui/Loading";
import AlbumsTable from "./album/AlbumsTable";
import AccessModal from "../../ui/AccessModal";
import AlbumsHeader from "./album/AlbumsHeader";
import { useState } from "react";

function AdminGalleryDashboard() {
  const { language } = useLanguage();
  const [openModal, setOpenModal] = useState();
  const { error, isError, isLoading } = useAlbums();

  if (isLoading) return <Loading />;
  if (isError) return toast.error(error?.response?.data?.message);

  return (
    <>
      <div className="flex items-center justify-center  gap-x-8 text-xs pb-4 flex-wrap md:flex-row flex-col max-w-[85%] mx-auto gap-y-2">
        <div className="flex items-center gap-x-2">
          <button
            className="bg-green-600 adminRoleBtn w-32"
            onClick={() => setOpenModal(true)}
          >
            {language === "en" ? "Album Access" : "دسترسی به آلبوم ها"}
          </button>
        </div>
      </div>

      {openModal && (
        <AccessModal
          title={language == "en" ? "Album Access" : "دسترسی به آلبوم"}
          onClose={() => setOpenModal(false)}
        >
          <AlbumsHeader />
          <AlbumsTable />
        </AccessModal>
      )}
    </>
  );
}

export default AdminGalleryDashboard;
