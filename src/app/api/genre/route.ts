import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server';

export async function GET() {

  try {

    const genres = await prisma.genre.findMany();

    if (genres.length === 0) {
      return NextResponse.json({ message: 'Кaтегории не найдены в базе данных' }, { status: 400 });
    }

    return NextResponse.json(genres);

  } catch (error) {

    
    return NextResponse.json({ message: 'Ошибка сервера' }, { status: 500 });

  }
}
