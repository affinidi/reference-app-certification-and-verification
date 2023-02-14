import { FC } from 'react'
import { format } from 'date-fns'
import { useRouter } from 'next/router'

import { Box, Typography } from 'components'
import { ROUTES } from 'utils'

import { CertificateDateIcon } from 'assets/certificate-date-icon'
import { MortarBoardIcon } from 'assets/mortar-board-icon'

import * as S from './CredentialCard.styled'

export type CredentialCardProps = {
  vc: any
}

const CredentialCard: FC<CredentialCardProps> = ({ vc }) => {
  const router = useRouter()

  const credential = {
    title: vc?.credentialSubject?.courseTitle,
    date: format(
      new Date(vc?.credentialSubject?.dateOfCompletion),
      'dd.MM.yyyy'
    ),
    institution: vc?.credentialSubject?.institution,
    credentialId: vc?.id,
  }

  const handleClick = () => {
    router.push(`${ROUTES.holder.credential}/${credential.credentialId}`)
  }

  return (
    <S.CredentialCard onClick={handleClick}>
      <Box gap={32}>
        <Box>
          <S.MortarBoardHatIconContainer>
            <MortarBoardIcon />
          </S.MortarBoardHatIconContainer>

          <Typography variant='h6'>{credential.title}</Typography>
          <Typography variant='s2'>{credential.institution}</Typography>
        </Box>

        <Box direction='row' gap={8}>
          <CertificateDateIcon />
          <Typography variant='s2'>{credential.date}</Typography>
        </Box>
      </Box>
    </S.CredentialCard>
  )
}

export default CredentialCard
