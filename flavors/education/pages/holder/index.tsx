import { FC } from 'react'

import { VC_TYPE } from 'utils/schema'
import { StoredW3CCredential } from 'services/cloud-wallet/cloud-wallet.api'
import { useCredentialsQuery } from 'hooks/holder/useCredentials'
import { useAuthContext } from 'hooks/useAuthContext'
import { EmptyStateIllustration } from 'assets/empty-state-illustration'
import { Container, Header, Spinner, Typography } from 'components'
import { messages } from 'utils/messages'
import { isCredentialExpired } from './components'

import CredentialCard from './components/CredentialCard/CredentialCard'
import * as S from './index.styled'

const Home: FC = () => {
  const { authState } = useAuthContext()
  const { data, error, isLoading } = useCredentialsQuery()

  if (!authState.authorizedAsHolder) {
    return <Spinner />
  }

  if (isLoading) {
    return (
      <>
        <Header title={messages.holder.home.title} />
        <Container>
          <Spinner />
        </Container>
      </>
    )
  }

  if (error) {
    return (
      <>
        <Header title={messages.holder.home.title} />
        <Container>
          <div className="grid justify-content-center">
            {error && <Typography variant="e1">{error?.message}</Typography>}
          </div>
        </Container>
      </>
    )
  }

  const matchingVcs = (data as StoredW3CCredential[]).filter((vc) => vc.type.includes(VC_TYPE))
  const validMatchingVcs = matchingVcs.filter((vc) => !isCredentialExpired(vc))
  const expiredMatchingVcs = matchingVcs.filter((vc) => isCredentialExpired(vc))

  return (
    <>
      <Header title={messages.holder.home.title} />

      {validMatchingVcs.length === 0 && expiredMatchingVcs.length === 0 && (
        <Container>
          <div className="grid justify-content-center">
            <Typography
              align="center"
              variant="p2"
            >
              {messages.holder.home.noVcs}
            </Typography>
            <S.IconContainer>
              <EmptyStateIllustration />
            </S.IconContainer>
          </div>
        </Container>
      )}

      {validMatchingVcs.length > 0 && (
        <Container>
          <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-12 lg:gap-16">
            {matchingVcs.map((vc: StoredW3CCredential) => (
              <CredentialCard
                key={vc.id}
                vc={vc}
              />
            ))}
          </div>
        </Container>
      )}

      {expiredMatchingVcs.length > 0 && (
        <Container>
          <S.SubTitle variant="h6">{messages.holder.home.expiredVcs}</S.SubTitle>

          <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-12 lg:gap-16">
            {matchingVcs.map((vc: StoredW3CCredential) => (
              <CredentialCard
                key={vc.id}
                vc={vc}
                expired
              />
            ))}
          </div>
        </Container>
      )}
    </>
  )
}

export default Home
