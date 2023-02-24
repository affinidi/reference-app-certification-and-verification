import { toast } from "components"

export const showErrorToast = (error: any) => {
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