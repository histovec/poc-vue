import elasticsearch from '../connectors/elasticsearch'
import config from '../config'
import { checkUuid } from '../util/crypto'
import { sendMail } from '../connectors/send-mail'
import { appLogger } from '../util/logger'
import { formatContactMail } from '../mail'

export const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const filterEmail = (email) => {
  return email ? ((typeof email === 'string' && emailRegex.test(email)) ? email : `invalid:${email}` ) : undefined
}

const filterMessage = (message) => {
  return (message && typeof message === 'string') ? message.normalize().replace(/[^a-z0-9\n\u0300-\u036f,.?\-:;%()]/gi,' ').replace(/\s+/,' ') : undefined
}

export async function sendFeedback (req, res) {
  let errMessage = ''
  if (!(req.body.note && (typeof req.body.note === 'number'))) {
    errMessage = 'Bad request: "note" field mandatory and must be an integer'
    appLogger.debug(errMessage)
    res.status(400).json({
      success: false,
      message: errMessage
    })
  }

  if (!(req.body.uuid && checkUuid(req.body.uuid))) {
    errMessage = 'Bad request: "uuid" field mandatory and must be RFC 4122 compliant'
    appLogger.debug(errMessage)
    res.status(400).json({
      success: false,
      message: errMessage
    })
  }
  let feedback = {
    'message': filterMessage(req.body.message),
    'email': filterEmail(req.body.email),
    'uuid': req.body.uuid,
    'note': req.body.note,
    'date': new Date().toUTCString(),
    'holder': req.body.holder
  }
  try {
    const response = await elasticsearch.Client.index({
      index: config.esFeedbackIndex,
      type: 'feedback',
      body: feedback
    })
    res.status(201).json({
      success: true,
      message: "feedback indexed"
    })
  } catch (error) {
    appLogger.warn(
      `Couldn't create feedback in elasticsearch :
      {'body': '${JSON.stringify(req.body)}'}
      ${error.message}`
    )
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export async function sendContact (req, res) {
  let errMessage
  if (!(req.body.email && emailRegex.test(req.body.email))) {
    errMessage = 'Bad request: "email" field mandatory and must be valid'
    appLogger.debug(errMessage)
    res.status(400).json({
      success: false,
      message: errMessage
    })
  }
  if (!(req.body.uuid && checkUuid(req.body.uuid))) {
    errMessage = 'Bad request: "uuid" field mandatory and must be RFC 4122 compliant'
    appLogger.debug(errMessage)
    res.status(400).json({
      success: false,
      message: errMessage
    })
  }
  sendMail(req.body.email, config.mailTo, formatContactMail(req.body.subject, req.body.message))
}
