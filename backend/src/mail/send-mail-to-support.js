import { json2html, getHtmlBody } from './body-mail-template'
import config from '../config'
import { sendMail } from '../connectors/send-mail'

export const sendMailToSupport = async (from, subject, json) => {
  await sendMail({
    from: from,
    cc: from,
    to: config.mailTo,
    subject: subject,
    content: getHtmlBody(`
      <b> message </b>: <br />
      <p>
        ${(json.message && json.message.replace('\n','<br />')) || '' }
      </p>
      <br />
      <b> donnée techniques </b>: <br />
      ${json2html(json)}
    `)
  })
}
