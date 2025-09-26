import { PrismaClient } from '@prisma/client';
import { hashSync } from 'bcrypt';

const prisma = new PrismaClient();

async function up() {

  // Genres
  await prisma.genre.createMany({
    data: [
      { name: 'Фантастика и фэнтези' },
      { name: 'Русская классика' },
      { name: 'Зарубежная литература' },
      { name: 'Комиксы' },
      { name: 'История' },
    ],
  });

  // Languages
  await prisma.language.createMany({
    data: [
      { name: 'Русский' },
      { name: 'Английский' },
      { name: 'Французкий' },
      { name: 'Немецкий' },
      { name: 'Китайский' },
    ],
  });

  await prisma.format.createMany({
    data: [
      { name: 'Текст' },
      { name: 'Аудио' },
    ],
  });

  await prisma.dynamicCategory.createMany({
    data: [
      {name: 'Хотите купить'},
    ],
    skipDuplicates: true,
  });
  

  // Books
  const genres = await prisma.genre.findMany();
  const languages = await prisma.language.findMany();
  const format = await prisma.format.findMany();
  const dynamicCategories = await prisma.dynamicCategory.findMany();

  await prisma.book.createMany({
  data: [
    // Фантастика и фэнтези
    {
      title: 'Дюна',
      author: 'Фрэнк Герберт',
      description: 'Эпическая космическая сага о борьбе за власть над пустынной планетой Арракис, где добывают «специю» — ключ к контролю над Вселенной.',
      category: 'POPULAR',
      price: 1000,
      tag: 'BESTSELLER',

      genreId: genres.find(g => g.name === 'Фантастика и фэнтези').id,
      languageId: languages.find(l => l.name === 'Русский').id,
      formatId: format.find(f => f.name === 'Текст').id,
      imageUrl: 'https://cdn.litres.ru/pub/c/cover_415/71512585.webp',
      dynamicCategoryId: dynamicCategories.find(d => d.name === 'Хотите купить')?.id,
    },
    {
      title: 'Мессия Дюны',
      author: 'Фрэнк Герберт',
      description: 'Эпическая космическая сага о борьбе за власть над пустынной планетой Арракис, где добывают «специю» — ключ к контролю над Вселенной.',
      category: 'POPULAR',
      price: 1000,
      tag: 'BESTSELLER',

      genreId: genres.find(g => g.name === 'Фантастика и фэнтези').id,
      languageId: languages.find(l => l.name === 'Русский').id,
      formatId: format.find(f => f.name === 'Текст').id,
      imageUrl: 'https://cdn.litres.ru/pub/c/cover_415/71512585.webp',
      dynamicCategoryId: dynamicCategories.find(d => d.name === 'Хотите купить')?.id,
    },
    {
      title: 'Дети Дюны',
      author: 'Фрэнк Герберт',
      description: 'Эпическая космическая сага о борьбе за власть над пустынной планетой Арракис, где добывают «специю» — ключ к контролю над Вселенной.',
      category: 'POPULAR',
      price: 1000,
      tag: 'BESTSELLER',

      genreId: genres.find(g => g.name === 'Фантастика и фэнтези').id,
      languageId: languages.find(l => l.name === 'Русский').id,
      formatId: format.find(f => f.name === 'Текст').id,
      imageUrl: 'https://cdn.litres.ru/pub/c/cover_415/71512585.webp',
      dynamicCategoryId: dynamicCategories.find(d => d.name === 'Хотите купить')?.id,
    },
    {
      title: 'Бог-император Дюны',
      author: 'Фрэнк Герберт',
      description: 'Эпическая космическая сага о борьбе за власть над пустынной планетой Арракис, где добывают «специю» — ключ к контролю над Вселенной.',
      category: 'POPULAR',
      price: 1000,
      tag: 'BESTSELLER',

      genreId: genres.find(g => g.name === 'Фантастика и фэнтези').id,
      languageId: languages.find(l => l.name === 'Русский').id,
      formatId: format.find(f => f.name === 'Текст').id,
      imageUrl: 'https://cdn.litres.ru/pub/c/cover_415/71512585.webp',
      dynamicCategoryId: dynamicCategories.find(d => d.name === 'Хотите купить')?.id,
    },
    {
      title: 'Еретики Дюны',
      author: 'Фрэнк Герберт',
      description: 'Эпическая космическая сага о борьбе за власть над пустынной планетой Арракис, где добывают «специю» — ключ к контролю над Вселенной.',
      category: 'POPULAR',
      price: 1000,
      tag: 'BESTSELLER',

      genreId: genres.find(g => g.name === 'Фантастика и фэнтези').id,
      languageId: languages.find(l => l.name === 'Русский').id,
      formatId: format.find(f => f.name === 'Текст').id,
      imageUrl: 'https://cdn.litres.ru/pub/c/cover_415/71512585.webp',
      dynamicCategoryId: dynamicCategories.find(d => d.name === 'Хотите купить')?.id,
    },
    {
      title: 'Капитул Дюны',
      author: 'Фрэнк Герберт',
      description: 'Эпическая космическая сага о борьбе за власть над пустынной планетой Арракис, где добывают «специю» — ключ к контролю над Вселенной.',
      category: 'POPULAR',
      price: 1000,
      tag: 'BESTSELLER',

      genreId: genres.find(g => g.name === 'Фантастика и фэнтези').id,
      languageId: languages.find(l => l.name === 'Русский').id,
      formatId: format.find(f => f.name === 'Текст').id,
      imageUrl: 'https://cdn.litres.ru/pub/c/cover_415/71512585.webp',
      dynamicCategoryId: dynamicCategories.find(d => d.name === 'Хотите купить')?.id,
    },



    {
      title: 'Хоббит, или Туда и обратно',
      author: 'Дж. Р. Р. Толкин',
      description: 'Фэнтезийная эпопея о борьбе добра и зла в Средиземье, приключениях хоббитов, людей, эльфов и гномов.',
      category: 'POPULAR',
      price: 1000,
      tag: 'BESTSELLER',

      genreId: genres.find(g => g.name === 'Фантастика и фэнтези').id,
      languageId: languages.find(l => l.name === 'Английский').id,
      formatId: format.find(f => f.name === 'Текст').id,
      imageUrl: 'https://cdn.litres.ru/pub/c/cover_415/71512585.webp',
      dynamicCategoryId: dynamicCategories.find(d => d.name === 'Хотите купить')?.id,
    },
    {
      title: 'Властелин колец',
      author: 'Дж. Р. Р. Толкин',
      description: 'Фэнтезийная эпопея о борьбе добра и зла в Средиземье, приключениях хоббитов, людей, эльфов и гномов.',
      category: 'POPULAR',
      price: 1000,
      tag: 'BESTSELLER',

      genreId: genres.find(g => g.name === 'Фантастика и фэнтези').id,
      languageId: languages.find(l => l.name === 'Английский').id,
      formatId: format.find(f => f.name === 'Текст').id,
      imageUrl: 'https://cdn.litres.ru/pub/c/cover_415/71512585.webp',
      dynamicCategoryId: dynamicCategories.find(d => d.name === 'Хотите купить')?.id,
    },
    {
      title: 'Сильмариллион',
      author: 'Дж. Р. Р. Толкин',
      description: 'Фэнтезийная эпопея о борьбе добра и зла в Средиземье, приключениях хоббитов, людей, эльфов и гномов.',
      category: 'POPULAR',
      price: 1000,
      tag: 'BESTSELLER',

      genreId: genres.find(g => g.name === 'Фантастика и фэнтези').id,
      languageId: languages.find(l => l.name === 'Английский').id,
      formatId: format.find(f => f.name === 'Текст').id,
      imageUrl: 'https://cdn.litres.ru/pub/c/cover_415/71512585.webp',
      dynamicCategoryId: dynamicCategories.find(d => d.name === 'Хотите купить')?.id,
    },
    {
      title: 'Неоконченные предания Нуменора и Средиземья',
      author: 'Дж. Р. Р. Толкин',
      description: 'Фэнтезийная эпопея о борьбе добра и зла в Средиземье, приключениях хоббитов, людей, эльфов и гномов.',
      category: 'POPULAR',
      price: 1000,
      tag: 'BESTSELLER',

      genreId: genres.find(g => g.name === 'Фантастика и фэнтези').id,
      languageId: languages.find(l => l.name === 'Английский').id,
      formatId: format.find(f => f.name === 'Текст').id,
      imageUrl: 'https://cdn.litres.ru/pub/c/cover_415/71512585.webp',
      dynamicCategoryId: dynamicCategories.find(d => d.name === 'Хотите купить')?.id,
    },
    {
      title: 'Дети Хурина',
      author: 'Дж. Р. Р. Толкин',
      description: 'Фэнтезийная эпопея о борьбе добра и зла в Средиземье, приключениях хоббитов, людей, эльфов и гномов.',
      category: 'POPULAR',
      price: 1000,
      tag: 'BESTSELLER',

      genreId: genres.find(g => g.name === 'Фантастика и фэнтези').id,
      languageId: languages.find(l => l.name === 'Английский').id,
      formatId: format.find(f => f.name === 'Текст').id,
      imageUrl: 'https://cdn.litres.ru/pub/c/cover_415/71512585.webp',
      dynamicCategoryId: dynamicCategories.find(d => d.name === 'Хотите купить')?.id,
    },
    {
      title: 'Берен и Лутиэн',
      author: 'Дж. Р. Р. Толкин',
      description: 'Фэнтезийная эпопея о борьбе добра и зла в Средиземье, приключениях хоббитов, людей, эльфов и гномов.',
      category: 'POPULAR',
      price: 1000,
      tag: 'BESTSELLER',

      genreId: genres.find(g => g.name === 'Фантастика и фэнтези').id,
      languageId: languages.find(l => l.name === 'Английский').id,
      formatId: format.find(f => f.name === 'Текст').id,
      imageUrl: 'https://cdn.litres.ru/pub/c/cover_415/71512585.webp',
      dynamicCategoryId: dynamicCategories.find(d => d.name === 'Хотите купить')?.id,
    },
    {
      title: 'Падение Гондолина',
      author: 'Дж. Р. Р. Толкин',
      description: 'Фэнтезийная эпопея о борьбе добра и зла в Средиземье, приключениях хоббитов, людей, эльфов и гномов.',
      category: 'POPULAR',
      price: 1000,
      tag: 'BESTSELLER',

      genreId: genres.find(g => g.name === 'Фантастика и фэнтези').id,
      languageId: languages.find(l => l.name === 'Английский').id,
      formatId: format.find(f => f.name === 'Текст').id,
      imageUrl: 'https://cdn.litres.ru/pub/c/cover_415/71512585.webp',
      dynamicCategoryId: dynamicCategories.find(d => d.name === 'Хотите купить')?.id,
    },



    {
      title: 'Гарри Поттер и философский камень ',
      author: 'Дж. К. Роулинг',
      description: 'История мальчика-волшебника, который поступает в школу магии Хогвартс и сталкивается с силами зла.',
      category: 'POPULAR',
      price: 1000,
      tag: 'BESTSELLER',

      genreId: genres.find(g => g.name === 'Фантастика и фэнтези').id,
      languageId: languages.find(l => l.name === 'Английский').id,
      formatId: format.find(f => f.name === 'Текст').id,
      imageUrl: 'https://cdn.litres.ru/pub/c/cover_415/71512585.webp',
      dynamicCategoryId: dynamicCategories.find(d => d.name === 'Хотите купить')?.id,
    },
    {
      title: 'Гарри Поттер и Тайная комната',
      author: 'Дж. К. Роулинг',
      description: 'История мальчика-волшебника, который поступает в школу магии Хогвартс и сталкивается с силами зла.',
      category: 'POPULAR',
      price: 1000,
      tag: 'BESTSELLER',

      genreId: genres.find(g => g.name === 'Фантастика и фэнтези').id,
      languageId: languages.find(l => l.name === 'Английский').id,
      formatId: format.find(f => f.name === 'Текст').id,
      imageUrl: 'https://cdn.litres.ru/pub/c/cover_415/71512585.webp',
      dynamicCategoryId: dynamicCategories.find(d => d.name === 'Хотите купить')?.id,
    },
    {
      title: 'Гарри Поттер и узник Азкабана',
      author: 'Дж. К. Роулинг',
      description: 'История мальчика-волшебника, который поступает в школу магии Хогвартс и сталкивается с силами зла.',
      category: 'POPULAR',
      price: 1000,
      tag: 'BESTSELLER',

      genreId: genres.find(g => g.name === 'Фантастика и фэнтези').id,
      languageId: languages.find(l => l.name === 'Английский').id,
      formatId: format.find(f => f.name === 'Текст').id,
      imageUrl: 'https://cdn.litres.ru/pub/c/cover_415/71512585.webp',
      dynamicCategoryId: dynamicCategories.find(d => d.name === 'Хотите купить')?.id,
    },
    {
      title: 'Гарри Поттер и Кубок огня',
      author: 'Дж. К. Роулинг',
      description: 'История мальчика-волшебника, который поступает в школу магии Хогвартс и сталкивается с силами зла.',
      category: 'POPULAR',
      price: 1000,
      tag: 'BESTSELLER',

      genreId: genres.find(g => g.name === 'Фантастика и фэнтези').id,
      languageId: languages.find(l => l.name === 'Английский').id,
      formatId: format.find(f => f.name === 'Текст').id,
      imageUrl: 'https://cdn.litres.ru/pub/c/cover_415/71512585.webp',
      dynamicCategoryId: dynamicCategories.find(d => d.name === 'Хотите купить')?.id,
    },
    {
      title: 'Гарри Поттер и Орден Феникса',
      author: 'Дж. К. Роулинг',
      description: 'История мальчика-волшебника, который поступает в школу магии Хогвартс и сталкивается с силами зла.',
      category: 'POPULAR',
      price: 1000,
      tag: 'BESTSELLER',

      genreId: genres.find(g => g.name === 'Фантастика и фэнтези').id,
      languageId: languages.find(l => l.name === 'Английский').id,
      formatId: format.find(f => f.name === 'Текст').id,
      imageUrl: 'https://cdn.litres.ru/pub/c/cover_415/71512585.webp',
      dynamicCategoryId: dynamicCategories.find(d => d.name === 'Хотите купить')?.id,
    },
    {
      title: 'Гарри Поттер и Принц-полукровка',
      author: 'Дж. К. Роулинг',
      description: 'История мальчика-волшебника, который поступает в школу магии Хогвартс и сталкивается с силами зла.',
      category: 'POPULAR',
      price: 1000,
      tag: 'BESTSELLER',

      genreId: genres.find(g => g.name === 'Фантастика и фэнтези').id,
      languageId: languages.find(l => l.name === 'Английский').id,
      formatId: format.find(f => f.name === 'Текст').id,
      imageUrl: 'https://cdn.litres.ru/pub/c/cover_415/71512585.webp',
      dynamicCategoryId: dynamicCategories.find(d => d.name === 'Хотите купить')?.id,
    },
    {
      title: 'Гарри Поттер и Дары Смерти',
      author: 'Дж. К. Роулинг',
      description: 'История мальчика-волшебника, который поступает в школу магии Хогвартс и сталкивается с силами зла.',
      category: 'POPULAR',
      price: 1000,
      tag: 'BESTSELLER',

      genreId: genres.find(g => g.name === 'Фантастика и фэнтези').id,
      languageId: languages.find(l => l.name === 'Английский').id,
      formatId: format.find(f => f.name === 'Текст').id,
      imageUrl: 'https://cdn.litres.ru/pub/c/cover_415/71512585.webp',
      dynamicCategoryId: dynamicCategories.find(d => d.name === 'Хотите купить')?.id,
    },

    





    {
      title: 'Лицейские стихотворения',
      author: 'Ал. С. Пушкин',
      description: 'История мальчика-волшебника, который поступает в школу магии Хогвартс и сталкивается с силами зла.',
      category: 'RUSSIAN_CLASSIC',
      price: 1000,
      tag: 'NEW_ARRIVAL',

      genreId: genres.find(g => g.name === 'Русская классика').id,
      languageId: languages.find(l => l.name === 'Русский').id,
      formatId: format.find(f => f.name === 'Аудио').id,
      imageUrl: 'https://cdn.litres.ru/pub/c/cover_415/71512585.webp',
      dynamicCategoryId: dynamicCategories.find(d => d.name === 'Хотите купить')?.id,
    },
    {
      title: 'Стихотворения петербургского периода',
      author: 'Ал. С. Пушкин',
      description: 'История мальчика-волшебника, который поступает в школу магии Хогвартс и сталкивается с силами зла.',
      category: 'RUSSIAN_CLASSIC',
      price: 1000,
      tag: 'NEW_ARRIVAL',

      genreId: genres.find(g => g.name === 'Русская классика').id,
      languageId: languages.find(l => l.name === 'Русский').id,
      formatId: format.find(f => f.name === 'Аудио').id,
      imageUrl: 'https://cdn.litres.ru/pub/c/cover_415/71512585.webp',
      dynamicCategoryId: dynamicCategories.find(d => d.name === 'Хотите купить')?.id,
    },
    {
      title: 'Южные стихотворения',
      author: 'Ал. С. Пушкин',
      description: 'История мальчика-волшебника, который поступает в школу магии Хогвартс и сталкивается с силами зла.',
      category: 'RUSSIAN_CLASSIC',
      price: 1000,
      tag: 'NEW_ARRIVAL',

      genreId: genres.find(g => g.name === 'Русская классика').id,
      languageId: languages.find(l => l.name === 'Русский').id,
      formatId: format.find(f => f.name === 'Аудио').id,
      imageUrl: 'https://cdn.litres.ru/pub/c/cover_415/71512585.webp',
      dynamicCategoryId: dynamicCategories.find(d => d.name === 'Хотите купить')?.id,
    },
    {
      title: 'Стихотворения зрелого периода',
      author: 'Ал. С. Пушкин',
      description: 'История мальчика-волшебника, который поступает в школу магии Хогвартс и сталкивается с силами зла.',
      category: 'RUSSIAN_CLASSIC',
      price: 1000,
      tag: 'NEW_ARRIVAL',

      genreId: genres.find(g => g.name === 'Русская классика').id,
      languageId: languages.find(l => l.name === 'Русский').id,
      formatId: format.find(f => f.name === 'Аудио').id,
      imageUrl: 'https://cdn.litres.ru/pub/c/cover_415/71512585.webp',
      dynamicCategoryId: dynamicCategories.find(d => d.name === 'Хотите купить')?.id,
    },
    {
      title: 'Стихотворения позднего периода',
      author: 'Ал. С. Пушкин',
      description: 'История мальчика-волшебника, который поступает в школу магии Хогвартс и сталкивается с силами зла.',
      category: 'RUSSIAN_CLASSIC',
      price: 1000,
      tag: 'NEW_ARRIVAL',

      genreId: genres.find(g => g.name === 'Русская классика').id,
      languageId: languages.find(l => l.name === 'Русский').id,
      formatId: format.find(f => f.name === 'Аудио').id,
      imageUrl: 'https://cdn.litres.ru/pub/c/cover_415/71512585.webp',
      dynamicCategoryId: dynamicCategories.find(d => d.name === 'Хотите купить')?.id,
    },
    {
      title: 'Руслан и Людмила',
      author: 'Ал. С. Пушкин',
      description: 'История мальчика-волшебника, который поступает в школу магии Хогвартс и сталкивается с силами зла.',
      category: 'RUSSIAN_CLASSIC',
      price: 1000,
      tag: 'NEW_ARRIVAL',

      genreId: genres.find(g => g.name === 'Русская классика').id,
      languageId: languages.find(l => l.name === 'Русский').id,
      formatId: format.find(f => f.name === 'Аудио').id,
      imageUrl: 'https://cdn.litres.ru/pub/c/cover_415/71512585.webp',
      dynamicCategoryId: dynamicCategories.find(d => d.name === 'Хотите купить')?.id,
    },
    {
      title: 'Бахчисарайский фонтан',
      author: 'Ал. С. Пушкин',
      description: 'История мальчика-волшебника, который поступает в школу магии Хогвартс и сталкивается с силами зла.',
      category: 'RUSSIAN_CLASSIC',
      price: 1000,
      tag: 'NEW_ARRIVAL',

      genreId: genres.find(g => g.name === 'Русская классика').id,
      languageId: languages.find(l => l.name === 'Русский').id,
      formatId: format.find(f => f.name === 'Аудио').id,
      imageUrl: 'https://cdn.litres.ru/pub/c/cover_415/71512585.webp',
      dynamicCategoryId: dynamicCategories.find(d => d.name === 'Хотите купить')?.id,
    },
    {
      title: 'Кавказский пленник',
      author: 'Ал. С. Пушкин',
      description: 'История мальчика-волшебника, который поступает в школу магии Хогвартс и сталкивается с силами зла.',
      category: 'RUSSIAN_CLASSIC',
      price: 1000,
      tag: 'NEW_ARRIVAL',

      genreId: genres.find(g => g.name === 'Русская классика').id,
      languageId: languages.find(l => l.name === 'Русский').id,
      formatId: format.find(f => f.name === 'Аудио').id,
      imageUrl: 'https://cdn.litres.ru/pub/c/cover_415/71512585.webp',
      dynamicCategoryId: dynamicCategories.find(d => d.name === 'Хотите купить')?.id,
    },
    {
      title: 'Цыганы',
      author: 'Ал. С. Пушкин',
      description: 'История мальчика-волшебника, который поступает в школу магии Хогвартс и сталкивается с силами зла.',
      category: 'RUSSIAN_CLASSIC',
      price: 1000,
      tag: 'NEW_ARRIVAL',

      genreId: genres.find(g => g.name === 'Русская классика').id,
      languageId: languages.find(l => l.name === 'Русский').id,
      formatId: format.find(f => f.name === 'Аудио').id,
      imageUrl: 'https://cdn.litres.ru/pub/c/cover_415/71512585.webp',
      dynamicCategoryId: dynamicCategories.find(d => d.name === 'Хотите купить')?.id,
    },
    {
      title: 'Полтава',
      author: 'Ал. С. Пушкин',
      description: 'История мальчика-волшебника, который поступает в школу магии Хогвартс и сталкивается с силами зла.',
      category: 'RUSSIAN_CLASSIC',
      price: 1000,
      tag: 'NEW_ARRIVAL',

      genreId: genres.find(g => g.name === 'Русская классика').id,
      languageId: languages.find(l => l.name === 'Русский').id,
      formatId: format.find(f => f.name === 'Аудио').id,
      imageUrl: 'https://cdn.litres.ru/pub/c/cover_415/71512585.webp',
      dynamicCategoryId: dynamicCategories.find(d => d.name === 'Хотите купить')?.id,
    },
    {
      title: 'Борис Годунов',
      author: 'Ал. С. Пушкин',
      description: 'История мальчика-волшебника, который поступает в школу магии Хогвартс и сталкивается с силами зла.',
      category: 'RUSSIAN_CLASSIC',
      price: 1000,
      tag: 'NEW_ARRIVAL',

      genreId: genres.find(g => g.name === 'Русская классика').id,
      languageId: languages.find(l => l.name === 'Русский').id,
      formatId: format.find(f => f.name === 'Аудио').id,
      imageUrl: 'https://cdn.litres.ru/pub/c/cover_415/71512585.webp',
      dynamicCategoryId: dynamicCategories.find(d => d.name === 'Хотите купить')?.id,
    },
    {
      title: 'Медный всадник',
      author: 'Ал. С. Пушкин',
      description: 'История мальчика-волшебника, который поступает в школу магии Хогвартс и сталкивается с силами зла.',
      category: 'RUSSIAN_CLASSIC',
      price: 1000,
      tag: 'NEW_ARRIVAL',

      genreId: genres.find(g => g.name === 'Русская классика').id,
      languageId: languages.find(l => l.name === 'Русский').id,
      formatId: format.find(f => f.name === 'Аудио').id,
      imageUrl: 'https://cdn.litres.ru/pub/c/cover_415/71512585.webp',
      dynamicCategoryId: dynamicCategories.find(d => d.name === 'Хотите купить')?.id,
    },
    {
      title: 'Полтава',
      author: 'Ал. С. Пушкин',
      description: 'История мальчика-волшебника, который поступает в школу магии Хогвартс и сталкивается с силами зла.',
      category: 'RUSSIAN_CLASSIC',
      price: 1000,
      tag: 'NEW_ARRIVAL',

      genreId: genres.find(g => g.name === 'Русская классика').id,
      languageId: languages.find(l => l.name === 'Русский').id,
      formatId: format.find(f => f.name === 'Аудио').id,
      imageUrl: 'https://cdn.litres.ru/pub/c/cover_415/71512585.webp',
      dynamicCategoryId: dynamicCategories.find(d => d.name === 'Хотите купить')?.id,
    },


    {
      title: 'Зарубежная литература',
      author: 'Фрэнк Герберт',
      description: 'Эпическая космическая сага о борьбе за власть над пустынной планетой Арракис, где добывают «специю» — ключ к контролю над Вселенной.',
      category: 'POPULAR',
      price: 1000,
      tag: 'BESTSELLER',

      genreId: genres.find(g => g.name === 'Зарубежная литература').id,
      languageId: languages.find(l => l.name === 'Немецкий').id,
      formatId: format.find(f => f.name === 'Аудио').id,
      imageUrl: 'https://cdn.litres.ru/pub/c/cover_415/71512585.webp',
      dynamicCategoryId: dynamicCategories.find(d => d.name === 'Хотите купить')?.id,
    },

    {
      title: 'Комиксы',
      author: 'Фрэнк Герберт',
      description: 'Эпическая космическая сага о борьбе за власть над пустынной планетой Арракис, где добывают «специю» — ключ к контролю над Вселенной.',
      category: 'POPULAR',
      price: 1000,
      tag: 'BESTSELLER',

      genreId: genres.find(g => g.name === 'Комиксы').id,
      languageId: languages.find(l => l.name === 'Китайский').id,
      formatId: format.find(f => f.name === 'Аудио').id,
      imageUrl: 'https://cdn.litres.ru/pub/c/cover_415/71512585.webp',
      dynamicCategoryId: dynamicCategories.find(d => d.name === 'Хотите купить')?.id,
    },

    {
      title: 'История',
      author: 'Фрэнк Герберт',
      description: 'Эпическая космическая сага о борьбе за власть над пустынной планетой Арракис, где добывают «специю» — ключ к контролю над Вселенной.',
      category: 'POPULAR',
      price: 1000,
      tag: 'BESTSELLER',

      genreId: genres.find(g => g.name === 'История').id,
      languageId: languages.find(l => l.name === 'Французкий').id,
      formatId: format.find(f => f.name === 'Аудио').id,
      imageUrl: 'https://cdn.litres.ru/pub/c/cover_415/71512585.webp',
      dynamicCategoryId: dynamicCategories.find(d => d.name === 'Хотите купить')?.id,
    },
  ],
});


  const booksDiscont = await prisma.book.findMany({
    where: { title: {
      in: ['Дюна', 'Мессия Дюны', 'Полтава', 'Медный всадник']
    }},
  });

  for(const books of booksDiscont){
    await prisma.discount.create({
      data: {
        bookId: books.id,
        percent: 20,
        active: true,
      }
    })
  }


  
}

async function down() {
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE "VerificationCode" RESTART IDENTITY CASCADE;`);
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE "Book" RESTART IDENTITY CASCADE;`);
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE "Genre" RESTART IDENTITY CASCADE;`);
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE "Language" RESTART IDENTITY CASCADE;`);
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE;`);
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE "DynamicCategory" RESTART IDENTITY CASCADE;`);
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE "Format" RESTART IDENTITY CASCADE;`);
}

async function main() {
  try {
    await down();
    await up();
  } catch (e) {
    console.error(e);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
