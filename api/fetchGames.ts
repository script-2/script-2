import type { VercelRequest, VercelResponse } from '@vercel/node'
import { kv } from '@vercel/kv'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  let [, keys] = await kv.scan(0, { count: 20 })

  let hashes = await Promise.all(keys.map((key) => kv.hgetall(key)))

  let games = keys.map((key, index) => {
    return {
      key,
      ...hashes[index],
    }
  })

  return res.json(games)
}
