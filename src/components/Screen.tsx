import { useEffect, useRef, useState } from 'react'
import { useInterval } from '@/utils/useSetInterval'
import { Canvas } from '@/components/Canvas'

export function Screen({ code }: { code: string }) {
  let [clampedArray, setClampedArray] = useState<Uint8ClampedArray | undefined>(
    undefined
  )

  let [prevCode, setPrevCode] = useState(code)

  if (prevCode !== code) {
    setPrevCode(code)
  }

  let width = 64
  let height = 64
  let pixelSize = 5
  let worker = useRef<Worker | null>(null)
  let runInit = useRef(true)
  let state = useRef({})

  useEffect(() => {
    if (!worker.current) {
      worker.current = new Worker('workers/writeClampedArray.js')
    }
  })

  useInterval(() => {
    if (worker.current) {
      console.log(`posting runInit: ${runInit.current}`)
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
  }, 1000 / 30)

  return (
    <Canvas
      width={width}
      height={height}
      pixelSize={pixelSize}
      clampedArray={clampedArray}
    />
  )
}
