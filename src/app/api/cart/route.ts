import { prisma } from '@/lib/prisma';
import { getUserSession } from '@/lib/get-user-session';
import { NextRequest, NextResponse } from 'next/server';
import { CreateCartItemValues } from '@/i-dont-no/dto';
import crypto from 'crypto';

async function findOrCreateCart(userId: string | null, cartToken: string | null) {
  let cart = await prisma.cart.findFirst({
    where: {
      OR: [
        { userId: userId ?? undefined },
        { tokenId: cartToken ?? undefined },
      ],
    },
    include: { items: { include: { book: true } } },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: {
        userId: userId ?? undefined,
        tokenId: cartToken ?? crypto.randomUUID(),
      },
      include: { items: { include: { book: true } } },
    });
  }

  return cart;
}

export async function GET(req: NextRequest) {
  const user = await getUserSession();
  const cartToken = req.cookies.get('cartToken')?.value ?? null;

  const cart = await findOrCreateCart(user?.id ?? null, cartToken);

  const totalAmount = cart.items.reduce((acc, item) => acc + item.book.price * item.quantity, 0);

  return NextResponse.json({ items: cart.items, totalAmount, cartToken: cart.tokenId });
}

export async function POST(req: NextRequest) {
  const user = await getUserSession();
  let cartToken = req.cookies.get('cartToken')?.value ?? null;

  const data = (await req.json()) as CreateCartItemValues;

  const cart = await findOrCreateCart(user?.id ?? null, cartToken);
  cartToken = cart.tokenId;

  // Проверяем, есть ли книга в корзине
  const existing = await prisma.cartItem.findFirst({
    where: { cartId: cart.id, bookId: data.bookId },
  });

  if (existing) {
    await prisma.cartItem.update({
      where: { id: existing.id },
      data: { quantity: existing.quantity + data.quantity },
    });
  } else {
    await prisma.cartItem.create({
      data: { cartId: cart.id, bookId: data.bookId, quantity: data.quantity },
    });
  }

  const updatedCart = await prisma.cart.findUnique({
    where: { id: cart.id },
    include: { items: { include: { book: true } } },
  });

  const totalAmount = updatedCart!.items.reduce(
    (acc, item) => acc + item.book.price * item.quantity,
    0
  );

  const resp = NextResponse.json({ items: updatedCart!.items, totalAmount });
  resp.cookies.set('cartToken', cartToken);
  return resp;
}
