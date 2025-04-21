import { createContext, useContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useLocalStorage("language", "en");
  const [direction, setDirection] = useLocalStorage("direction", "ltr");

  const changeLanguage = (lang) => {
    setLanguage(lang);
    setDirection(lang === "en" ? "ltr" : "rtl");
  };

  return (
    <LanguageContext.Provider value={{ changeLanguage, direction, language }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  return context;
};
