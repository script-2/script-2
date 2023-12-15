import { useState } from 'react'
import './App.css'
import { Screen } from '@/components/Screen'
import { Textarea } from '@/components/Textarea'

function App() {
  const [code, setCode] = useState(`init = () => ({ angle: 0 })

update = (state) => ({
  angle: state.angle + 0.1
})

draw = (state) => {
  let H = 10
  let x = H * Math.cos(state.angle)
  let y = H * Math.sin(state.angle)
  line(31, 31, 31 + x, 31 + y)
}`)

  return (
    <article className="flex flex-col items-center">
      <Textarea value={code} setValue={setCode} />
      <pre>{code}</pre>
      <Screen code={code} />
    </article>
  )
}

export default App
