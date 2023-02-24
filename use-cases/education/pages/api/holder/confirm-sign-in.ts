import { z } from 'zod'
import { use } from 'next-api-middleware'
import type { NextApiRequest, NextApiResponse } from 'next'
import { allowedHttpMethods } from '../middlewares/allowed-http-methods'
import { cloudWalletClient } from '../clients/cloud-wallet-client'
import { ApiError } from '../api-error'
import { AxiosError } from 'axios'
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
  } catch (error: unknown) {
    const responseData = (error as AxiosError)?.response?.data
    if (responseData?.code === 'COR-5') {
      throw new ApiError({
        code: responseData?.httpStatusCode,
        message: responseData?.message,
        httpStatusCode: responseData?.httpStatusCode,
      })
    }
    throw error
  }
}

export default use(allowedHttpMethods('POST'), errorHandler)(handler)
