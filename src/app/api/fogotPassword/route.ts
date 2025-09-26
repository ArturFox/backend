import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/send-email";
import { NextRequest, NextResponse } from "next/server";

interface PasswordRequest{
    email: string;
}

export async function POST(req: NextRequest) {
    try{
        const body: PasswordRequest = await req.json();

        const user = await prisma.user.findFirst({
            where: {email: body.email},
        });

        if(!user){
            return NextResponse.json({message: 'Такого аккаунта нету'}, {status: 400});
        };

        const code = Math.floor(100000 + Math.random() * 900000).toString();

        await prisma.verificationCode.create({
            data: {
                code,
                userId: user.id,
                type: "forgotPassword",
                expiresAt: new Date(Date.now() + 10 * 60 * 1000),
            },
        });

        const html = `<p>Код восстановления пароля: <h2>${code}</h2></p>`;

        await sendEmail(user.email, "Next Pizza / Восстановление пароля", html);

        return NextResponse.json({success: true, message: 'Код отправлен на вашу почту', userId: user.id}, {status: 200});
    } catch (error) {
        const err = error as Error;
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}