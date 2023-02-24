import { use } from 'next-api-middleware'
import type { NextApiRequest, NextApiResponse } from 'next'

import { VerifiableCredential } from 'types/vc'
import { JSONLD_CONTEXT_URL } from 'utils/schema'
import { ErrorCodes } from 'enums/errorCodes'

import { allowedHttpMethods } from '../middlewares/allowed-http-methods'
import { errorHandler } from '../middlewares/error-handler'
import { authenticateCloudWallet } from '../helpers/authenticate-cloud-wallet'
import { cloudWalletClient } from '../clients/cloud-wallet-client'
import { parseSchemaURL } from '../helpers/parse.schema.url'
import { ApiError } from '../api-error'

type HandlerResponse = {
  vcs: VerifiableCredential[]
}

export async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HandlerResponse>
) {
  const accessToken = authenticateCloudWallet(req)

  try {
    const { vcs } = await cloudWalletClient.getCredentials({}, { accessToken })

    const { schemaType } = parseSchemaURL(JSONLD_CONTEXT_URL)
    res
      .status(200)
      .json({ vcs: vcs.filter((vc) => vc.type.includes(schemaType)) })
  } catch (error: any) {
    if (error.response?.data?.code === 'CWA-4') {
      throw new ApiError({
        code: ErrorCodes.JWT_EXPIRED_ERROR,
        httpStatusCode: 400,
      })
    }
    throw error
  }
}

export default use(allowedHttpMethods('GET'), errorHandler)(handler)
