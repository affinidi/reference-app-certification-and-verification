import { StoredW3CCredential } from 'services/cloud-wallet/cloud-wallet.api'

export const isCredentialExpired = (vc: StoredW3CCredential) => {
  const credentialSubject = vc?.credentialSubject
  return Date.now() > Date.parse(credentialSubject?.startDate)
}