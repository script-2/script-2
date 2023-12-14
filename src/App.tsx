import { useState } from 'react'
import './App.css'
import { DrawRandomBitmap } from './components/DrawRandomBitmap'

function App() {
  const [code, setCode] = useState('blank code')

  function handleTextAreaOnChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setCode(e.target.value)
  }

  return (
    <article className="flex flex-col items-center">
      <textarea
        onChange={handleTextAreaOnChange}
        value={code}
        className="border"
      />
      <pre>{code}</pre>
      <DrawRandomBitmap />
    </article>
  )
}

export default App
