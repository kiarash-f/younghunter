import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export default function OpenModalProvider({ children }) {
  const [openModal, setOpenModal] = useState(false);



  return (
    <ModalContext.Provider value={{ openModal, setOpenModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export const useModal = () => useContext(ModalContext);