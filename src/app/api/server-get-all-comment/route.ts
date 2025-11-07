import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try{
        const comments = await prisma.comment.findMany({
            include: {
                user: {
                    select: {fullName: true}
                }
            }
        });

        if(comments.length === 0){
            return NextResponse.json({ message: "Комментарии отсутствуют", success: false }, { status: 404 });
        };

        return NextResponse.json({ data: comments, message: 'Комментарии получены', success: true }, { status: 200 });
    } catch(e: unknown){
        const error = e instanceof Error ? e.message : "Что-то пошло не так";
        return NextResponse.json({ message: error, success: false }, { status: 500 });
    }
}