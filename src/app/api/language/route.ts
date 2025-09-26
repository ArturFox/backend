import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server';

export async function GET() {

  try {

    const language = await prisma.language.findMany();

    if (language.length === 0) {
      return NextResponse.json({ message: 'Языки не найдены в базе данных' }, { status: 400 });
    }

    return NextResponse.json(language);

  } catch (error) {

    
    return NextResponse.json({ message: 'Ошибка сервера' }, { status: 500 });

  }
}