import { useState } from 'react'
import './App.css'
import { Screen } from '@/components/Screen'
import { Textarea } from '@/components/Textarea'

function App() {
  const [code, setCode] = useState(`
  init = () => {
    return {
      x: 1
    }
  }

  draw = (state) => {
    line(state.x, 2, 54, 60)
  }
`)

  return (
    <article className="flex flex-col items-center">
      <Textarea value={code} setValue={setCode} />
      <pre>{code}</pre>
      <Screen code={code} />
    </article>
  )
}

export default App
