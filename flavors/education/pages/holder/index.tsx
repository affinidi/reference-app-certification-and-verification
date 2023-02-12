import { FC } from 'react'
import Image from 'next/image'

import { VC_TYPE } from 'utils/schema'
import { StoredW3CCredential } from 'services/cloud-wallet/cloud-wallet.api'
import { useCredentialsQuery } from 'hooks/holder/useCredentials'
import { useAuthContext } from 'hooks/useAuthContext'
import NoData from 'public/images/illustration-empty-state.svg'
import { Container, Header, Spinner, Typography } from 'components'
import { messages } from 'utils/messages'
import { isCredentialValid } from './components'

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

  const vcs = (data as StoredW3CCredential[]).filter((vc) => vc.type.includes(VC_TYPE))
  const validVcs = vcs.filter((vc) => isCredentialValid(vc))

  if (validVcs.length === 0) {
    return (
      <>
        <Header title={messages.holder.home.title} />
        <Container>
          <div className="grid justify-content-center">
            <Typography
              align="center"
              variant="p2"
            >
              {messages.holder.home.noVcs}
            </Typography>
            <S.IconContainer>
              <Image
                src={NoData}
                alt="No VCs"
              />
            </S.IconContainer>
          </div>
        </Container>
      </>
    )
  }

  return (
    <>
      <Header title={messages.holder.home.title} />

      {validVcs.length > 0 && (
        <Container>
          <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-12 lg:gap-16">
            {vcs.map((vc: StoredW3CCredential) => (
              <CredentialCard
                key={vc.id}
                vc={vc}
              />
            ))}
          </div>
        </Container>
      )}
    </>
  )
}

export default Home
