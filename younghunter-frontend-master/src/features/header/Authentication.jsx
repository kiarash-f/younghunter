import { useState } from "react";
import Modal from "../../ui/Modal";
import Login from "./Login";
import { useLanguage } from "../../context/useLanguageContext";
import { FaChevronDown } from "react-icons/fa6";
import toast from "react-hot-toast";
import { useAdmin } from "../../context/useAdminContext";
import useUsers from "../../hooks/useUsers";
import useOutsideClick from "../../hooks/useOutsideClick";
import { logout } from "../../hooks/useAuth";

function Authentication() {
  const [openModal, setOpenModal] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const { isAdmin } = useAdmin();
  const { error, isError, isLoading, users } = useUsers();
  const { language } = useLanguage();
  const ref = useOutsideClick(() => setIsDropDownOpen(false));

  if (isError) return toast.error(error.response.data.message);
  if (isLoading) return <div className="font-bold text-3xl px-3 w-28">...</div>;

  const findAdmin = users.find((user) => user.role === "admin");

  return (
    <>
      {!isAdmin ? (
        <button
          className="text-sm font-semibold border border-gray-400 md:mx-2 md:w-28 px-3 py-1.5 rounded-xl shadow-md shadow-slate-800 dark:border-neutral-200 dark:shadow-transparent w-full mx-auto transition-all duration-300"
          onClick={() => setOpenModal(true)}
        >
          {language === "en" ? "Login" : "ورود"}
        </button>
      ) : (
        <button
          className="px-3 md:w-28 text-sm font-bold inline-flex items-center justify-between py-2 rounded-xl shadow-md shadow-slate-800 dark:border-neutral-200 dark:shadow-transparent w-full mx-auto transition-all duration-300 border border-gray-400"
          onClick={() => setIsDropDownOpen(!isDropDownOpen)}
        >
          <span>{findAdmin.name}</span>
          <FaChevronDown className="w-3 h-3" />
        </button>
      )}

      {openModal && (
        <Modal
          title={openModal && language === "en" ? "Login" : "ورود"}
          onClose={() => setOpenModal(false)}
        >
          <Login setOpenModal={setOpenModal} />
        </Modal>
      )}

      {isDropDownOpen && (
        <div
          ref={ref}
          className={`absolute text-sm font-bold text-red-700 md:-bottom-10 bottom-48 md:w-28 w-64 origin-bottom-right rounded-md shadow-md shadow-slate-800 dark:shadow-transparent dark:bg-black bg-neutral-200  hover:bg-neutral-100 ring-1 ring-black ring-opacity-5 z-10 px-2 items-center justify-between dark:border-neutral-200 mx-auto transition-all duration-300 p-1.5 border border-t-0 border-gray-400 ${
            language === "en" ? "md:right-[9rem]" : "md:left-[9rem]"
          }`}
        >
          <button className="w-full px-1 flex items-start" onClick={logout}>
            <span>{language === "en" ? "Logout" : "خروج"}</span>
          </button>
        </div>
      )}
    </>
  );
}

export default Authentication;
