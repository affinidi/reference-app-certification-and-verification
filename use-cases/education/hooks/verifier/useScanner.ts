import { MutableRefObject, useEffect, useRef } from 'react'
import { BrowserQRCodeReader, IScannerControls } from '@zxing/browser'
import { Exception, Result } from '@zxing/library'

type useScannerParams = {
  delay?: number
  onScanned: (result: Result | undefined) => Promise<void>
  constraints?: MediaTrackConstraints
  videoElementId: string
}

const hints = new Map<number, any>()
hints.set(0, true)

export const useScanner = ({
  constraints = { facingMode: 'environment' },
  delay = 1000,
  videoElementId,
  onScanned,
}: useScannerParams) => {
  const controlsRef: MutableRefObject<IScannerControls | null> = useRef(null)

  useEffect(() => {
    if (!isMediaDevicesSupported() && isValidType(onScanned, 'onScanned', 'function') || !constraints) {
      return
    }

    const scanner = new BrowserQRCodeReader(hints, {
      delayBetweenScanAttempts: delay,
    })
    scanner
      .decodeFromConstraints({ video: constraints }, videoElementId, async (result, error) => {
        if (error) {
          return
        }

        await onScanned(result)
      })
      .then((controls: IScannerControls) => (controlsRef.current = controls))

    return () => {
      controlsRef.current?.stop()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onScanned, videoElementId])
}

export type UseScannerType = ReturnType<typeof useScanner>

function isMediaDevicesSupported() {
  return typeof navigator !== 'undefined' && !!navigator.mediaDevices
}

function isValidType(value: any, name: string, type: string) {
  return typeof value === type
}
