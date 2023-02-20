import { toast } from "components/Toast/Toast"

export const notifyError = (error: any) => {
    const message = error.message || 'Unexpected error'
  
    toast(message, {
      theme: 'dark',
      type: 'error',
      hideProgressBar: true,
      position: 'top-right',
      style: {
        top: '60px',
      },
    })
  }