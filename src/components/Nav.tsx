import { useState } from 'react'
import { Octokit } from 'octokit'

export function Nav() {
  let [accessToken, setAccessToken] = useState<string | undefined>(undefined)
  window.script2 = {
    handleCode: async (githubAppCode: string) => {
      let response = await fetch(
        `http://localhost:3000/api/callback?githubAppCode=${githubAppCode}`
      )

      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }

      let json = await response.json()
      setAccessToken(json)
      let octokit = new Octokit({ auth: json })
      const {
        data: { login },
      } = await octokit.rest.users.getAuthenticated()
      console.log('Hello, %s', login)
    },
  }

  function onLoginHandler() {
    window.open(
      `https://github.com/login/oauth/authorize?client_id=${
        import.meta.env.VITE_CLIENT_ID
      }`,
      '_blank',
      'popup,width=600,height=720'
    )
  }

  return (
    <nav>
      <button className="border" onClick={onLoginHandler}>
        Login
      </button>
      <div>{accessToken}</div>
    </nav>
  )
}
