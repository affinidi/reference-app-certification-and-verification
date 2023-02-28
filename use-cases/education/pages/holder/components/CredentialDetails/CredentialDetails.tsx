import { FC } from 'react'

import { Typography } from 'components'
import { MortarBoardIcon } from 'assets/mortar-board-icon'

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
      <MortarBoardIcon />

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

    <S.QrCodeCard direction='row' justifyContent="center">
      <img src={qrCode} alt='QR Code' />
    </S.QrCodeCard>
  </S.DetailsCard>
)

export default CredentialDetails
