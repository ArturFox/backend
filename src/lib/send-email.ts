/* src/lib/send-email.ts */
'use server';
import { Resend } from 'resend';

const apiKey = process.env.RESEND_API_KEY;

if (!apiKey) {
  console.warn('⚠️ RESEND_API_KEY не указан — email-отправка будет пропущена.');
}

const resend = apiKey ? new Resend(apiKey) : null;

export async function sendEmail(to: string, subject: string, html: string) {
  if (!resend) {
    console.warn('📭 Письмо не отправлено: RESEND_API_KEY отсутствует.');
    return { success: false, message: 'Email API key not provided' };
  }

  try {
    const response = await resend.emails.send({
      from: 'noreply@framework-t.ru',
      to,
      subject,
      html,
    });
    console.log('Resend response:', response);
    return { success: true, response };
  } catch (error) {
    console.error('Ошибка при отправке email:', error);
    return { success: false, message: (error as Error).message };
  }
}
