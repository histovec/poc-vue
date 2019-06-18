import 'whatwg-fetch'
import apiConf from '@/assets/json/backend.json'
import CryptoJS from 'crypto-js'
import store from '@/store'
// import { EventSourcePolyfill } from 'event-source-polyfill';

const apiUrl = apiConf.api.url.replace('<APP>', process.env.APP).replace(/"/g, '').replace(/\/$/, '')
const apiFutureUrl = apiConf.api.futureUrl.replace('<APP>', process.env.APP).replace(/"/g, '').replace(/\/$/, '')


const apiPaths = (apiName, future = false) => {
  let apiRoute = {
    current: {
      log: 'log',
      siv: 'id',
      feedback: 'feedback',
      contact: 'contact'
    },
    future: {
      log: 'log',
      siv: 'siv',
      feedback: 'feedback',
      contact: 'contact',
      utac: 'utac'
    }
    // stream: 'stream'
  }
  return future ? `${apiFutureUrl}/${apiRoute.future[apiName]}` : `${apiUrl}/${apiRoute.current[apiName]}`
}

const decrypt = (encrypted, key) => {
  key = CryptoJS.enc.Base64.parse(key)
  let rawData = atob(encrypted)
  let iv = CryptoJS.enc.Base64.parse(btoa(rawData.substring(0, 16)))
  encrypted = btoa(rawData.substring(16))
  let decrypted
  try {
    decrypted = CryptoJS.AES.decrypt({
      ciphertext: CryptoJS.enc.Base64.parse(encrypted),
      salt: ''
    },
      key, {
        iv: iv,
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
      })
  } catch (e) {
    /* eslint-disable-next-line no-console */
    console.log('decrypt_error', e)
    throw new Error(`decrypt_error: ${e}`)
  }
  try {
    decrypted = decrypted.toString(CryptoJS.enc.Utf8).replace(/: (0[0-9]+)/g, ': "$1"')
  } catch (e) {
    /* eslint-disable-next-line no-console */
    console.log('decrypt_toString_failure', e)
    throw new Error(`decrypt_toString_failure: ${e}`)
  }
  try {
    return JSON.parse(decrypted)
  } catch (e) {
    /* eslint-disable-next-line no-console */
    console.log('decrypt_JSON_parse_error', decrypted, e)
    throw new Error(`decrypt_JSON_parse_error: ${e}`)
  }
}

const checkStatus = async (apiName, response) => {
  await store.commit('updateApiStatus', {
    http: { [apiName]: response.status },
    fetching: { [apiName]: false }
  })
  return response
}

const checkValidJson = async (apiName, response) => {
  let json
  try {
    await store.commit('updateApiStatus', { json: { [apiName]: true } })
    json = await response.json()
    return {
      success: true,
      status: response.status,
      json: json
    }
  } catch (e) {
    await store.commit('updateApiStatus', {
      json: { [apiName]: false },
      error: { [apiName]: { 'json': e } }
    })
    return {
      success: false,
      status: response.status,
      error: { 'search': e }
    }
  }
}

const checkValidSearch = async (apiName, response) => {
  // check if valid elasticsearch result
  // and return only first result
  let json
  try {
    if (response.success) {
      json = await response.json
      if ((Object.keys(json).length === 0) || (json.hits.hits.length === 0)) {
        await store.commit('updateApiStatus', {
          hit: { [apiName]: false },
          noHits: { [apiName]: (store.state.api.noHits[apiName] || 0 ) + 1 }
        })
        return {
          success: false,
          status: response.status
        }
      } else {
        await store.commit('updateApiStatus', {
          hit: { [apiName]: true },
          hits: { [apiName]: (store.state.api.hits[apiName] || 0 ) + 1 }
        })
        return {
          success: true,
          status: response.status,
          json: json.hits.hits[0]._source
        }
      }
    } else {
      await store.commit('updateApiStatus', {
        hit: { [apiName]: false }
      })
      return {
        success: false,
        status: response.status,
        error: response.error || 'search_invalid_json'
      }
    }
  } catch (e) {
    await store.commit('updateApiStatus', {
      hit: { [apiName]: false },
      error: { [apiName]: { 'search': e } }
    })
    return {
      success: false,
      status: response.status,
      error: { search: e }
    }
  }
}

const decryptHit = async (apiName, response, objectPath, key) => {
  let decrypted
  let encrypted
  try {
    if (response.success) {
      decrypted = await response.json
      encrypted = decrypted[objectPath] && decrypted[objectPath].replace(/-/g, '+').replace(/_/g, '/')
      decrypted[objectPath] = decrypt(encrypted, key)
      store.commit('updateApiStatus', {
        decrypted: { [apiName]: true }
      })
      return {
        success: true,
        decrypted: decrypted
      }
    } else {
      await store.commit('updateApiStatus', {
        decrypted: { [apiName]: false }
      })
      return {
        success: false,
        status: response.status,
        error: response.error || 'decrypt_invalid_search'
      }
    }
  } catch (error) {
    store.commit('updateApiStatus', {
      decrypted: { [apiName]: false },
      error: { [apiName]: { decrypt: error.toString() } }
    })
    return {
      success: false,
      error: { decrypt: error },
      decrypted: {}
    }
  }
}

export const fetchInit = (apiName, url, options) => {
  store.commit('initApiStatus', apiName)
  return fetch(url, options)
}

// export const eventClient = async (e, callbacks) => {
//   try {
//     if (!e.data) { throw new Error('stream_error_missing_data') }
//     if (!e.id) { throw new Error('stream_error_missing_id') }
//     if (!e.event) { throw new Error('stream_error_missing_event') }

//     let apiName = e.id
//     if (!(apiName in callbacks)) { throw new Error('stream_error_message_id_without_callback') }

//     let response = {
//       success: (e.event === 200),
//       status: e.event,
//       body: e.data,
//       json: (() => JSON.parse(e.data))
//     }

//     response = await checkStatus(apiName, response)
//     if (callbacks[apiName].json || callbacks[apiName].search || callbacks[apiName].decrypt) {
//       response = await checkValidJson(apiName, response)
//     }

//     if (callbacks[apiName].json || callbacks[apiName].search || callbacks[apiName].decrypt) {
//       // artificial fake elasticsearch response for StreamEvent and direct Elasticsearch Api compatibility
//       response = await checkValidSearch(apiName, {
//         status: response.status,
//         success: response.success,
//         hits: { hits: [{ _source: response.json }]}
//       })
//     }

//     if (callbacks[apiName].decrypt) {
//       response = await decryptHit(apiName, response, 'v', callbacks[apiName].key)
//     }

//     if (callbacks[apiName].callback) {
//       callbacks[apiName].callback(response)
//     }
//   } catch (error) {
//       /* eslint-disable-next-line no-console */
//       console.log(error)
//       throw new Error('stream_unhandled_exception')
//   }
// }

export const fetchClient = (apiName, url, options) => fetchInit(apiName, url, options).then(resp => checkStatus(apiName, resp))
export const jsonClient = (apiName, url, options) => fetchClient(apiName, url, options).then(resp => checkValidJson(apiName, resp))
export const searchClient = (apiName, url, options) => jsonClient(apiName, url, options).then(resp => checkValidSearch(apiName, resp))
export const decryptSearchClient = (apiName, url, objectPath, key, options) => searchClient(apiName,url, options).then(resp => decryptHit(apiName, resp, objectPath, key))
export const decryptClient = (apiName, url, objectPath, key, options) => jsonClient(apiName,url, options).then(resp => decryptHit(apiName, resp, objectPath, key))

// export const streamClient = async (url, callbacks, options) => {
//   let es = new EventSourcePolyfill(url, options)
//   Object.keys(callbacks).forEach((apiName) => store.commit('initApiStatus', apiName))
//   /* eslint-disable-next-line no-console */
//   console.log('streamClient', url, callbacks, options)
//   es.onmessage = (e) => {
//     /* eslint-disable-next-line no-console */
//     console.log('message', e)
//     if (e.id === 'end-of-stream') {
//       es.close()
//     } else {
//       eventClient(e, callbacks)
//     }
//   }
// }

const jsonHeader = {
  'Content-Type': 'application/json',
}

const apiClient = {
  post: (apiName, url, options) => (
    jsonClient(apiName, url, { ...options, headers: jsonHeader, method: 'POST' })
  ),
  put: (apiName, url, options) => (
    jsonClient(apiName, url, { ...options, headers: jsonHeader, method: 'PUT' })
  ),
  search: (apiName, url, options) => (
    searchClient(apiName, url, { ...options, headers: jsonHeader, method: 'POST' })
  ),
  searchAndDecrypt: (apiName, url, objectPath, key, options) => (
    decryptSearchClient(apiName, url, objectPath, key, { ...options, headers: jsonHeader})
  ),
  decrypt: (apiName, url, objectPath, key, options) => (
    decryptClient(apiName, url, objectPath, key, { ...options, headers: jsonHeader})
  ),
  // stream: (url, callbacks, options) => (
  //   streamClient(url, callbacks, options)
  // )
}

export default {
  async getSIV (id, key, uuid) {
    const apiName = 'siv'
    let response = await apiClient.searchAndDecrypt(apiName, `${apiPaths(apiName)}/${uuid}/${id}`, 'v', key)
    return {
      success: response.success,
      v: ((response.decrypted && response.decrypted.v) || {})
    }
  },
  async getSIVv1 (id, key, uuid) {
    const apiName = 'siv'
    const options = {
      method: 'POST',
      body: JSON.stringify({ id: id, uuid: uuid})
    }
    let response = await apiClient.decrypt(apiName, `${apiPaths(apiName, true)}`, 'v', key, options)
    return {
      success: response.success,
      token: response.decrypted && response.decrypted.token,
      v: (response.decrypted && response.decrypted.v || {})
    }
  },
  async getUTAC (id, code, token, key, utacId, uuid) {
    const apiName = 'utac'
    const options = {
      body: JSON.stringify({id: id, code: code, token: token, key: key, utacId: utacId, uuid: uuid})
    }
    let response = await apiClient.post(apiName, `${apiPaths(apiName, true)}`, options)
    return {
      success: response.success,
      ct: (response.json.ct || {})
    }
  },
  // async getHistoVecAndUtac(id, key, plaque, uuid, callbacks) {
  //   const apiName = 'stream'
  //   const options = {
  //     headers: {
  //       'Histovec-Id': id,
  //       'Histovec-Uuid': uuid,
  //       'Histovec-Plaque': plaque
  //     }
  //   }
  //   const streamCallbacks = {
  //     histovec: {
  //       decrypt: key,
  //       callback: callbacks.histovec
  //     },
  //     utac: {
  //       json: true,
  //       callback: callbacks.utac
  //     }
  //   }
  //   await apiClient.stream(`${apiPaths[apiName]}`, streamCallbacks, options)
  // },
  async log (path, uid) {
    const apiName = 'log'
    let p = path.replace(/^\/\w+\//, '')
    const json = await apiClient.put(apiName, `${apiPaths(apiName)}/${uid}/${p}`)
    return json
  },
  async sendFeedback (feedback, future=false) {
    const apiName = 'feedback'
    const json = await apiClient.post(apiName, `${apiPaths(apiName, future)}/`, {
      body: JSON.stringify(feedback)})
    return json
  },
  async sendContact (contact, future=false) {
    const apiName = 'contact'
    const json = await apiClient.post(apiName, `${apiPaths(apiName, future)}/`, {
      body: JSON.stringify(contact)})
    return json
  }
}
