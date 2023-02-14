import { StoredW3CCredential } from 'services/cloud-wallet/cloud-wallet.api'

export const isCredentialExpired = (vc: StoredW3CCredential) => {
  // TODO: what is the proper check?
  // const credentialSubject = vc?.credentialSubject
  // return Date.now() > Date.parse(credentialSubject?.dateOfCompletion)
  return false
}
