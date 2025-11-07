import { Comment } from "@prisma/client";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

interface Resolver {
  data?: Comment[];
  message: string;
  success: boolean;
}

export const getAllComments = async (): Promise<Resolver> => {
    const res = await fetch(`${BASE_URL}/server-get-all-comment`);

    if(!res.ok){
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.message || "Не удалось получить комментарии");
    };

    return await res.json();
}