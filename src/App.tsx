import { useState, useEffect } from 'react'
import '@/App.css'
import { Editor } from '@/components/Editor'
import { Games } from '@/components/Games'
import { Nav } from '@/components/Nav'
import { Screen } from '@/components/Screen'
import { skeleton } from '@/utils/skeleton'

export type Mode = 'GAMES' | 'EDIT' | 'PLAY'

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
    let modeParam = url.searchParams.get('mode')
    if (modeParam) {
      setMode(modeParam as Mode)
    }
  }, [])

  return (
    <main className="bg-darkest text-lightest font-mono text-xl">
      <Nav mode={mode} setMode={setMode} code={code} setCode={setCode} />
      {mode == 'GAMES' && (
        <article className="font-mono mx-6 mt-6 flex flex-col sm:flex-row sm:justify-between">
          <Games />
        </article>
      )}
      {mode == 'EDIT' && (
        <article className="font-mono flex flex-col sm:flex-row">
          <Editor code={code} setCode={setCode} />
          <Screen
            code={code}
            className="hidden sm:block sticky bg-darkest top-6 h-screen"
            showPointer={true}
            size={5}
          />
        </article>
      )}
      {mode == 'PLAY' && (
        <article className="flex flex-col items-center mt-6">
          <Screen code={code} showPointer={true} size={5} />
        </article>
      )}
    </main>
  )
}

export default App
