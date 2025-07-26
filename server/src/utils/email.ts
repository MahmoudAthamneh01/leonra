import nodemailer from 'nodemailer';

let transporter: nodemailer.Transporter | null = null;
if (process.env.EMAIL_HOST) {
  transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT || 587),
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

export async function sendVerificationEmail(email: string, token: string) {
  const from = process.env.EMAIL_FROM || 'no-reply@linora.com';
  if (transporter) {
    await transporter.sendMail({
      from,
      to: email,
      subject: 'Verify your email',
      text: `Please verify your email using this token: ${token}`,
    });
  } else {
    console.log(`Email to ${email}: ${token}`);
  }
}

export async function sendEmail(email: string, message: string) {
  const from = process.env.EMAIL_FROM || 'no-reply@linora.com';
  if (transporter) {
    await transporter.sendMail({
      from,
      to: email,
      subject: 'Linora Notification',
      text: message,
    });
  } else {
    console.log(`Email to ${email}: ${message}`);
  }
}
