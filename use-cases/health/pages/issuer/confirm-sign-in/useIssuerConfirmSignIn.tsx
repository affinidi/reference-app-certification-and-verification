import { SyntheticEvent, useEffect } from 'react'
import queryString from 'query-string'
import { useRouter } from 'next/router'

import { useSessionStorage } from 'hooks/holder/useSessionStorage'
import { useConfirmSignIn } from 'pages/components/ConfirmSignInForm/useConfirmSignIn'
import {
  useIssuerConfirmSignInMutation,
  useIssuerSignInMutation,
} from 'hooks/useAuthentication'
import { useAuthContext } from 'hooks/useAuthContext'

import { ROUTES } from 'utils'

export const useIssuerConfirmSignIn = () => {
  const storage = useSessionStorage()
  const router = useRouter()
  const { authState, updateAuthState } = useAuthContext()
  const { data, error, mutateAsync, isLoading, reset } =
    useIssuerConfirmSignInMutation()
  const {
    data: signInData,
    mutateAsync: signInMutateAsync,
  } = useIssuerSignInMutation()
  const { computedCode, inputs, isButtonDisabled, resetInputs } =
    useConfirmSignIn(error)

  useEffect(() => {
    if (error && computedCode.length < 6) {
      reset()
    }
  }, [computedCode, error, reset])

  const onSubmit = async (e?: SyntheticEvent) => {
    e?.preventDefault()

    const isSignUp = queryString.parse(window.location.search).signup === 'true'

    await mutateAsync({
      token: storage.getItem('signUpToken') || '',
      confirmationCode: computedCode,
      signup: isSignUp,
    })
  }

  const handleResendCode = async () => {
    reset()
    resetInputs()
    if (!authState.username) {
      router.push(ROUTES.issuer.signIn)
      return
    }
    await signInMutateAsync({ username: authState.username })
  }

  useEffect(() => {
    if (data && !authState.authorizedAsIssuer) {
      updateAuthState({
        loading: false,
        authorizedAsIssuer: true,
      })
    }

    if (authState.username === '') {
      router.push(ROUTES.issuer.signIn)
    }
  }, [authState, data, error, router, updateAuthState])

  useEffect(() => {
    if (signInData) {
      storage.setItem('signUpToken', signInData.token)
    }
  }, [signInData, storage])

  return {
    error,
    onSubmit,
    inputs,
    isButtonDisabled,
    isLoading,
    handleResendCode,
  }
}
