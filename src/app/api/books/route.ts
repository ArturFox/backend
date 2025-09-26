import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {

    const { searchParams } = new URL(req.url);

    const genres = searchParams.get('жанр')?.split(',') || [];
    const languages = searchParams.get('языки')?.split(',') || [];
    const formats = searchParams.get('формат')?.split(',') || [];

    const books = await prisma.book.findMany({

        where: {
            ...(genres.length > 0 && { genreId: { in: genres } }),
            ...(languages.length > 0 && { languageId: { in: languages } }),
            ...(formats.length > 0 && { formatId: { in: formats } }),
        },

        include: {
            genre: true,
            language: true,
            dynamicCategory: true,
            format: true,
            discount: true,
        },
    });

    if (books.length === 0) {
      return NextResponse.json({ message: 'Книги не найдены в базе данных' }, { status: 400 });
    }

    const foundGenreIds = new Set(books.map(b => b.genreId));
    const foundLanguageIds = new Set(books.map(b => b.languageId));
    const foundFormatIds = new Set(books.map(b => b.formatId));

    const allGenresFound = genres.every(id => foundGenreIds.has(id));
    const allLanguagesFound = languages.every(id => foundLanguageIds.has(id));
    const allFormatsFound = formats.every(id => foundFormatIds.has(id));

    if (!allGenresFound || !allLanguagesFound || !allFormatsFound) {

      return NextResponse.json(

        { message: 'Не все фильтры найдены в базе данных' }, { status: 400 }

      );
      
    };

    return NextResponse.json(books);
    
  } catch (error) {
    
    return NextResponse.json({ message: 'Ошибка сервера' }, { status: 500 });
  }
}
