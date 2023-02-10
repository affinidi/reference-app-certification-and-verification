import { FC } from 'react'

import { Box, Typography } from 'components'

import * as S from './CredentialDetails.styled'

export type CredentialDetailsProps = {
  firstName: string
  lastName: string
  qrCode: string
}

export const CredentialDetails: FC<CredentialDetailsProps> = ({
  firstName,
  lastName,
  qrCode,
}) => (
  <S.CredentialDetailsCard>
    <S.DataCard>
      <Box
        justifyContent="space-between"
        gap={24}
      >
        <div className="grid grid-cols-2 lg:grid-cols-3 lg:gap-16">
          <Box>
            <Typography variant="c1">First name</Typography>
            <Typography variant="p4">{firstName} </Typography>
          </Box>
          <Box>
            <Typography variant="c1">Last name</Typography>
            <Typography variant="p4">{lastName} </Typography>
          </Box>
        </div>

        <Box>
          <Typography variant="p1">
            This is your generic VC. This QR code can only be used one time.
          </Typography>
        </Box>
      </Box>
    </S.DataCard>

    <S.QrCodeCard>
      <img
        src={qrCode}
        alt="QR Code"
      />
    </S.QrCodeCard>
  </S.CredentialDetailsCard>
)

export default CredentialDetails
