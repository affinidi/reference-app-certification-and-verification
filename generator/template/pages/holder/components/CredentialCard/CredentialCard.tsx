import { FC } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'

import { ROUTES } from 'utils'
import CredentialIcon from 'public/images/icon-credential.svg'
import { Box, Typography } from 'components'

import * as S from './CredentialCard.styled'

export type CredentialCardProps = {
  vc: any
  expired?: boolean
}

const CredentialCard: FC<CredentialCardProps> = ({ vc }: CredentialCardProps) => {
  const router = useRouter()

  const credential = {
    firstName: vc?.credentialSubject?.firstName,
    lastName: vc?.credentialSubject?.lastName,
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
          alt="Credential"
        />
      </S.ImageWrapper>

      <Box
        direction="row"
        gap={4}
      >
        <Box>
          <Typography variant="c1">First name</Typography>
          <Typography variant="p4">{credential.firstName}</Typography>
        </Box>
        <Box>
          <Typography variant="c1">Last name</Typography>
          <Typography variant="p4">{credential.lastName}</Typography>
        </Box>
      </Box>
    </S.Credential>
  )
}

export default CredentialCard
