import twilio from 'twilio';

const client = twilio(
  process.env.TWILIO_SID || '',
  process.env.TWILIO_TOKEN || '',
);

export async function sendSMS(phone: string, message: string) {
  if (!process.env.TWILIO_SID) {
    console.log('SMS provider not configured');
    return;
  }
  await client.messages.create({
    from: process.env.TWILIO_FROM,
    to: phone,
    body: message,
  });
}
