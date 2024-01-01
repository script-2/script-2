import type { VercelRequest, VercelResponse } from '@vercel/node'
import { kv } from '@vercel/kv'
import type { Game } from '../src/components/Games.tsx'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  let [, keys] = await kv.scan(0, { count: 20 })

  let hashes = await Promise.all(keys.map((key) => kv.hgetall(key)))

  let games: Game[] = hashes
    .filter<T>((hash): hash is T => hash != null)
    .map((hash, index) => {
      let key = keys[index]

      return {
        key,
        code: hash.code as string,
        lastUpdated: Number(hash.lastUpdated) as number,
        username: hash.username as string,
      }
    })
    .sort((a, b) => b.lastUpdated - a.lastUpdated)

  return res.json(games)
}
