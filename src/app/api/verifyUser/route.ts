// src/app/api/verifyUser/route.ts

import { prisma } from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';


interface VerifyCodeRequest {
  userId: string;
  code: string;
};

export async function POST(req: NextRequest) {
  try {
    const body: VerifyCodeRequest = await req.json();

    const verification = await prisma.verificationCode.findFirst({
      where: {
        userId: body.userId,
        code: body.code,
      },
    });

    if (!verification) {
      return NextResponse.json({ message: 'Код неверный' }, { status: 400 });
    }

    if (verification.expiresAt < new Date()) {
      return NextResponse.json({ message: 'Код истёк' }, { status: 400 });
    }

    // Обновляем пользователя
    await prisma.user.update({
      where: { id: body.userId },
      data: { verified: true },
    });

    // Можно удалить код, чтобы больше не использовать
    await prisma.verificationCode.delete({
      where: { id: verification.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    const err = error as Error;
    console.error('Error [VERIFY_CODE]', err.message);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
