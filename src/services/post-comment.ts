import { Comment, User } from "@prisma/client";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

interface Request {
    content: string;
    bookId: string;
    userId: string;
};

type ResponseData = {
    comment: Comment;
    user: User;  
}

interface Resolver {
  data?: ResponseData;
  message: string;
  success: boolean;
}

export const postComment = async (data: Request): Promise<Resolver> => {
    const res = await fetch(`${BASE_URL}/server-post-comment`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if(!res.ok){
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.message || "Ошибка отправки коммента");
    };

    return await res.json();
};