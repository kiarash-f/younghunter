import { useLanguage } from "../../context/useLanguageContext";
import { Link } from "react-router-dom";

function AdminAccess() {
  const { language } = useLanguage();

  return (
    <>
      <div className="flex items-center justify-center">
        <button className="bg-green-600 py-2 px-2 rounded-md md:w-28 w-full mx-auto text-black text-sm">
          <Link to="/admin">
            {language === "en" ? "Admin Access" : "دسترسی مدیریت"}
          </Link>
        </button>
      </div>
    </>
  );
}

export default AdminAccess;
