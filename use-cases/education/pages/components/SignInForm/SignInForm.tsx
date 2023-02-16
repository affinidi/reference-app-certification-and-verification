import { Dispatch, FC, FormEvent, SetStateAction } from 'react'

import { Container, ContainerForm, Header, Input } from 'components'

import * as S from './SigninForm.styled'

type SignInFormProps = {
  handleSignIn(e: FormEvent): void
  setUsername(username: string): void
  disabled: boolean
  isLoading: boolean
  error: Error | null
  inputError: string | null
  setInputError: Dispatch<SetStateAction<string | null>>
  role: 'holder' | 'issuer'
}

export const SignInForm: FC<SignInFormProps> = ({
  handleSignIn,
  setUsername,
  disabled,
  error,
  inputError,
  setInputError,
  isLoading,
  role,
}) => {
  const handleChange = (value: string) => {
    if (inputError) {
      setInputError(null)
    }

    setUsername(value)
  }

  console.log('role0', role)

  if (role === 'holder') {
    role = 'Log in'
  } else if (role === 'issuer') {
    role = 'Admin login'
  }

  return (
    <>
      <Header title={role} />

      <Container>
        <div className='grid lg:grid-cols-3 lg:gap-16'>
          <ContainerForm className='lg:col-start-2' onSubmit={handleSignIn}>
            <S.Title variant='p1'>
              Please enter your email address and password to log in.
            </S.Title>

            <Input
              id='email'
              type='email'
              label='Email address'
              placeholder='Enter your email address'
              onChange={handleChange}
              hasError={Boolean(inputError || error?.message)}
              helpText={inputError || error?.message}
            />

            {/* <Input
              id='password'
              type='password'
              label='Password'
              placeholder='Enter your Password'
              onChange={handleChange}
              hasError={Boolean(inputError || error?.message)}
              helpText={inputError || error?.message}
            /> */}

            <S.ButtonWrapper
              fullWidth
              disabled={disabled}
              loading={isLoading}
              type='submit'
            >
              LOG IN
            </S.ButtonWrapper>
          </ContainerForm>
        </div>
      </Container>
    </>
  )
}
