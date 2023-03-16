import { FC } from 'react'
import { useRouter } from 'next/router'

import { ROUTES } from 'utils'
import { messages } from 'utils/messages'
import { Box, Button, Container, Header } from 'components'
import { QrScanDefaultIllustration } from 'assets/qr-scan-default-illustration'

import * as S from './Verifier.styled'

const Verifier: FC = () => {
  const router = useRouter()

  return (
    <>
      <Header title="Welcome" hasBackIcon />

      <S.Wrapper>
        <Container>
        <div className="grid md:grid-cols-3 lg:grid-cols-3 lg:gap-16">
          <div className="col-span-1"></div>
            <Box alignItems="center" className="lg:col-start-2">
              <QrScanDefaultIllustration />

              <S.WelcomeMessage align="center" variant="p1">
                {messages.verifier.welcome}
              </S.WelcomeMessage>

              <Button fullWidth onClick={() => router.push(ROUTES.verifier.scan)}>SCAN QR CODE</Button>
            </Box>
          </div>
        </Container>
      </S.Wrapper>
    </>
  )
}

export default Verifier
