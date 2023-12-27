const skeleton = `init = () => ({ angle: 0 })

update = (state, pointerDown) => ({
  angle: state.angle + (pointerDown ? 0.1 : 0)
})

draw = (state) => {
  let H = 31
  let x = H * Math.cos(state.angle)
  let y = H * Math.sin(state.angle)
  line(31, 31, 31 + x, 31 + y)
}`

export { skeleton }
