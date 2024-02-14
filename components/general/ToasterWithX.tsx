import React from "react";
import toast, { ToastBar, Toaster } from "react-hot-toast";
import { TbX } from "react-icons/tb";

export default function ToasterWithX() {
  return (
    <Toaster>
      {(t) => (
        <ToastBar toast={t}>
          {({ icon, message }) => (
            <>
              {icon}
              {message}
              {t.type !== "loading" && (
                <button onClick={() => toast.dismiss(t.id)}>
                  <TbX />
                </button>
              )}
            </>
          )}
        </ToastBar>
      )}
    </Toaster>
  );
}
