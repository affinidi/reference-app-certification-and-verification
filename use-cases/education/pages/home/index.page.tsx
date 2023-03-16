import { FC } from 'react'
import { useRouter } from 'next/router'

import { ROUTES } from 'utils'
import { WalletIcon } from 'assets/wallet-icon'
import { DigitalCheckIcon } from 'assets/digital-check-icon'
import { BulkIssuanceIcon } from 'assets/bulk-issuance-icon'
import { Box, Container, Header, Typography } from 'components'

import * as S from './home.styled'
import { messages } from '../../utils/messages'

export const Home: FC = () => {
  const router = useRouter()

  return (
    <>
      <Header title="Home" />

      <Container title="Please select one of the following options">
        <S.Wrapper className="grid lg:grid-cols-3 gap-12 lg:gap-16">

          <S.Card
            alignItems="center"
            direction="row"
            justifyContent="space-between"
            gap={8}
            onClick={() => router.push(ROUTES.issuer.credentialForm)}
          >
            <Box gap={16}>
              <Typography variant="h6">{messages.home.issuer.title}</Typography>
              <Typography variant="p1">
                {messages.home.issuer.description}
              </Typography>
            </Box>
            <S.Icon>
              <BulkIssuanceIcon />
            </S.Icon>
          </S.Card>

          <S.Card
            alignItems="center"
            direction="row"
            justifyContent="space-between"
            gap={8}
            onClick={() => router.push(ROUTES.holder.home)}
          >
            <Box gap={16}>
              <Typography variant="h6">{messages.home.holder.title}</Typography>
              <Typography variant="p1">
                {messages.home.holder.description}
              </Typography>
            </Box>
            <S.Icon>
              <WalletIcon />
            </S.Icon>
          </S.Card>

          <S.Card
            alignItems="center"
            direction="row"
            justifyContent="space-between"
            gap={8}
            onClick={() => router.push(ROUTES.verifier.welcome)}
          >
            <Box gap={16}>
              <Typography variant="h6">{messages.home.verifier.title}</Typography>
              <Typography variant="p1">
                {messages.home.verifier.description}
              </Typography>
            </Box>
            <S.Icon>
              <DigitalCheckIcon />
            </S.Icon>
          </S.Card>
        </S.Wrapper>
      </Container>
    </>
  )
}
export default Home
