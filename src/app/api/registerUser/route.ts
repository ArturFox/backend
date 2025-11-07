// src/app/api/registerUser/route.ts
import { prisma } from '@/lib/prisma';
import { hashSync } from 'bcrypt';
import { sendEmail } from '@/lib/send-email';
import { NextResponse, NextRequest } from 'next/server';

interface RegisterRequest {
  email: string;
  fullName: string;
  password: string;
}

export async function POST(req: NextRequest) {
  console.log("Получен метод:", req.method);

  // Логируем сырое тело запроса
  const rawBody = await req.text();
  console.log("Raw body:", rawBody);

  let body: RegisterRequest;
  try {
    body = JSON.parse(rawBody); // Парсим вручную, чтобы поймать ошибки
  } catch (err) {
    console.error("Ошибка парсинга JSON:", err);
    return NextResponse.json({ message: "Невалидный JSON" }, { status: 400 });
  }

  // Проверка, что все поля есть
  if (!body.email || !body.fullName || !body.password) {
    return NextResponse.json({ message: "Пожалуйста, заполните все поля" }, { status: 400 });
  }

  try {
    // Проверяем существующего пользователя
    const existingUser = await prisma.user.findFirst({
      where: { email: body.email },
    });
    console.log("Существующий пользователь:", existingUser);

    if (existingUser) {
      if (!existingUser.verified) {
        return NextResponse.json({ message: 'Почта не подтверждена' }, { status: 400 });
      }
      return NextResponse.json({ message: 'Пользователь уже существует' }, { status: 400 });
    }

    // Генерируем код подтверждения
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // Транзакция только для базы
    const createdUser = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email: body.email,
          fullName: body.fullName,
          password: hashSync(body.password, 10),
        },
      });

      await tx.verificationCode.create({
        data: {
          code,
          userId: user.id,
          expiresAt: new Date(Date.now() + 10 * 60 * 1000),
          type: 'registration',
        },
      });

      return user;
    });

    console.log("Пользователь и verificationCode созданы:", createdUser, code);

    // Отправляем письмо после транзакции
    const html = `<p>Код подтверждения: <h2>${code}</h2></p>`;
    await sendEmail(createdUser.email, 'Next Pizza / Подтверждение регистрации', html);
    console.log("Email отправлен");

    return NextResponse.json({
      success: true,
      userId: createdUser.id,
      message: 'Подтвердите свою почту'
    }, { status: 200 });

  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Ошибка регистрации пользователя:", error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: 'Неизвестная ошибка' }, { status: 500 });
  }
}
