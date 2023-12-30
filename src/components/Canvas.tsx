import { useEffect, useRef } from 'react'

export function Canvas({
  width,
  height,
  pixelSize,
  clampedArray,
}: {
  width: number
  height: number
  pixelSize: number
  clampedArray?: Uint8ClampedArray
}) {
  let canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    let canvas = canvasRef.current
    if (canvas) {
      let ctx = canvas.getContext('2d')
      if (ctx && clampedArray) {
        let imageData = new ImageData(clampedArray, width)
        ctx.putImageData(imageData, 0, 0)
      }
    }
  })

  return (
    <canvas
      className="block border-b border-l border-r border-dark"
      ref={canvasRef}
      width={width}
      height={width}
      style={{ width: width * pixelSize, height: height * pixelSize }}
    />
  )
}
