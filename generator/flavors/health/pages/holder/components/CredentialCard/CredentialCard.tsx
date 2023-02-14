import { FC } from 'react'
import { format } from 'date-fns'
import { useRouter } from 'next/router'
import Image from 'next/image'

import { ROUTES } from 'utils'
import CredentialIcon from 'public/images/icon-credential.svg'
import { Box, Typography } from 'components'

import * as S from './CredentialCard.styled'

export type PrescriptionCardProps = {
  vc: any
  expired?: boolean
}

const CredentialCard: FC<PrescriptionCardProps> = ({ vc }) => {
  const router = useRouter()

  const credential = {
    title: vc?.credentialSubject?.eventName,
    date: format(new Date(vc?.credentialSubject?.startDate), 'dd.MM.yyyy'),
    time: format(new Date(vc?.credentialSubject?.startDate), 'HH:mm'),
    credentialId: vc?.id,
  }

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
    </S.Credential>
  )
}

export default CredentialCard
