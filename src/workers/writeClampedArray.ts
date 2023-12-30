/* eslint-disable @typescript-eslint/no-unused-vars */
import { drawLine } from '@/canvasAPI/drawLine'
import { drawRectFill } from '@/canvasAPI/drawRectFill'
import { drawCircle } from '@/canvasAPI/drawCircle'

onmessage = function (event: {
  data: {
    width: number
    height: number
    code: string
    runInit: boolean
    state: object
    pointerDown: boolean
  }
}) {
  let { width, height, code, runInit, state, pointerDown } = event.data

  let offscreen = new OffscreenCanvas(width, height)
  let ctx = offscreen.getContext('2d')
  if (ctx) {
    let arrayBuffer = new ArrayBuffer(width * height * 4)
    let clampedArray = new Uint8ClampedArray(arrayBuffer)

    function setPixel(x: number, y: number, color: number) {
      x = Math.floor(x)
      y = Math.floor(y)
      clampedArray[y * width * 4 + x * 4 + 0] = color ? 246 : 0
      clampedArray[y * width * 4 + x * 4 + 1] = color ? 214 : 0
      clampedArray[y * width * 4 + x * 4 + 2] = color ? 189 : 0
      clampedArray[y * width * 4 + x * 4 + 3] = 255
    }

    {
      function line(x1: number, y1: number, x2: number, y2: number, color = 1) {
        drawLine(x1, y1, x2, y2, setPixel, color)
      }

      function rectFill(
        x: number,
        y: number,
        width: number,
        height: number,
        color = 1
      ) {
        drawRectFill(x, y, width, height, color, line)
      }

      function circFill(x: number, y: number, radius: number, color = 1) {
        drawCircle(
          Math.floor(x),
          Math.floor(y),
          Math.floor(radius),
          color,
          setPixel,
          line,
          false
        )
      }

      let init = () => ({})
      let update = (_state: object, _pointerDown: boolean) => ({})
      let draw = (_state: object) => {}

      eval(code)

      if (runInit) {
        console.log('runInit', rectFill, circFill)
        state = init()
      }

      state = update(state, pointerDown)
      draw(state)
    }

    postMessage({ clampedArray, state }, [clampedArray.buffer])
  }
}
