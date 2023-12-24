import { useEffect, useRef, useState } from 'react'
import { useInterval } from '@/utils/useSetInterval'
import { Canvas } from '@/components/Canvas'

const PIXEL_SIZE = 5
const FPS = 30

export function Screen({
  code,
  width,
  height,
}: {
  code: string
  width: number
  height: number
}) {
  let worker = useRef<Worker | null>(null)
  let state = useRef({})
  let runInit = useRef(true)
  let [clampedArray, setClampedArray] = useState<Uint8ClampedArray | undefined>(
    undefined
  )
  let [prevCode, setPrevCode] = useState(code)

  if (prevCode !== code) {
    setPrevCode(code)
    runInit.current = true
  }

  useEffect(() => {
    if (!worker.current) {
      worker.current = new Worker('workers/writeClampedArray.js')
    }
  })

  useInterval(() => {
    if (worker.current) {
      worker.current.postMessage({
        width,
        height,
        code,
        runInit: runInit.current,
        state: state.current,
      })

      runInit.current = false

      worker.current.onmessage = function ({
        data,
      }: {
        data: {
          clampedArray: Uint8ClampedArray
          state: object
        }
      }) {
        setClampedArray(data.clampedArray)
        state.current = data.state
      }
    }
  }, 1000 / FPS)

  return (
    <Canvas
      width={width}
      height={height}
      pixelSize={PIXEL_SIZE}
      clampedArray={clampedArray}
    />
  )
}
