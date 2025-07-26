export async function sendVerificationEmail(email: string, token: string) {
  const from = process.env.EMAIL_FROM || 'no-reply@example.com';
  console.log(`Sending email from ${from} to ${email} with token ${token}`);
}
