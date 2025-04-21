import { Drawer, Sidebar } from "flowbite-react";
import { HiMiniXMark } from "react-icons/hi2";
import HeaderNavlink from "./HeaderNavlink";
import HeaderSelectBox from "./HeaderSelectBox";
import Authentication from "./Authentication";
import HeaderHashlink from "./HeaderHashlink";
import { useLanguage } from "../../context/useLanguageContext";
import AdminAccess from "../admin/AdminAccess";
import { useAdmin } from "../../context/useAdminContext";

function HeaderOffcanvas({ open, onClose }) {
  const { isAdmin } = useAdmin();
  const { language } = useLanguage();

  return (
    <div className="md:hidden">
      <Drawer
        open={open}
        onClose={onClose}
        position="right"
        className="transition-all duration-300 dark:bg-zinc-950"
      >
        <div className="flex items-center justify-between w-64 mx-auto">
          <button
            className="rounded-md p-1 hover:bg-gray-200"
            onClick={onClose}
          >
            <HiMiniXMark className="w-5 h-5 text-gray-400 hover:text-gray-600" />
          </button>
          <div className="flex items-center">
            <img src="/logo demo.jpg" alt="" className="w-10" />
          </div>
        </div>
        <Drawer.Items>
          <Sidebar
            aria-label="Sidebar with multi-level dropdown example"
            className="[&>div]:p-0 mx-auto"
          >
            <div className="flex h-full flex-col justify-between py-2 bg-white dark:bg-zinc-950">
              <div>
                <Sidebar.Items className="bg-white dark:bg-zinc-950">
                  <Sidebar.ItemGroup className="border-none">
                    <HeaderNavlink onClose={onClose} to="/">
                      <span>{language === "en" ? "Home" : "صفحه اصلی"}</span>
                    </HeaderNavlink>
                    <HeaderNavlink onClose={onClose} to="/albums">
                      <span>{language === "en" ? "Gallery" : "گالری"}</span>
                    </HeaderNavlink>
                    <HeaderHashlink onClose={onClose} to="/#about">
                      <span>
                        {language === "en" ? "Contact" : "تماس با ما"}
                      </span>
                    </HeaderHashlink>
                    <HeaderHashlink onClose={onClose} to="/#about">
                      <span>{language === "en" ? "About" : "درباره ما"}</span>
                    </HeaderHashlink>
                  </Sidebar.ItemGroup>
                  <Sidebar.ItemGroup className="border-none">
                    <div className="flex flex-col gap-y-4">
                      <HeaderSelectBox />
                      <Authentication />
                      {isAdmin && <AdminAccess />}
                    </div>
                  </Sidebar.ItemGroup>
                </Sidebar.Items>
              </div>
            </div>
          </Sidebar>
        </Drawer.Items>
      </Drawer>
    </div>
  );
}

export default HeaderOffcanvas;
