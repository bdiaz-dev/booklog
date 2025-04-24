import React, { createContext, useContext, useState } from "react";
import { useBookActions } from "@/hooks/useBookActions";

interface BookItemContextProps {
  showInfo: boolean;
  setShowInfo: React.Dispatch<React.SetStateAction<boolean>>;
  showDeleteModal: boolean;
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  showFeedback: boolean;
  setShowFeedback: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  showError: boolean;
  setShowError: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirm: () => Promise<void>;
  isDeleting: boolean;
}

const BookItemContext = createContext<BookItemContextProps | undefined>(undefined);

export const BookItemProvider: React.FC<{ children: React.ReactNode; book: any }> = ({ children, book }) => {
  const [showInfo, setShowInfo] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const { handleRemoveBookClick, isDeleting } = useBookActions(setShowError);

  const onConfirm = async () => {
    await handleRemoveBookClick(!!book.volumeInfo ? book.id : book.googleId, setIsLoading);
    setShowDeleteModal(false);
  };

  return (
    <BookItemContext.Provider
      value={{
        showInfo,
        setShowInfo,
        showDeleteModal,
        setShowDeleteModal,
        showFeedback,
        setShowFeedback,
        isLoading,
        setIsLoading,
        showError,
        setShowError,
        onConfirm,
        isDeleting,
      }}
    >
      {children}
    </BookItemContext.Provider>
  );
};

export const useBookItemContext = () => {
  const context = useContext(BookItemContext);
  if (!context) {
    throw new Error("useBookItemContext must be used within a BookItemProvider");
  }
  return context;
};
