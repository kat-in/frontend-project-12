import { toast, Bounce } from 'react-toastify'

const notify = (message, type = 'info') => {
  const fn = toast[type] || toast.info

  fn(message, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
    transition: Bounce,
  })
}

export default notify
