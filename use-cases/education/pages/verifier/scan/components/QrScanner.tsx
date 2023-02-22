import { FC, useCallback } from 'react'
import { Result } from '@zxing/library'
import { useRouter } from 'next/router'

import { extractHashAndKeyFromVSShareUrl, ROUTES } from 'utils'
import { useScanner } from 'hooks/verifier/useScanner'

import * as S from './QrScanner.styled'

type QrScannerProps = {}

const videoElementId = 'video-renderer'

const QrScanner: FC<QrScannerProps> = () => {
  const router = useRouter()

  const onScanned = useCallback(
    async (result: Result | undefined): Promise<void> => {
      const text = result?.getText()
      if (!text) {
        return
      }
      try {
        const hashAndKey = extractHashAndKeyFromVSShareUrl(text)
        await router.push(
          {
            pathname: ROUTES.verifier.result,
            query: { key: hashAndKey?.key, hash: hashAndKey?.hash },
          },
          ROUTES.verifier.result
        )
      } catch (error) {
        console.error(error)
        await router.push(ROUTES.verifier.result)
      }
    },
    [router]
  )

  useScanner({
    onScanned,
    videoElementId,
  })

  return (
    <S.Overlay>
      <video muted id={videoElementId} />
    </S.Overlay>
  )
}

export default QrScanner
