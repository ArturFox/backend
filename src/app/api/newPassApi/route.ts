import { prisma } from "@/lib/prisma";
import { hashSync } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

interface Request{
    password: string;
    userId: string;
};

export async function POST(req: NextRequest) {
    try{
        const body: Request = await req.json();

        const user = await prisma.user.update({
            where: {id: body.userId},
            data: {
                password: hashSync(body.password, 10),
                verified: true,
            }
        });

        return NextResponse.json({success: true, message: "Пароль успешно обновлён",}, {status: 200});
    } catch(e){
        return NextResponse.json( { message: "Ошибка при обновлении пароля" }, { status: 500 });
    }
}