// backend-only envs

const requiredEnvs = [
  'ISSUER_PROJECT_ID',
  'ISSUER_PROJECT_DID',
  'ISSUER_API_KEY_HASH',
  'CLOUD_WALLET_API_URL',
  'VERIFIER_API_URL',
  'ISSUANCE_API_URL'
]
const missingEnvs = requiredEnvs.filter((name) => !process.env[name])
if (missingEnvs.length !== 0) {
  throw new Error(
     `Required envs are not provided: ${missingEnvs.join(', ')}. Please check README file.`
  )
}

export const logLevel = process.env.LOG_LEVEL || 'info'

export const issuanceApiUrl = process.env.ISSUANCE_API_URL
export const verifierApiUrl = process.env.VERIFIER_API_URL
export const cloudWalletApiUrl = process.env.CLOUD_WALLET_API_URL

export const issuerLogin = process.env.ISSUER_LOGIN
export const hashedIssuerPassword = process.env.ISSUER_HASH_PASSWORD
export const issuerPasswordSalt = process.env.ISSUER_PASSWORD_SALT

export const issuerApiKeyHash = process.env.ISSUER_API_KEY_HASH
export const issuerProjectDid = process.env.ISSUER_PROJECT_DID
export const issuerProjectId = process.env.ISSUER_PROJECT_ID
