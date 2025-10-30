import React, { createContext, useContext, useState } from "react";
import SuccessModal from "../components/SuccessModal";

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState({ isOpen: false, message: "" });

  const showSuccess = (message) => {
    setModal({ isOpen: true, message });
  };

  const closeModal = () => {
    setModal({ isOpen: false, message: "" });
  };

  return (
    <ModalContext.Provider value={{ showSuccess, closeModal }}>
      {children}
      <SuccessModal
        isOpen={modal.isOpen}
        message={modal.message}
        onClose={closeModal}
      />
    </ModalContext.Provider>
  );
};
