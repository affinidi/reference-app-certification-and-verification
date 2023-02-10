import { FC } from 'react'
import Image from 'next/image'

import IssuedIcon from 'public/images/illustration-issued.svg'
import QrScanSuccess from 'public/images/illustration-qr-scan-success.svg'
import QrScanError from 'public/images/illustration-qr-scan-error.svg'
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
          <Image
            src={IssuedIcon}
            alt="Successfully issued"
          /> :
          <Image
            src={QrScanSuccess}
            alt="Valid VC"
          /> :
        <Image
          src={QrScanError}
          alt="Invalid VC"
        />
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
