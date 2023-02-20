import { SyntheticEvent, useEffect } from 'react'
import { useRouter } from 'next/router'

import { useSessionStorage } from 'hooks/useSessionStorage'
import { useConfirmSignIn } from 'pages/components/ConfirmSignInForm/useConfirmSignIn'
import { useAuthContext } from 'hooks/useAuthContext'
import { useSignInMutation, useConfirmSignInMutation } from 'hooks/holder/api'

import { ROUTES } from 'utils'

export const useHolderConfirmSignIn = () => {
  const storage = useSessionStorage()
  const router = useRouter()
  const { authState, updateAuthState } = useAuthContext()
  const { data, error, mutateAsync, isLoading, reset } = useConfirmSignInMutation()
  const { data: signInData, mutateAsync: signInMutateAsync } = useSignInMutation()
  const { computedCode, inputs, isButtonDisabled, resetInputs } = useConfirmSignIn(error)

  useEffect(() => {
    if (error && computedCode.length < 6) {
      reset()
    }
  }, [computedCode, error, reset])

  const handleResendCode = async () => {
    reset()
    resetInputs()
    if (!authState.username) {
      router.push(ROUTES.holder.signIn)
      return
    }
    await signInMutateAsync({ username: authState.username })
  }

  const onSubmit = async (e?: SyntheticEvent) => {
    e?.preventDefault()

    await mutateAsync({
      token: storage.getItem('signUpToken') || '',
      confirmationCode: computedCode,
    })
  }

  useEffect(() => {
    if (data && !authState.authorizedAsHolder) {
      storage.setItem('accessToken', data.accessToken)
      updateAuthState({
        loading: false,
        authorizedAsHolder: true,
      })

      if (authState.vcOfferToken) {
        router.push(ROUTES.holder.claimVc)
      }
    }

    if (authState.username === '') {
      router.push(ROUTES.holder.signIn)
    }
  }, [authState, data, error, router, storage, updateAuthState])

  useEffect(() => {
    if (signInData) {
      storage.setItem('signUpToken', signInData.token)
    }
  }, [signInData, storage])

  return { error, onSubmit, inputs, isButtonDisabled, handleResendCode, isLoading }
}
