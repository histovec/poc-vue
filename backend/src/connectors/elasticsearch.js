import Elasticsearch from 'elasticsearch'
import config from '../config'

export default {
  Client : new Elasticsearch.Client({
    host: config.esUrl
  })
}

