import { FC, useEffect } from 'react'
import { useRouter } from 'next/router'

import { JSONLD_CONTEXT_URL } from 'utils/schema'
import { VerifiableCredential } from 'types/vc'
import { useGetVcsQuery } from 'hooks/holder/api'
import { useAuthContext } from 'hooks/useAuthContext'
import { EmptyStateIllustration } from 'assets/empty-state-illustration'
import { Container, Header, Spinner, Typography } from 'components'
import { messages } from 'utils/messages'
import { ErrorCodes } from 'enums/errorCodes'

import CredentialCard from './components/CredentialCard/CredentialCard'
import { useFourColumns } from './home.theme'
import * as S from './index.styled'

const Home: FC = () => {
  const router = useRouter()
  const { authState, updateAuthState } = useAuthContext()
  const { data, error } = useGetVcsQuery()

  useEffect(() => {
    if (error?.response?.data?.error?.code === ErrorCodes.JWT_EXPIRED_ERROR) {
      updateAuthState({
        authorizedAsHolder: false,
      })
    }
  }, [error, router, updateAuthState])

  if (!authState.authorizedAsHolder) {
    return <Spinner />
  }

  if (!data) {
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
          <div className='grid justify-content-center'>
            {error && <Typography variant='e1'>{error?.message}</Typography>}
          </div>
        </Container>
      </>
    )
  }

  const matchingVcs = (data.vcs as VerifiableCredential[]).filter((vc) =>
    vc['@context'].includes(JSONLD_CONTEXT_URL)
  )

  return (
    <>
      <Header title={messages.holder.home.title} />

      <S.Wrapper>
        {matchingVcs.length === 0 && (
          <Container>
            <div className='grid justify-content-center'>
              <Typography align='center' variant='p2'>
                {messages.holder.home.noVcs}
              </Typography>
              <S.IconContainer>
                <EmptyStateIllustration />
              </S.IconContainer>
            </div>
          </Container>
        )}

        {matchingVcs.length > 0 && (
          <Container>
            <div
              className={`grid lg:grid-cols-2 ${
                useFourColumns ? 'xl:grid-cols-4' : 'xl:grid-cols-3'
              } gap-12 lg:gap-16`}
            >
              {matchingVcs.map((vc: VerifiableCredential) => (
                <CredentialCard key={vc.id} vc={vc} />
              ))}
            </div>
          </Container>
        )}
      </S.Wrapper>
    </>
  )
}

export default Home
