import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/lib/prisma';
import { sendEmail } from "@/lib/send-email";

interface ResendVerificationRequest{
    userId: string;
}

export async function POST(req: NextRequest) {
    try{
        const { userId }: ResendVerificationRequest = await req.json();

        await prisma.verificationCode.deleteMany({
            where:{
                userId,
                type: 'registration'
            },
        });

        const code = Math.floor(100000 + Math.random() * 900000).toString();

        await prisma.verificationCode.create({
            data: {
                userId,
                code,
                type: 'registration',
                expiresAt: new Date(Date.now() + 10 * 60 * 1000),
            },
        });

        const user = await prisma.user.findUnique({ where: { id: userId } });
        
        if (!user) {
            return NextResponse.json({ success: false, message: "Пользователь не найден" }, { status: 404 });
        }

        const html = `<p>Ваш новый код подтверждения: <h2>${code}</h2></p>`;
        await sendEmail(user.email, "Next Pizza / Подтверждение регистрации", html);

        return NextResponse.json({ success: true, message: "Новый код отправлен на почту" });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message || "Ошибка сервера" }, { status: 500 });
    }
}