import { createContext, useContext, useState } from "react";

const AccordionContext = createContext();

export const AccordionProvider = ({ children }) => {
  const [openSubAlbumId, setOpenSubAlbumId] = useState(null);

  const openAccordion = (id) => {
    setOpenSubAlbumId(id);
  };

  const closeAccordion = () => {
    setOpenSubAlbumId(null);
  };

  return (
    <AccordionContext.Provider
      value={{ openSubAlbumId, openAccordion, closeAccordion }}
    >
      {children}
    </AccordionContext.Provider>
  );
};

export const useAccordion = () => {
  const context = useContext(AccordionContext);
  return context;
};
