import * as nodemailer from 'nodemailer';
import { config } from 'src/config';

const transporter = nodemailer.createTransport({
  host: config.EMAIL_HOST,
  port: 465,
  secure: true,
  auth: {
    user: config.GMAIL_USER,
    pass: config.GMAIL_PASS,
  },
});

export const sendMail = async (to: string[], subject: string, html: string) => {
  try {
    const info = await transporter.sendMail({
      from: {
        name: 'Bred',
        address: config.GMAIL_USER,
      },
      to: to,
      subject: subject,
      html: html,
    });
    console.log('🚀 ~ file: sendMail.ts:25 ~ sendMail ~ info:', info);

    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.error('Error:', error);
  }
};
