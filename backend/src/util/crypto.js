import CryptoJS from 'crypto-js'
import { appLogger } from '../util/logger'

const nonce = randomString(10)

const salt = CryptoJS.lib.WordArray.random(128/8)

export function generateKey (secret) {
  return CryptoJS.PBKDF2(secret, salt, { keySize: 512/32, iterations: 1000 })
}

export function randomString (length) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for(var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export function sign (message, key) {
  const hashDigest = CryptoJS.SHA256(nonce + message)
  return CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA512(hashDigest, key))
}

export function checkSigned (message, key, signature) {
  return (signature === sign(message, key))
}

export function encrypt (json, key) {
  try {
    let encrypted = CryptoJS.AES.encrypt(JSON.stringify(json), key)
    return encrypted.toString()
  } catch (e) {
    appLogger.debug(`encrypt_error: ${e.message}`)
    throw new Error(`encrypt_error: ${e}`)
  }
}

function atob (str) {
  return Buffer.from(str, 'base64').toString('binary');
}

function btoa (str) {
  return Buffer.from(str.toString(), 'binary').toString('base64')
}

export function decrypt (encrypted, key) {
  let decrypted
  try {
    decrypted = CryptoJS.AES.decrypt(encrypted, key)
  } catch (e) {
    appLogger.debug(`decrypt_error: ${e.message}`)
    throw new Error(`decrypt_error: ${e}`)
  }
  try {
    decrypted = decrypted.toString(CryptoJS.enc.Utf8)
  } catch (e) {
    appLogger.debug(`decrypt_toString_failure: ${e.message}`)
    throw new Error(`decrypt_toString_failure: ${e}`)
  }
  try {
    return JSON.parse(decrypted)
  } catch (e) {
    appLogger.debug(`decrypt_JSON_parse_error: ${e.message}`)
    return decrypted
  }
}

export function hash (string) {
  return CryptoJS.SHA256(string).toString(CryptoJS.enc.Base64)
}

export function checkUuid (uuid) {
  return (uuid && typeof uuid === 'string') ? uuid.match(/[a-f0-9]{8}-([a-f0-9]{4}-){3}[a-f0-9]{12}/) : false
}

export function checkId (id) {
  return id ? id.match(/[A-Za-z0-9_-]{43}=/) : false
}

