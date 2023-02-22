import React from 'react'
import { toast as reactToast, ToastContainerProps, ToastOptions } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { WarningFilledIcon } from 'assets/warning-filled-icon'
import { CloseFilledIcon } from 'assets/close-filled-icon'
import { InfoFilledIcon } from 'assets/info-filled-icon'
import { CheckCircleFilledIcon } from 'assets/check-circle-filled-icon'

import * as S from './Toast.styled'

const Icons = {
  info: <InfoFilledIcon />,
  warning: <WarningFilledIcon />,
  error: <CloseFilledIcon />,
  success: <CheckCircleFilledIcon />,
  default: <InfoFilledIcon />,
}

export interface ToastProps extends ToastOptions {
  children: React.ReactNode
}

export const ToastsContainer: React.FC<ToastContainerProps> = (props) => (
  <S.Container theme="dark" closeButton={false} {...props} />
)

const ToastLayout: React.FC<ToastProps> = ({ children }) => (
  <S.Message variant="p2" tag="div">
    {children}
  </S.Message>
)

export const toast = (message: string, { type, ...restProps }: Omit<ToastProps, 'children'>) => {
  if (type) {
    return reactToast(<ToastLayout>{message}</ToastLayout>, {
      icon: () => Icons[type],
      hideProgressBar: true,
      type,
      ...restProps,
    })
  }

  return reactToast(message, { ...restProps, type })
}
