import { useState } from 'react'
import './App.css'
import { Screen } from '@/components/Screen'
import { Textarea } from '@/components/Textarea'

const WIDTH = 64
const HEIGHT = 64

function App() {
  const [code, setCode] = useState(`init = () => ({ angle: 0 })

update = (state, pointerDown) => ({
  angle: state.angle + (pointerDown ? 0.5 : 0.1)
})

draw = (state) => {
  let H = 10
  let x = H * Math.cos(state.angle)
  let y = H * Math.sin(state.angle)
  line(31, 31, 31 + x, 31 + y)
}`)

  return (
    <article className="h-screen font-mono flex flex-col-reverse sm:flex-row">
      <Textarea value={code} setValue={setCode} />
      <Screen code={code} width={WIDTH} height={HEIGHT} />
    </article>
  )
}

export default App
