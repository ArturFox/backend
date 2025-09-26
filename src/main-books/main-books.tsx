import { Skeleton } from "@/components/ui/skeleton";
import { useAllBookStore } from "@/store/all-technique"
import { useEffect, useMemo, useState } from "react";
import { BookCategorySection } from "./category";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";


export const MainBooks = () => {

    const searchParams = useSearchParams();
    const router = useRouter();

    const books = useAllBookStore((state) => state.books);
    const loading = useAllBookStore((state) => state.loading);
    const fetchData = useAllBookStore((state) => state.fetchData);

    const [flagError, setFlagError] = useState(false);

    

    useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());

    fetchData(params).then((err) => {
        if (err) {
            setFlagError(true);
        } else {
            setFlagError(false);
        }
    });
}, [searchParams, fetchData]);


    const booksCategories = useMemo(() => {

        return books.reduce((acc, books) => {

            const category = books.category;

            if(!acc[category]){
                acc[category] = [];
            };

            acc[category].push(books);

            return acc;

        }, {} as Record<string, typeof books>)

    }, [books]);

    const clearAll = () => {
        router.push("/");
    }

    

    if(loading){

        return (
            <section className="flex flex-col gap-6">
                
                <div className="flex justify-center m-[3rem]">
                    <Skeleton className="h-6 w-1/3 rounded" />
                </div>

                
                <div className="grid grid-cols-5 gap-x-6 gap-y-20
                                max-[1024px]:grid-cols-2
                                max-[640px]:grid-cols-1">

                    {Array.from({ length: 10 }).map((_, i) => (
                        <div key={i} className="flex flex-col gap-4">
                            <Skeleton className="w-full aspect-[3/4] rounded-t-xl" />
                            <Skeleton className="h-5 w-3/4 rounded" />
                            <Skeleton className="h-4 w-1/2 rounded" />
                            <Skeleton className="h-3 w-full rounded" />
                            <Skeleton className="h-3 w-full rounded" />
                            <Skeleton className="h-5 w-20 rounded" />
                            <div className="flex items-center justify-between gap-2 mt-2">
                                <Skeleton className="h-8 w-1/2 rounded" />
                                <Skeleton className="h-8 w-8 rounded-full" />
                            </div>
                        </div>
                    ))}

                </div>

            </section>
        );
    }

    return (

    <section>

        {flagError ? (
            <div >
                <div><p>Ничего не найдено</p></div>
                <div><p>Попробуйте изменить условия фильтрации</p></div>
                <Button onClick={() => clearAll()}>
                    Сбросить фильтры
                </Button>
            </div>
        ) : books.length === 0 ? (
            <div>нету ничего дурень</div>
        ) : (
            Object.entries(booksCategories).map(([categoryName, books]) => (
                <BookCategorySection
                    key={categoryName}
                    name={categoryName}
                    books={books}
                />
            ))
        )}
        
    </section>
);

}