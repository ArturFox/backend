import { Genre, Language, Format } from "@prisma/client";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

type AllFilterType = {
    genre: Genre[];
    language: Language[];
    format: Format[];
};

export const getAllFilter = async (): Promise<AllFilterType> => {

    const [genreAll, languageAll, formatAll] = await Promise.all([
        
        fetch(`${BASE_URL}/genre`).then( async (res) => {
            if(!res.ok){
                const errorData = await res.json().catch(() => null);
                throw new Error(errorData?.message || "Ошибка загрузки жанров");
            };
            return res.json() as Promise<Genre[]>;
        }),

        fetch(`${BASE_URL}/language`).then( async (res) => {
            if(!res.ok){
                const errorData = await res.json().catch(() => null);
                throw new Error(errorData?.message || "Ошибка загрузки языков");
            };
            return res.json() as Promise<Language[]>;
        }),

        fetch(`${BASE_URL}/formats`).then( async (res) => {
            if(!res.ok){
                const errorData = await res.json().catch(() => null);
                throw new Error(errorData?.message || "Ошибка загрузки форматов");
            };
            return res.json() as Promise<Format[]>;
        }),
    ]);

    return {
        genre: genreAll,
        language: languageAll,
        format: formatAll,
    };

};