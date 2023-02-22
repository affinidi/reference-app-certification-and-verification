import { FC } from 'react'
import { useRouter } from 'next/router'

import { ROUTES } from 'utils'
import { CredentialIcon } from 'assets/credential-icon'
import { Box, Typography } from 'components'

import * as S from './CredentialCard.styled'

export type CredentialCardProps = {
  vc: any
}

const CredentialCard: FC<CredentialCardProps> = ({ vc }) => {
  const router = useRouter()

  const credential = {
    title: `${vc?.credentialSubject.patient.name} ${vc?.credentialSubject.prescribedAt}`,
    medicationName: vc?.credentialSubject.medicationName,
    credentialId: vc?.id,
  }

  const handleClick = () => {
    router.push(`${ROUTES.holder.credential}/${credential.credentialId}`)
  }

  return (
    <S.CredentialCard direction='row' gap={12} onClick={handleClick}>
      <S.ImageWrapper justifyContent='center' alignItems='center'>
        <CredentialIcon />
      </S.ImageWrapper>

      <Box direction='row' gap={4}>
        <Box>
          <Typography variant='h7'>{credential.title}</Typography>
          <Typography variant='p3'>{credential.medicationName}</Typography>
        </Box>
      </Box>
    </S.CredentialCard>
  )
}

export default CredentialCard
