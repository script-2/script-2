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
  let gameState = useRef({})
  let runInit = useRef(true)
  let [clampedArray, setClampedArray] = useState<Uint8ClampedArray | undefined>(
    undefined
  )
  let [prevCode, setPrevCode] = useState(code)
  let [pointerDown, setPointerDown] = useState(false)

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
        state: gameState.current,
        pointerDown,
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
        gameState.current = data.state
      }
    }
  }, 1000 / FPS)

  function pointerDownHandler() {
    setPointerDown(true)
  }
  function pointerUpHandler() {
    setPointerDown(false)
  }

  return (
    <div className="flex flex-col items-center">
      <Canvas
        width={width}
        height={height}
        pixelSize={PIXEL_SIZE}
        clampedArray={clampedArray}
      />
      <button
        className="w-full h-40 select-none"
        onPointerDown={pointerDownHandler}
        onPointerUp={pointerUpHandler}
      >
        Press me
      </button>
    </div>
  )
}
