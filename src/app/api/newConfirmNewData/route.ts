import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  email: string;
  fullName: string;
  password: string;
};

export async function POST(req: NextRequest) {
    try{
        const body: Props = await req.json();

        const user = await prisma.user.findFirst({
            where:{
                email: body.email,
            }
        });

        if(!user){
            return NextResponse.json({ success: false, message: "Пользователь не найден" }, { status: 404 });
        };

        const hashedPassword = await hash(body.password, 10);

        await prisma.user.update({
            where: { email: body.email },
            data: {
                fullName: body.fullName,
                password: hashedPassword,
            },
        });

        

        return NextResponse.json({ success: true, message: "Данные успешно обновлены" });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { success: false, message: "Ошибка сервера" },
            { status: 500 }
        );
    }
}