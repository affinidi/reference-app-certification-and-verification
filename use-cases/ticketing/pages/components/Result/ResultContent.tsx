import { FC } from 'react'

import { IssuedIllustration } from 'assets/issued-illustration'
import { QrScanSuccessIllustration } from 'assets/qr-scan-success-illustration'
import { QrScanErrorIllustration } from 'assets/qr-scan-error-illustration'
import { messages } from 'utils/messages'
import { ErrorResponse } from 'types/error'
import { ErrorCodes } from 'enums/errorCodes'

import * as S from './Result.styled'

export type ResultContentProps = {
  isValid: boolean
  isIssuance?: boolean
  error?: Partial<ErrorResponse> | null
}

export const ResultContent: FC<ResultContentProps> = ({
  isValid,
  isIssuance,
  error,
}) => {
  const resultMessage = () => {
    if (isValid) {
      return isIssuance
        ? messages.issuer.result.content.issued
        : messages.verifier.result.content.valid
    }

    return error?.code === ErrorCodes.SCAN_ERROR
      ? messages.verifier.result.content.scanError
      : messages.verifier.result.content.invalid
  }
  return (
    <>
      <S.ImgWrapper>
        {isValid ? (
          isIssuance ? (
            <IssuedIllustration />
          ) : (
            <QrScanSuccessIllustration />
          )
        ) : (
          <QrScanErrorIllustration />
        )}
      </S.ImgWrapper>

      <S.ResultTitle
        align='center'
        variant='h5'
        $isVerified={isValid}
        $isIssuance={isIssuance}
      >
        {resultMessage()}
      </S.ResultTitle>
    </>
  )
}
