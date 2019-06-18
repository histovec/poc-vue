// redis-client.js
import redis from 'redis'
import { promisify } from 'util'
import config from '../config'
const client = redis.createClient(config.redisUrl)
client.config("SET", "save", "")

export const getAsync = promisify(client.get).bind(client)
export const setAsync = promisify(client.set).bind(client)
export const keysAsync = promisify(client.keys).bind(client)

export default { getAsync, setAsync, keysAsync }
