const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';
import { Book, Format } from "@prisma/client";

type BookType = Book & {
    format: Format;
};

export const getById = async (id: string): Promise<BookType> => {
    const response = await fetch(`${BASE_URL}/get-product-id/${id}`);

    if(!response.ok){
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || "Книги нету");
    }

    return response.json()
}