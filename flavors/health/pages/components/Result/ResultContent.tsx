import { FC } from 'react'

import { IssuedIllustration } from 'assets/issued-illustration'
import { QrScanSuccessIllustration } from 'assets/qr-scan-success-illustration'
import { QrScanErrorIllustration } from 'assets/qr-scan-error-illustration'
import { messages } from 'utils/messages'

import * as S from './Result.styled'

export type ResultContentProps = {
  isValid: boolean
  isIssuance?: boolean
}

export const ResultContent: FC<ResultContentProps> = ({ isValid, isIssuance }) => (
  <>
    <S.ImgWrapper>
      {isValid ? isIssuance ?
          <IssuedIllustration /> :
          <QrScanSuccessIllustration /> :
        <QrScanErrorIllustration />
      }
    </S.ImgWrapper>

    <S.ResultTitle
      variant="h5"
      $isVerified={isValid}
      $isIssuance={isIssuance}
    >
      {isValid ? (isIssuance ? messages.issuer.result.content.issued : messages.verifier.result.content.valid) : messages.verifier.result.content.invalid}
    </S.ResultTitle>
  </>
)
