import { useEffect, useRef, useState } from 'react'
import { useInterval } from '@/utils/useSetInterval'
import { Canvas } from '@/components/Canvas'

export function DrawRandomBitmap() {
  let [clampedArray, setClampedArray] = useState<Uint8ClampedArray | undefined>(
    undefined
  )

  let width = 64
  let height = 64
  let pixelSize = 5
  let worker = useRef<Worker | null>(null)

  useEffect(() => {
    if (!worker.current) {
      worker.current = new Worker('workers/drawRandomBitmap.js')
    }
  })

  useInterval(() => {
    if (worker.current) {
      worker.current.postMessage({
        width,
        height,
        code: 'line(0, 0, 32, 64); line(0, 0, 10, 10)',
      })
      worker.current.onmessage = function ({
        data,
      }: {
        data: Uint8ClampedArray
      }) {
        setClampedArray(data)
      }
    }
  }, 1000)

  return (
    <Canvas
      width={width}
      height={height}
      pixelSize={pixelSize}
      clampedArray={clampedArray}
    />
  )
}
