import { useEffect, useState } from 'react'
import { Octokit } from 'octokit'
import { Mode } from '@/App'
import { skeleton } from '@/utils/skeleton'

export function Nav({
  mode,
  setMode,
  code,
  setCode,
  setGameId,
}: {
  mode: Mode
  setMode: React.Dispatch<React.SetStateAction<Mode>>
  code: string
  setCode: React.Dispatch<React.SetStateAction<string>>
  setGameId: React.Dispatch<React.SetStateAction<string | undefined>>
}) {
  let [accessToken, setAccessToken] = useState<string | undefined>(undefined)
  let [username, setUsername] = useState<string | undefined>(undefined)

  window.script2 = {
    handleCode: async (githubAppCode: string) => {
      let response = await fetch(
        `http://localhost:3000/api/callback?githubAppCode=${githubAppCode}`
      )

      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }

      let auth = await response.json()
      setAccessToken(auth)
    },
  }

  useEffect(() => {
    async function fetchUser() {
      if (!accessToken) return
      let octokit = new Octokit({ auth: accessToken })
      let {
        data: { login },
      } = await octokit.rest.users.getAuthenticated()
      setUsername(login)
    }
    fetchUser()
  }, [accessToken])

  function onLoginHandler() {
    window.open(
      `https://github.com/login/oauth/authorize?client_id=${
        import.meta.env.VITE_CLIENT_ID
      }`,
      '_blank',
      'popup,width=600,height=720'
    )
  }

  function onModeHandler(event: React.MouseEvent<HTMLButtonElement>) {
    let textContent = event.currentTarget.textContent as Mode
    setMode(textContent)
  }

  async function onNewHandler() {
    setCode(skeleton)

    let response = await fetch('http://localhost:3000/api/newGame', {
      method: 'POST',
      body: JSON.stringify({ code, accessToken }),
    })

    let { gameId } = await response.json()
    setGameId(gameId)
  }

  async function onSaveHandler() {
    let response = await fetch('http://localhost:3000/api/saveGame', {
      method: 'POST',
      body: JSON.stringify({ code }),
    })

    let json = await response.json()

    console.log(json)
  }

  return (
    <nav className="flex justify-between border-b border-light">
      <ul className="flex">
        <li className={`px-1 ${mode == 'GAMES' ? 'bg-light text-dark' : ''}`}>
          <button onClick={onModeHandler}>GAMES</button>
        </li>
        <li className={`px-1 ${mode == 'EDIT' ? 'bg-light text-dark' : ''}`}>
          <button onClick={onModeHandler}>EDIT</button>
        </li>
        {mode == 'EDIT' && (
          <li className="px-1">
            <button onClick={onNewHandler}>NEW</button>
          </li>
        )}
        {mode == 'EDIT' && (
          <li className="px-1">
            <button onClick={onSaveHandler}>SAVE</button>
          </li>
        )}
      </ul>
      <ul className="flex">
        <li className="px-1">
          {username && username}
          {!username && <button onClick={onLoginHandler}>LOGIN</button>}
        </li>
      </ul>
    </nav>
  )
}
