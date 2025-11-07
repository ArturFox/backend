const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  try {
    const users = await prisma.user.findMany();
    console.log('✅ Prisma работает. Пользователи:', users);
  } catch (e) {
    console.error('❌ Ошибка Prisma:', e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
