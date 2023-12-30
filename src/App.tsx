import { useState, useEffect } from 'react'
import '@/App.css'
import { Screen } from '@/components/Screen'
import { Nav } from '@/components/Nav'
import { Editor } from '@/components/Editor'
import { Games } from '@/components/Games'
import { skeleton } from '@/utils/skeleton'

const WIDTH = 64
const HEIGHT = 64
export type Mode = 'GAMES' | 'EDIT'

function App() {
  let [mode, setMode] = useState<Mode>('GAMES')
  let [code, setCode] = useState(skeleton)

  useEffect(() => {
    async function fetchGame() {
      let response = await fetch('api/fetchGame', {
        method: 'POST',
        body: JSON.stringify({ gameId }),
      })

      let { code } = await response.json()

      setCode(code)
    }

    let url = new URL(window.location.toString())
    let gameId = url.searchParams.get('gameId')
    if (gameId) {
      fetchGame()
    }
  }, [])

  return (
    <main className="bg-darkest text-lightest font-mono text-xl flex flex-col h-screen">
      <Nav mode={mode} setMode={setMode} code={code} setCode={setCode} />
      {mode == 'GAMES' && (
        <article className="h-screen font-mono flex flex-col-reverse sm:flex-row">
          <Games />
          <Screen code={code} width={WIDTH} height={HEIGHT} />
        </article>
      )}
      {mode == 'EDIT' && (
        <article className="h-screen font-mono flex flex-col-reverse sm:flex-row">
          <Editor code={code} setCode={setCode} />
          <Screen code={code} width={WIDTH} height={HEIGHT} />
        </article>
      )}
    </main>
  )
}

export default App
