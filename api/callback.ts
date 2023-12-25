import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  let { githubAppCode } = req.query
  let response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      code: githubAppCode,
      client_id: process.env.VITE_CLIENT_ID,
      client_secret: process.env.VITE_CLIENT_SECRET,
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to fetch data')
  }

  let json = await response.json()
  return res.json(json.access_token)
}
