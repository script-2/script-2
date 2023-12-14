import { drawLine } from '@/canvasAPI/drawLine'

onmessage = function (event: {
  data: { width: number; height: number; code: string }
}) {
  let { width, height, code } = event.data

  let offscreen = new OffscreenCanvas(width, height)
  let ctx = offscreen.getContext('2d')
  if (ctx) {
    let arrayBuffer = new ArrayBuffer(width * height * 4)
    let clampedArray = new Uint8ClampedArray(arrayBuffer)

    function setPixel(x: number, y: number) {
      x = Math.floor(x)
      y = Math.floor(y)
      clampedArray[y * width * 4 + x * 4 + 0] = 0
      clampedArray[y * width * 4 + x * 4 + 1] = 0
      clampedArray[y * width * 4 + x * 4 + 2] = 0
      clampedArray[y * width * 4 + x * 4 + 3] = 255
    }

    {
      function line(x1: number, y1: number, x2: number, y2: number) {
        drawLine(x1, y1, x2, y2, setPixel)
      }

      eval(code)

      line(0, 0, 0, 0)
    }

    postMessage(clampedArray, [clampedArray.buffer] as any)
  }
}
