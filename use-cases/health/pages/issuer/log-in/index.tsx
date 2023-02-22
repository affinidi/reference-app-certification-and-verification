import { FC, FormEvent, useEffect, useState } from 'react'

import { useLocalStorage } from 'hooks/useLocalStorage'
import { useCheckCredentialsMutation } from 'hooks/issuer/api'
import { useAuthContext } from 'hooks/useAuthContext'
import { notifyError } from 'utils/notification'
import { Box, Container, ContainerForm, Header, Input, Title} from 'components'

import * as S from './index.styled'

const IssuerLogIn: FC = () => {
  const { setItem } = useLocalStorage()
  const { updateAuthState } = useAuthContext()
  const { mutate, isSuccess, isError, isLoading, reset } =
    useCheckCredentialsMutation()

  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const handleLogIn = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    mutate({ login, password })
  }

  useEffect(() => {
    if (isSuccess) {
      setItem('issuerLogin', login)
      setItem('issuerPassword', password)
      updateAuthState({ authorizedAsIssuer: true })
    }
  }, [isSuccess])

  useEffect(() => {
    reset()
  }, [login, password])

  useEffect(() => {
    if (isError) {
      notifyError(new Error('Incorrect user name or password'))
    }
  }, [isError])

  return (
    <>
      <Header title='Admin login' />

      <Container>
        <div className="grid lg:grid-cols-3 lg:gap-16">
          <ContainerForm className="lg:col-start-2" onSubmit={handleLogIn}>
            <Title>Please enter your user name and password to log in.</Title>

            <Box gap={24}>
              <Input
                id='userName'
                type='email'
                label='Username'
                placeholder='Enter user name'
                onChange={setLogin}
                hasError={isError}
              />

              <Input
                id='password'
                type='password'
                label='Password'
                placeholder='Enter your password'
                onChange={setPassword}
                hasError={isError}
              />
            </Box>

            <S.ButtonWrapper
              fullWidth
              disabled={isLoading}
              loading={isLoading}
              type='submit'
            >
              log in
            </S.ButtonWrapper>
          </ContainerForm>
        </div>
      </Container>
    </>
  )
}

export default IssuerLogIn
