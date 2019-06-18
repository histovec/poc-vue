import nodemailer from 'nodemailer'
import smtpTransport from 'nodemailer-smtp-transport'
import { htmlToText } from 'nodemailer-html-to-text'
import { smtpOptions } from '../config'
import { appLogger, techLogger } from '../util'

export const sendMail = async ({ from, to, cc, subject, content: html }) => {
  const transporter = nodemailer.createTransport(smtpTransport(smtpOptions))

  transporter.use('compile', htmlToText())

  const mailOptions = {
    from: from,
    to,
    cc,
    subject,
    html,
  }

  try {
    const info = await transporter.sendMail(mailOptions)
    appLogger.info('Mail sent: ' + info.response)
  } catch (error) {
    techLogger.error(error)
    throw error
  } finally {
    transporter.close()
  }
}



