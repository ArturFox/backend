import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface Params {
  params: { id: string };
}

export async function GET(req: Request, { params }: Params) {
  try {
    const { id } = params;

    const product = await prisma.book.findUnique({
      where: { id },
      include: {
        format: true,
        
      }
    });

    if (!product) {
      return NextResponse.json(
        { message: "Товар не найден" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ message: "Ошибка сервера" }, { status: 500 });
  }
}
