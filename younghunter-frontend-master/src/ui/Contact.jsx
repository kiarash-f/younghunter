import {
  FaInstagram,
  FaTelegram,
  FaWhatsapp,
  FaXTwitter,
} from "react-icons/fa6";
import { useLanguage } from "../context/useLanguageContext";

function Contact() {
  const { language } = useLanguage();

  return (
    <div className="">
      <div className="flex w-full items-center justify-center gap-x-3">
        <button className="btn bg-black">
          <span className="text-[12px]">
            {language === "en" ? "WhatsApp" : "واتس اپ"}
          </span>
          <FaWhatsapp className="w-5 h-5" />
        </button>
        <button className="btn bg-black">
          <span className="text-[12px]">
            {language === "en" ? "Instagram" : "اینستاگرام"}
          </span>
          <FaInstagram className="w-5 h-5" />
        </button>
      </div>
      <hr className="md:w-full min-w-[250px] mt-2 h-[1px] bg-gradient-to-r from-[rgba(255,255,255,0.75)] via-black to-[rgba(255,255,255,0.75)] border-none" />
      <div className="flex w-full items-center justify-center gap-x-3 mt-2">
        <button className="btn bg-black">
          <span className="text-[12px]">
            {language === "en" ? "Telegram" : "تلگرام"}
          </span>
          <FaTelegram className="w-5 h-5" />
        </button>
        <button className="btn bg-black">
          <span className="text-[12px]">
            {language === "en" ? "X" : "ایکس"}
          </span>
          <FaXTwitter className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default Contact;
