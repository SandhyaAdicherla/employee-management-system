import { createContext, useState } from "react";

export const ToastContext =
  createContext();

export function ToastProvider({
  children
}) {

  const [toast, setToast] =
    useState({
      show: false,
      message: "",
      type: ""
    });

  const showToast = (
    message,
    type = "success"
  ) => {

    setToast({
      show: true,
      message,
      type
    });

    setTimeout(() => {

      setToast({
        show: false,
        message: "",
        type: ""
      });

    }, 3000);

  };

  return (

    <ToastContext.Provider
      value={{ toast, showToast }}
    >

      {children}

    </ToastContext.Provider>

  );

}