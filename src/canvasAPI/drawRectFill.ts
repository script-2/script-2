export function drawRectFill(
  x: number,
  y: number,
  width: number,
  height: number,
  color: number,
  line: (x1: number, y1: number, x2: number, y2: number, color: number) => void
) {
  let left = Math.floor(x)
  let right = Math.floor(x + width - 1)
  let top = Math.floor(y)
  let bottom = Math.floor(y + height - 1)

  for (let rectX = left; rectX <= right; rectX++) {
    line(rectX, top, rectX, bottom, color)
  }
}
