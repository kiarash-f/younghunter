import { useLanguage } from "../context/useLanguageContext";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { IoMdRemove } from "react-icons/io";

function ConfirmDelete({
  englishTitle,
  persianTitle,
  onClose,
  disabled,
  onConfirm,
  isRemoving
}) {
  const { language } = useLanguage();
  return (
    <div>
      <h2 className="font-bold mb-4 text-base text-neutral-200">
        {language === "en"
          ? `Are you sure about deleting ${englishTitle} ?`
          : `آیا از حذف ${persianTitle} مطمئن هستید ؟`}
      </h2>
      <div className="flex justify-between items-center gap-x-16">
        <button
          className="adminRoleBtn flex items-center justify-between flex-1 bg-red-600 text-neutral-200"
          onClick={onConfirm}
          disabled={disabled}
        >
          {isRemoving ? "..." : <span>{language === "en" ? "Confirm" : "تایید"}</span>}
          <IoCheckmarkDoneSharp className="w-5 h-5" />
        </button>
        <button
          className="adminRoleBtn flex items-center justify-between flex-1 bg-teal-600 text-neutral-200"
          onClick={onClose}
          disabled={disabled}
        >
          <span>{language === "en" ? "Cancell" : "لغو"}</span>
          <IoMdRemove className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default ConfirmDelete;
