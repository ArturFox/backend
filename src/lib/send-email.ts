/*src/lib/send-email.ts*/
'use server';
import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY не указан в .env');
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(to: string, subject: string, html: string) {
  const response = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to,
    subject,
    html,
  });
  console.log('Resend response:', response);
  return response;
}
