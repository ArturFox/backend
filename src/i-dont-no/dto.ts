import { Cart, CartItem, Book } from '@prisma/client';

// Расширенный тип CartItem для фронта
export type CartItemDTO = CartItem & {
  book: Book; // вложенная книга
};

// Тип, который возвращает API
export type CartResponse = Cart & {
  items: CartItemDTO[];
};

// Тип для создания нового элемента корзины
export interface CreateCartItemValues {
  bookId: string;  // вместо productItemId
  quantity: number;
};
