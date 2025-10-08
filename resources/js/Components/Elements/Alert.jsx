import Swal from "sweetalert2";
import { useEffect } from "react";

const Alert = ({
  isOpen,
  icon = "info",
  title = "",
  text = "",
  confirmText = "OK",
  cancelText = "Batal",
  showCancel = false,
  onConfirm,
  onCancel,
}) => {
  useEffect(() => {
    if (isOpen) {
      Swal.fire({
        icon,
        title,
        text,
        showCancelButton: showCancel,
        confirmButtonText: confirmText,
        cancelButtonText: cancelText,
        reverseButtons: true,
        buttonsStyling: false,
        customClass: {
          actions: "flex justify-center space-x-3",
          confirmButton:
            "bg-[#A8E6CF] text-white px-4 py-2 rounded hover:bg-[#8CCFB1]",
          cancelButton:
            "bg-[#F275A1] text-white px-4 py-2 rounded hover:bg-[#D95C8A]",
        },
      }).then((result) => {
        if (result.isConfirmed && onConfirm) {
          onConfirm();
        } else if (result.dismiss === Swal.DismissReason.cancel && onCancel) {
          onCancel();
        }
      });
    }
  }, [isOpen]);

  return null;
};

export const showSuccess = ({
  title = "Berhasil!",
  text = "",
  confirmText = "OK",
  onConfirm,
}) => {
  return Swal.fire({
    icon: "success",
    title,
    text,
    confirmButtonText: confirmText,
    buttonsStyling: false,
    showCancelButton: false,
    customClass: {
      actions: "flex justify-center",
      confirmButton:
        "bg-[#52BA5E] text-white px-4 py-2 rounded hover:bg-[#429a4d]",
    },
  }).then((result) => {
    if (result.isConfirmed && onConfirm) {
      onConfirm();
    }
  });
};

export const showError = ({
  title = "Gagal!",
  text = "Terjadi kesalahan.",
  confirmText = "OK",
  onConfirm,
}) => {
  return Swal.fire({
    icon: "error",
    title,
    text,
    confirmButtonText: confirmText,
    buttonsStyling: false,
    showCancelButton: false,
    customClass: {
      actions: "flex justify-center",
      confirmButton:
        "bg-[#F275A1] text-white px-4 py-2 rounded hover:bg-[#D95C8A]",
    },
  }).then((result) => {
    if (result.isConfirmed && onConfirm) {
      onConfirm();
    }
  });
};

export default Alert;
