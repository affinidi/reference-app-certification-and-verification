import { StoredW3CCredential } from 'services/cloud-wallet/cloud-wallet.api'

export const isCredentialValid = (vc: StoredW3CCredential) => {
  const credentialSubject = vc?.credentialSubject
  return Date.parse(credentialSubject?.startDate) >= Date.now()
}
