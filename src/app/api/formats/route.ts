import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server';

export async function GET() {
    
  try {

    const formats = await prisma.format.findMany();

    if (formats.length === 0) {
      return NextResponse.json({ message: 'Формы не найдены в базе данных' }, { status: 400 });
    }

    return NextResponse.json(formats);

  } catch (error) {

    
    return NextResponse.json({ message: 'Ошибка сервера' }, { status: 500 });

  }
}