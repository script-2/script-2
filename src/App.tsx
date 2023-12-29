import { useEffect, useState } from 'react'
import '@/App.css'
import { Screen } from '@/components/Screen'
import { Textarea } from '@/components/Textarea'
import { Nav } from '@/components/Nav'
import { Games } from '@/components/Games'
import { skeleton } from '@/utils/skeleton'

const WIDTH = 64
const HEIGHT = 64
export type Mode = 'GAMES' | 'EDIT'

// Force deploy

function App() {
  let [mode, setMode] = useState<Mode>('GAMES')
  let [code, setCode] = useState(skeleton)
  let [gameId, setGameId] = useState<string | undefined>(undefined)

  useEffect(() => {
    if (gameId) {
      let url = new URL(window.location.toString())
      url.searchParams.set('gameId', gameId)
      history.pushState({}, '', url)
    }
  }, [gameId])

  return (
    <main className="bg-dark text-light font-mono text-xl flex flex-col h-screen">
      <Nav
        mode={mode}
        setMode={setMode}
        code={code}
        setCode={setCode}
        gameId={gameId}
        setGameId={setGameId}
      />
      {mode == 'GAMES' && <Games />}
      {mode == 'EDIT' && (
        <article className="h-screen font-mono flex flex-col-reverse sm:flex-row">
          <Textarea value={code} setValue={setCode} />
          <Screen code={code} width={WIDTH} height={HEIGHT} />
        </article>
      )}
    </main>
  )
}

export default App
