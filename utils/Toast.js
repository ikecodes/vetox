import { toast } from "react-toastify"

// toast.configure()
const Toast = (msg, type) => {
  toast(msg, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    type,
  })
}

export default Toast
