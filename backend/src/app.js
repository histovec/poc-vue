import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import { loggerStream } from './util/logger'
import routes from './routes'
import config from './config'

const app = express()

morgan.token('id', function (req) {
  return req.body.id
})

const formatAsNginx =
  ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :response-time :id'

app.use(morgan(formatAsNginx, { stream: loggerStream }))
app.use(bodyParser.json({ limit: '2kb' }))
app.use(bodyParser.urlencoded({ limit: '2kb', extended: false }))

app.use(config.apiPrefix, routes)

export default app
