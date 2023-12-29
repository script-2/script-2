import type { VercelRequest, VercelResponse } from '@vercel/node'
import { v4 as uuidv4 } from 'uuid'
import { kv } from '@vercel/kv'
import { Octokit } from 'octokit'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { body } = req
  let { code, accessToken, gameId } = JSON.parse(body)

  let octokit = new Octokit({ auth: accessToken })
  let {
    data: { login },
  } = await octokit.rest.users.getAuthenticated()

  if (!gameId) {
    gameId = `game:${uuidv4()}`
  }

  await kv.hset(gameId, { code, username: login })

  return res.json({ gameId })
}
