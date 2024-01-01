import { useEffect, useRef, useState } from 'react'
import { useInterval } from '@/utils/useSetInterval'
import { Canvas } from '@/components/Canvas'

const WIDTH = 64
const HEIGHT = 64
const FPS = 30

export function Screen({
  code,
  className,
  showPointer,
  size,
}: {
  code: string
  size: number
  className?: string
  showPointer?: boolean
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
        width: WIDTH,
        height: HEIGHT,
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
    <section className={className}>
      <Canvas
        width={WIDTH}
        height={HEIGHT}
        pixelSize={size}
        clampedArray={clampedArray}
      />
      {showPointer && (
        <button
          className="w-80 h-40 select-none border border-dark mt-6"
          onPointerDown={pointerDownHandler}
          onPointerUp={pointerUpHandler}
        >
          Press me
        </button>
      )}
    </section>
  )
}
