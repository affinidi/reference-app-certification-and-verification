import { FC } from 'react'
import Image from 'next/image'

import { JSON_SCHEMA_URL } from 'utils/schema'
import { StoredW3CCredential } from 'services/cloud-wallet/cloud-wallet.api'
import { useCredentialsQuery } from 'hooks/holder/useCredentials'
import { useAuthContext } from 'hooks/useAuthContext'
import NoData from 'public/images/illustration-empty-state.svg'
import { Container, Header, Spinner, Typography } from 'components'

import CredentialCard from './components/CredentialCard/CredentialCard'
import * as S from './index.styled'
import { messages } from '../../utils/messages'

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

  const vcs = data.filter((credentialItem) => {
    const credentialSchema = (credentialItem as StoredW3CCredential).credentialSchema
    return credentialSchema?.id === JSON_SCHEMA_URL
  })

  if (vcs.length === 0) {
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

  // @ts-ignore
  const validVcs: StoredW3CCredential[] = vcs.filter((credentialItem) => {
    const credentialSubject = (credentialItem as StoredW3CCredential)?.credentialSubject
    return Date.parse(credentialSubject?.startDate) >= Date.now()
  })

  const getCredentialCards = ({
    vcs,
  }: {
    vcs: StoredW3CCredential[]
  }) =>
    vcs.map((vc: StoredW3CCredential) => {
      return (
        <CredentialCard
          key={vc.id}
          vc={vc}
        />
      )
    })

  return (
    <>
      <Header title={messages.holder.home.title} />

      {validVcs.length > 0 && (
        <Container>
          <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-12 lg:gap-16">
            {getCredentialCards({ vcs: validVcs })}
          </div>
        </Container>
      )}
    </>
  )
}

export default Home
