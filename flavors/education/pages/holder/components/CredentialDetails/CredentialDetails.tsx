import { FC } from 'react'
import Image from 'next/image'

import { Typography } from 'components'
import mortarBoard from 'public/images/mortar-board.svg'

import * as S from './CredentialDetails.styled'

export type CredentialDetailsProps = {
  courseTitle: string
  studentName: string
  institution: string
  dateOfCompletion: string
  qrCode: string
}

export const CredentialDetails: FC<CredentialDetailsProps> = ({
  courseTitle,
  studentName,
  institution,
  dateOfCompletion,
  qrCode,
}) => (
  <S.DetailsCard>
    <S.DataCard>
      <Image src={mortarBoard} alt='Mortar Board' aria-label='mortar-board' />

      <S.DataCardInnerContainer justifyContent='space-between'>
        <div className='grid grid-row-3 sm:grid-row-4'>
          <S.Data variant='h5'>{courseTitle}</S.Data>
          <S.Data variant='s1'>{studentName}</S.Data>
        </div>

        <div className='grid sm:grid-cols-2 gap-y-7'>
          <div className='grid'>
            <Typography variant='p3'>Issuing institution</Typography>
            <S.Data variant='p4'>{institution}</S.Data>
          </div>

          <div className='grid'>
            <Typography variant='p3'>Date of completion</Typography>
            <S.Data variant='p4'>{dateOfCompletion}</S.Data>
          </div>
        </div>
      </S.DataCardInnerContainer>
    </S.DataCard>

    <S.QrCodeCard>
      <img src={qrCode} alt='QR Code' />
    </S.QrCodeCard>
  </S.DetailsCard>
)

export default CredentialDetails
