import { useEffect, useState } from 'react'

export function Games() {
  let [games, setGames] = useState<
    { key: string; code: string; lastUpdated: string; username: string }[]
  >([])

  useEffect(() => {
    async function fetchData() {
      let response = await fetch('api/fetchGames')

      let games = await response.json()

      setGames(games)
    }
    fetchData()
  }, [])

  return (
    <article className="flex-1">
      <section>
        <ul>
          {games.map((game) => {
            return (
              <li key={game.key}>
                <a href={`/?gameId=${game.key}`} className="underline">
                  Last updated: {new Date(+game.lastUpdated).toLocaleString()}
                </a>
              </li>
            )
          })}
        </ul>
      </section>
    </article>
  )
}
