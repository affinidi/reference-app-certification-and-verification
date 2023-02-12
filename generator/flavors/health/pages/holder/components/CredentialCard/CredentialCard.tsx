import { FC } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'

import { ROUTES } from 'utils'
import { Credential } from 'pages/holder/types'
import CredentialIcon from 'public/images/icon-credential.svg'
import { Box, Typography } from 'components'

import * as S from './CredentialCard.styled'

export type PrescriptionCardProps = {
  credential: Credential
}

const CredentialCard: FC<PrescriptionCardProps> = ({ credential }) => {
  const router = useRouter()

  const handleClick = () => {
    router.push(`${ROUTES.holder.credential}/${credential.credentialId}`)
  }

  return (
    <S.Credential
      direction="row"
      gap={12}
      onClick={handleClick}
    >
      <S.ImageWrapper
        justifyContent="center"
        alignItems="center"
      >
        <Image
          src={CredentialIcon}
          alt="Prescription"
        />
      </S.ImageWrapper>

      <Box
        direction="row"
        gap={4}
      >
        <Box>
          <Typography variant="c1">Start Date</Typography>
          <Typography variant="p4">{credential.date}</Typography>
        </Box>
        <Box>
          <Typography variant="c1">Start Time</Typography>
          <Typography variant="p4">{credential.time}</Typography>
        </Box>
      </Box>
    </S.Prescription>
  )
}

export default CredentialCard
