import { Cart } from '@prisma/client';
import { CartResponse, CreateCartItemValues } from '@/i-dont-no/dto';
import { getRequest } from './instance';

export const fetchCart = async (): Promise<CartResponse> => {
  return await getRequest<CartResponse>('/cart');
};
