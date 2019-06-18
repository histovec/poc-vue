import http from 'http'

import app from './app'
import redis from './connectors/redis'
import elasticsearch from './connectors/elasticsearch'
import { techLogger } from './util'

import config from './config'

const PORT = config.port || 8000

techLogger.debug(
  `config:
  ${JSON.stringify(config)}/`
)

elasticsearch.Client.search({
  index: config.esIndex,
  q: 'version',
  size: '1'
}).then(() => {
  redis.getAsync('')
    .then(() => {
      http.createServer(app).listen(PORT, '0.0.0.0')
      techLogger.info(`Server running at http://0.0.0.0:${PORT}/`)
    })
    .catch(error => {
      techLogger.error(`Server could not connect to redis, exiting`)
      techLogger.error(error)
    })
  })
  .catch(error => {
    techLogger.error(`Server could not connect to elasticsearch, exiting`)
    techLogger.error(error)
  })
