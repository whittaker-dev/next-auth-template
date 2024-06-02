import { ToastPosition, toast } from "react-toastify";
export const showErrorMessage = (message: string, position?: ToastPosition) => {
  console.log("object");
  return toast(message, {
    theme: "colored",
    type: "error",
    position: position ?? "top-center",
    autoClose: 1000,

  });
};
