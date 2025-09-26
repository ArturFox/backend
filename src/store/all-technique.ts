import { create } from "zustand";
import { Book, DynamicCategory, Genre, Language, Format, Discount } from "@prisma/client";
import { Api } from "@/services/api-client";
import toast from "react-hot-toast";

export const BookCategoryNames: Record<string, string> = {
    POPULAR: "Популярное",
    RUSSIAN_CLASSIC: "Русская классика",
};

export type BookWithRelations = Book & {
  genre: Genre;
  language: Language;
  format: Format;
  discount: Discount;
  dynamicCategory?: DynamicCategory;
};

interface DataAllBookStore {
  books: BookWithRelations[];
  genres: Genre[];
  formats: Format[];
  languages: Language[];
  loading: boolean;
  fetchData: (params?: Record<string, any>) => Promise<Error | null>;
}

export const useAllBookStore = create<DataAllBookStore>((set) => ({
    books: [],
    genres: [],
    languages: [],
    formats: [],
    loading: true,

    fetchData: async (params?: Record<string, string>) => {

        set({loading: true});

        try{

            const [books, allFillters] = await Promise.all([
                Api.book.getAllBooks(params),
                Api.allFillters.getAllFilter(),
            ]);

            set({
                books, 
                genres: allFillters.genre, 
                languages: allFillters.language, 
                formats: allFillters.format,
            });

            return null;

        } catch(error: unknown){
            
            const err = error instanceof Error ? error : new Error("Что-то пошло не так");
            return err;

        } finally{

            set({loading: false});

        }
    }

}));