import { SyntheticEvent, useEffect } from 'react'
import { useRouter } from 'next/router'

import { useLocalStorage } from 'hooks/useLocalStorage'
import { useConfirmSignIn } from 'pages/components/ConfirmSignInForm/useConfirmSignIn'
import { useAuthContext } from 'hooks/useAuthContext'
import { useSignInMutation, useConfirmSignInMutation } from 'hooks/holder/api'

import { ROUTES } from 'utils'

export const useHolderConfirmSignIn = () => {
  const storage = useLocalStorage()
  const router = useRouter()
  const { authState, updateAuthState } = useAuthContext()
  const { data, error, mutate, isLoading } = useConfirmSignInMutation()
  const { data: signInData, mutateAsync: signInMutateAsync } = useSignInMutation()
  const { computedCode, inputs, isButtonDisabled } = useConfirmSignIn(error?.message)

  const handleResendCode = async () => {
    if (!authState.username) {
      router.push(ROUTES.holder.signIn)
      return
    }
    await signInMutateAsync({ username: authState.username })
  }

  const onSubmit = async (e?: SyntheticEvent) => {
    e?.preventDefault()

    mutate({
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
