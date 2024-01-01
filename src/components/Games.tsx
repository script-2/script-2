import { useEffect, useState } from 'react'
import { Screen } from '@/components/Screen'

export interface Game {
  key: string
  code: string
  lastUpdated: number
  username: string
}

export function Games() {
  let [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    async function fetchData() {
      let response = await fetch('api/fetchGames')

      let games = await response.json()

      setGames(games)
    }
    fetchData()
  }, [])

  return (
    <section className="mb-6 sm:mb-0">
      <ul>
        {games.map((game) => {
          return (
            <li key={game.key}>
              <Screen code={game.code} size={2} />
              <a href={`/?gameId=${game.key}&mode=PLAY`} className="underline">
                Last updated: {new Date(+game.lastUpdated).toLocaleString()}
              </a>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
