import { BookWithRelations } from "@/store/all-technique";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export const getAllBooks = async (params?: Record<string, string>): Promise<BookWithRelations[]> => {
  // Строим query string только если есть параметры
  const query = params ? `?${new URLSearchParams(params as any).toString()}` : '';
  const response = await fetch(`${BASE_URL}/books${query}`);

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || "Ошибка загрузки книг");
  }

  return response.json();
};
