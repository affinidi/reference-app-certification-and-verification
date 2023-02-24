import { FC, ReactNode } from 'react'

import { Box, Container, Header, Typography, Title } from 'components'

import { ErrorResponse } from 'types/error'
import * as S from './ConfirmSignInForm.styled'

type ConfirmSignInFormProps = {
  error: ErrorResponse | null
  onSubmit(): void
  inputs: ReactNode
  isButtonDisabled: boolean
  isLoading: boolean
  handleResendCode(): void
}

export const ConfirmSignInForm: FC<ConfirmSignInFormProps> = ({
  error,
  onSubmit,
  inputs,
  isButtonDisabled,
  isLoading,
  handleResendCode,
}) => {
  return (
    <>
      <Header title="Signin" />
      <Container>
        <div className="grid lg:grid-cols-3 lg:gap-16">
          <S.Wrapper className="lg:col-start-2">
            <Title>
              Please enter the verification code you received in your email.
            </Title>

            <form id="confirmation" onSubmit={onSubmit}>
              <Box gap={4}>
                <S.Label hasError={Boolean(error)} variant="p4">
                  Verification code
                </S.Label>

                <S.VerificationFieldContainer direction="row" gap={30}>
                  {inputs}
                </S.VerificationFieldContainer>

                {error && <Typography variant="e1">Code is incorrect, please try again.</Typography>}
              </Box>
            </form>

            <S.SignInButton
              fullWidth
              form="confirmation"
              type="submit"
              disabled={isButtonDisabled}
              loading={isLoading}
            >
              Log in
            </S.SignInButton>

            <Typography variant="s2">
              Didn’t receive a code? Click{' '}
              <Typography
                variant="l3"
                onClick={handleResendCode}
                role="button"
                tabIndex={0}
                tag="span"
              >
                here
              </Typography>{' '}
              to send it again
            </Typography>
          </S.Wrapper>
        </div>
      </Container>
    </>
  )
}
