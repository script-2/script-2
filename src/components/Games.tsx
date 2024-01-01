import { useEffect, useState } from 'react'
import { format } from 'timeago.js'
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
      <ul className="flex flex-row">
        {games.map((game) => {
          return (
            <li key={game.key} className="mr-6 text-center">
              <Screen code={game.code} size={2} />
              <a
                href={`/?gameId=${game.key}&mode=PLAY`}
                className="underline text-sm"
              >
                Updated {format(game.lastUpdated)}
              </a>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
