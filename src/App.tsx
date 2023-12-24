import { useState } from 'react'
import './App.css'
import { Screen } from '@/components/Screen'
import { Textarea } from '@/components/Textarea'

const WIDTH = 64
const HEIGHT = 64

function App() {
  const [code, setCode] = useState(`init = () => ({ angle: 0 })

update = (state, mouseDown) => ({
  angle: state.angle + (mouseDown ? 0.1 : 0)
})

draw = (state) => {
  let H = 10
  let x = H * Math.cos(state.angle)
  let y = H * Math.sin(state.angle)
  line(31, 31, 31 + x, 31 + y)
}`)

  return (
    <article className="h-screen font-mono flex">
      <Textarea value={code} setValue={setCode} />
      <Screen code={code} width={WIDTH} height={HEIGHT} />
    </article>
  )
}

export default App
