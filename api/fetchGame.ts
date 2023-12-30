import type { VercelRequest, VercelResponse } from '@vercel/node'
import { kv } from '@vercel/kv'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { body } = req
  let { gameId } = JSON.parse(body)

  let response = await kv.hgetall(gameId)

  return res.json(response)
}
