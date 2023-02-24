import { z } from 'zod'
import { use } from 'next-api-middleware'
import type { NextApiRequest, NextApiResponse } from 'next'

import { ErrorCodes } from 'enums/errorCodes'

import { allowedHttpMethods } from '../middlewares/allowed-http-methods'
import { cloudWalletClient } from '../clients/cloud-wallet-client'
import { ApiError } from '../api-error'
import { errorHandler } from '../middlewares/error-handler'

type HandlerResponse = {
  accessToken: string
}

const requestSchema = z
  .object({
    token: z.string(),
    confirmationCode: z.string(),
  })
  .strict()

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HandlerResponse>
) {
  const { token, confirmationCode } = requestSchema.parse(req.body)

  try {
    const { accessToken } = await cloudWalletClient.confirmSignInPasswordless({
      token,
      confirmationCode,
    })

    res.status(200).json({ accessToken })
  } catch (error: any) {
    if (['COR-5', 'COR-17'].includes(error.response?.data?.code)) {
      throw new ApiError({
        code: ErrorCodes.INVALID_OTP_CODE,
        httpStatusCode: 400,
      })
    }
    throw error
  }
}

export default use(allowedHttpMethods('POST'), errorHandler)(handler)
