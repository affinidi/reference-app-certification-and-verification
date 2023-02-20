import { useMutation } from '@tanstack/react-query'
import { verifierService } from 'services/verifier'
import { W3CCredential, VerifyCredentialOutput } from 'services/verifier/verifier.api'
import { JSONLD_CONTEXT_URL } from 'utils/schema'

type ErrorResponse = {
  name: string
  traceId: string
  message: string
  details: {
    field: string
    issue: string
    location: string
  }
}

export const verifyCredentials = (data: W3CCredential) => {
  if (!data['@context'].includes(JSONLD_CONTEXT_URL)) {
    throw new Error('Invalid vc')
  }
  return verifierService.verifyVc(data)
}

export const useVerifyCredentialsMutation = () => {
  return useMutation<VerifyCredentialOutput | undefined, ErrorResponse, W3CCredential, () => void>(
    (data: W3CCredential) => verifyCredentials(data),
  )
}
