import { createContext, useContext, useState } from "react";
import { useLanguage } from "./useLanguageContext";
import useAlbums from "../hooks/useAlbums";
import useAllSubAlbums from "../hooks/useAllSubAlbumsForSingleAlbum";

const GalleryContext = createContext();

export default function GalleryContextProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { albums } = useAlbums();
  const { subAlbums } = useAllSubAlbums();
  const { language } = useLanguage();

  const handleSearch = () => {
    if (!value.trim()) return setSearchResults([]);

    const filteredAlbums = albums.filter((album) =>
      album.title[language]?.toLowerCase().includes(value.toLowerCase())
    );

    if (filteredAlbums.length > 0) return setSearchResults(filteredAlbums);

    const filteredSubAlbums = subAlbums.filter((subAlbum) =>
      subAlbum.title[language]?.toLowerCase().includes(value.toLowerCase())
    );

    if (filteredSubAlbums.length > 0)
      return setSearchResults(filteredSubAlbums);
  };

  return (
    <GalleryContext.Provider
      value={{
        isOpen,
        setIsOpen,
        value,
        setValue,
        handleSearch,
        searchResults,
      }}
    >
      {children}
    </GalleryContext.Provider>
  );
}

export const useGalleryContext = () => {
  return useContext(GalleryContext);
};
