import { use } from 'next-api-middleware'
import type { NextApiRequest, NextApiResponse } from 'next'
import { allowedHttpMethods } from '../middlewares/allowed-http-methods'
import { errorHandler } from '../middlewares/error-handler'
import { authenticateIssuer } from '../helpers/authenticate-issuer'

async function handler(req: NextApiRequest, res: NextApiResponse<void>) {
  authenticateIssuer(req)
  res.status(200).end()
}

export default use(allowedHttpMethods('POST'), errorHandler)(handler)
