import { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { ROUTES } from 'utils'
import { messages } from 'utils/messages'
import { useVerifyVcQuery } from 'hooks/verifier/api'
import { ErrorResponse } from 'types/error'
import { ErrorCodes } from 'enums/errorCodes'

import { Result } from '../../components/Result/Result'

const VerifierResult: FC = () => {
  const router = useRouter()
  const [scanError, setScanError] = useState<Partial<ErrorResponse> | null>(
    null
  )
  const { key, hash } = router.query as { key: string; hash: string }

  const { data, isLoading, error } = useVerifyVcQuery({ key, hash })

  useEffect(() => {
    if (!key || !hash) {
      setScanError({
        code: ErrorCodes.SCAN_ERROR,
        message: messages.verifier.result.content.scanError,
      })
    }
  }, [key, hash])

  return (
    <Result
      isLoading={scanError ? false : isLoading}
      error={error || scanError}
      isValid={Boolean(data?.isValid)}
      pathTo={ROUTES.verifier.scan}
    />
  )
}

export default VerifierResult
