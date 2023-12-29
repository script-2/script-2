import type { VercelRequest, VercelResponse } from '@vercel/node'
import { v4 as uuidv4 } from 'uuid'
import { kv } from '@vercel/kv'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { body } = req
  let { code } = JSON.parse(body)

  let gameId = `game:${uuidv4()}`

  await kv.hset(gameId, { code })

  return res.json({ gameId })
}
