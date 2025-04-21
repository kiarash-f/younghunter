import { useLanguage } from "../context/useLanguageContext";
import { useNavigate } from "react-router-dom";
import { HiArrowNarrowLeft, HiArrowNarrowRight } from "react-icons/hi";

function Empty() {
  const { language } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="flex items-start justify-center gap-x-20 h-[80vh] p-10 flex-col md:flex-row">
      <span className="text-xl font-bold">
        {language === "en" ? "No such page found!" : "چنین صفحه ای یافت نشد!"}
      </span>
      <button
        className="btn bg-gray-950 bg-opacity-85 text-sm w-36"
        onClick={() => navigate(-1)}
      >
        <span>{language === "en" ? "Navigate Up" : "بازگشت"}</span>
        {language === "en" ? (
          <HiArrowNarrowRight className="h-5 w-5" />
        ) : (
          <HiArrowNarrowLeft className="w-5 h-5" />
        )}
      </button>
    </div>
  );
}

export default Empty;
