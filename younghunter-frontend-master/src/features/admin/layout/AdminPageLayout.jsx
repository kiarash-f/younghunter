import { Link, Outlet } from "react-router-dom";
import { useLanguage } from "../../../context/useLanguageContext";
import useUsers from "../../../hooks/useUsers";
import { logout } from "../../../hooks/useAuth";
import { NavLink } from "react-router-dom";
import Loading from "../../../ui/Loading";
import toast from "react-hot-toast";

function AdminPageLayout() {
  const { users, isLoading, isError, error } = useUsers();
  const { language } = useLanguage();

  if (isLoading) return <Loading />;
  if (isError)
    return toast.error(error?.response?.data?.message || error?.message);

  const findAdmin = users.find((user) => user.role === "admin");

  return (
    <div className="grid h-screen grid-rows-[auto_1fr] md:grid-cols-[15rem_1fr] grid-cols-[7rem_1fr] bg-slate-900 text-neutral-200">
      <div className="bg-blue-900 py-4 px-8 border-b border-neutral-200">
        <div className="container xl:max-w-screen-lg flex items-center gap-x-8">
          <ul className="flex justify-around w-full items-center gap-x-4">
            <li className="flex">
              <Link to="/">{language === "en" ? "Home" : "صفحه اصلی"}</Link>
            </li>
            <li className="flex">{findAdmin ? findAdmin.name : "Admin"}</li>
            <li className="flex">
              <button onClick={logout}>
                {language === "en" ? "Logout" : "خروج"}
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="row-start-1 row-span-2 border border-neutral-200 py-4 overflow-y-auto">
        <ul className="flex flex-col gap-y-4">
          <li className="flex items-center w-[95%] mx-auto">
            <NavLink
              to="images"
              className={({ isActive }) =>
                isActive
                  ? "bg-slate-800 flex items-center gap-x-2 px-2 py-1.5 rounded-lg transition-all duration-300 w-full"
                  : "hover:bg-slate-700 flex items-center gap-x-2 px-2 py-1.5 rounded-lg transition-all duration-300 w-full"
              }
            >
              {language === "en" ? "Images" : "عکس ها"}
            </NavLink>
          </li>
          <li className="flex items-center w-[95%] mx-auto">
            <NavLink
              to="albums"
              className={({ isActive }) =>
                isActive
                  ? "bg-slate-800 flex items-center gap-x-2 px-2 py-1.5 rounded-lg transition-all duration-300 w-full"
                  : "hover:bg-slate-700 flex items-center gap-x-2 px-2 py-1.5 rounded-lg transition-all duration-300 w-full"
              }
            >
              {language === "en" ? "Albums" : "آلبوم ها"}
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="bg-zinc-950 p-8 overflow-y-auto">
        <div className="mx-auto max-w-screen-lg flex flex-col gap-y-12">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminPageLayout;
