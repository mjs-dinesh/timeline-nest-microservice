import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

export async function Nodemailer(
  to,
  message,
  subject = 'OTP Verification',
  text = '',
) {
  const config = new ConfigService();
  try {
    let transporter = nodemailer.createTransport({
      service: 'hotmail',
      auth: {
        user: config.get('EMAIL_ID'),
        pass: config.get('EMAIL_PASSWORD'),
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: config.get('EMAIL_ID'), // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html: message, // html body
    });
    console.log('Nodemailer email send success');
  } catch (err) {
    console.log(err);
  }
}
