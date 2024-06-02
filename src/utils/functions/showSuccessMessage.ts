import { ToastPosition, toast } from "react-toastify";
export const showSuccessMessage = (
  message: string,
  position?: ToastPosition
) => {
  return toast(message, {
    type: "success",
    theme: "colored",
    position: position ?? "top-center",
    autoClose: 500,
  });
};
