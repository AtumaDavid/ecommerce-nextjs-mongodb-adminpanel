import React, { ReactNode, createContext, useContext, useState } from "react";
import Toast from "../components/Toast";

type ToastMessage = {
  type: "success" | "error";
  message: string;
};

type ToastContextType = {
  showToast: (toast: ToastMessage, duration?: number) => void;
};

type ToastProviderProps = {
  children: ReactNode;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
    duration: number;
  } | null>(null);

  const showToast = (
    { type, message }: ToastMessage,
    duration: number = 3000
  ) => {
    setToast({ type, message, duration });
  };

  const handleClose = () => {
    setToast(null);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={handleClose}
          duration={toast.duration}
        />
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
