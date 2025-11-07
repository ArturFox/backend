import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface RequestType {
    content: string;
    bookId: string;
    userId: string;
};

export async function POST(req: Request) {
    try{
        const body: RequestType = await req.json();

        const checkCommentInTheBook = await prisma.comment.findFirst({
            where: {
                userId: body.userId,
                bookId: body.bookId,
            }
        });

        if(checkCommentInTheBook){
            return NextResponse.json({message: "Вы уже оставили комментарий для этой книги", success: false}, { status: 400 });
        }

        const postComment = await prisma.comment.create({
            data: {
                content: body.content,
                bookId: body.bookId,
                userId: body.userId,
            },
            include: {
                user: {
                    select: { id: true, fullName: true, email: true },
                },
            },
        });

        return NextResponse.json({ data: postComment, message: 'Комментарий создан', success: true }, { status: 201 });

    } catch(error){
        const err = error as Error;
        return NextResponse.json({ message: err.message || 'Не удалось создать комментарий', success: false }, { status: 500 });

    };
}