import { session } from 'grammy'
import Redis from "ioredis"
import { RedisAdapter } from "@satont/grammy-redis-storage"
import { MyContext } from '@bot/types';
import { SessionData } from '@bot/types/session-data'

export const redis = new Redis({
  db: +process.env.REDIS_DB,
  host: process.env.REDIS_HOST,
  port: +process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
  retryStrategy: null
})

const getSessionKey = (ctx: MyContext) => (ctx.from?.id.toString())
const initial = (): SessionData => ({ 
  metrics: {
    messageCount: 0,
    cbQueriesCount: 0
  }
})

export function sessionMiddleware() {
  const storage = new RedisAdapter({ instance: redis });
  
  return session({initial: initial, getSessionKey: getSessionKey, storage: storage})
}
