import { prisma } from '@/lib/prisma';
import { hashSync } from 'bcrypt';
import { sendEmail } from '@/lib/send-email';
import { Prisma } from '@prisma/client';
import { NextResponse } from 'next/server';

interface RegisterRequest {
  email: string;
  fullName: string;
  password: string;
}

export async function POST(req: Request) {
  try {
    const body: RegisterRequest = await req.json();

    const user = await prisma.user.findFirst({
      where: { email: body.email },
    });

    if (user) {
      if (!user.verified) {
        return NextResponse.json({ message: 'Почта не подтверждена' }, { status: 400 });
      }
      return NextResponse.json({ message: 'Пользователь уже существует' }, { status: 400 });
    }

    const createdUser = await prisma.user.create({
      data: {
        email: body.email,
        fullName: body.fullName,
        password: hashSync(body.password, 10),
      },
    });

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await prisma.verificationCode.create({
      data: {
        code,
        userId: createdUser.id,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      },
    });

    const html = `
      <p>Код подтверждения: <h2>${code}</h2></p>
      <p><a href="http://localhost:3000/api/auth/verify?code=${code}">Подтвердить регистрацию</a></p>
    `;

    await sendEmail(createdUser.email, 'Next Pizza / Подтверждение регистрации', html);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error [CREATE_USER]', error);
    return NextResponse.json({ message: error.message || 'Ошибка сервера' }, { status: 500 });
  }
}
