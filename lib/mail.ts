import Handlebars from 'handlebars'
import nodemailer from 'nodemailer'
import { activationTemplate } from './emailTemplates/activation'
import { resetPasswordTemplate } from './emailTemplates/resetPass'

export async function sendMail({
  to,
  subject,
  body,
}: {
  to: string
  subject: string
  body: string
}) {
  var transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_GMAIL_USER,
      pass: process.env.SMTP_GMAIL_PASS,
    },
  })
  try {
    const sendResult = await transport.sendMail({
      from: process.env.SMTP_GMAIL_USER,
      to,
      subject,
      html: body,
    })
    return sendResult
  } catch (e) {
    console.log(e)
  }
}

export function compileActivationTemplate(nome: string, url: string) {
  const template = Handlebars.compile(activationTemplate)
  const htmlBody = template({
    nome,
    url,
  })
  return htmlBody
}
export function compileResetPassTemplate(nome: string, url: string) {
  const template = Handlebars.compile(resetPasswordTemplate)
  const htmlBody = template({
    nome,
    url,
  })
  return htmlBody
}
