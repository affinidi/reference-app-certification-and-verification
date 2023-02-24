import { FC } from 'react'
import { useRouter } from 'next/router'

import { ErrorResponse } from 'types/error'
import { Box, Container, Header, Spinner } from 'components'
import { messages } from 'utils/messages'

import { ResultContent } from './ResultContent'
import * as S from './Result.styled'

export type ResultProps = {
  isLoading?: boolean
  error?: Partial<ErrorResponse> | null
  isValid: boolean
  pathTo: string
}

export const Result: FC<ResultProps> = ({
  isLoading = false,
  isValid,
  error = null,
  pathTo,
}) => {
  const router = useRouter()

  const isVerifier = router.route.includes('/verifier')

  if (isLoading) {
    return (
      <>
        <Header
          title={isVerifier ? 'QR code scanned' : messages.issuer.result.title}
          hasBackIcon
        />
        <Container>
          <Spinner />
        </Container>
      </>
    )
  }

  const isResultValid = isValid && !error

  return (
    <>
      <Header
        title={isVerifier ? 'QR code scanned' : messages.issuer.result.title}
        hasBackIcon
      />

      <Container>
        <div className='grid lg:grid-cols-3 gap-12 lg:gap-16'>
          <Box className='lg:col-start-2' alignItems='center'>
            <ResultContent
              isValid={isResultValid}
              isIssuance={!isVerifier}
              error={error}
            />
            <S.ResultPara variant='p1'>
              {isVerifier
                ? isResultValid
                  ? messages.verifier.result.valid
                  : messages.verifier.result.invalid
                : messages.issuer.result.issued}
            </S.ResultPara>

            <S.IssueButton
              fullWidth
              color='quaternary'
              variant='outlined'
              onClick={() => router.push(pathTo)}
            >
              {isVerifier ? 'Scan next QR code' : messages.issuer.result.next}
            </S.IssueButton>
          </Box>
        </div>
      </Container>
    </>
  )
}
