import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { BookCategoryNames, useAllBookStore } from "@/store/all-technique";
import { useCategoriesStore } from "@/store/categories";
import { BookCategory } from "@prisma/client";

export const MainTopBar = () => {

    const categories = Object.values(BookCategory);

    const visibleCategories = useCategoriesStore((state) => state.visibleCategories);

    const loading = useAllBookStore((state) => state.loading);

    if (loading) {
        return (
            <section className="inline-flex gap-[1rem] bg-white p-[1rem] rounded-lg relative mx-auto">
            {Array.from({ length: categories.length }).map((_, i) => (
                <Skeleton
                key={i}
                className="rounded-xl py-2 px-2 w-24 h-10"
                />
            ))}
            </section>
        );
    }



    return (
        <section className="flex gap-[1rem] inline-flex bg-white p-[1rem] rounded-lg relative">

        {categories.map((category) => (

            <div className={cn('px-4 py-2 rounded-xl p-[0.5rem] cursor-pointer transition-colors duration-300', 
                 visibleCategories[category] ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800')} 

                key={category} onClick={() => {
                    const el = document.getElementById(category);
                    if (el) {
                        const offset = 50;
                        const top = el.getBoundingClientRect().top + window.scrollY - offset;

                        window.scrollTo({ top, behavior: 'smooth' });
                    }
                }
            }>

            {BookCategoryNames[category]}

            </div>
        ))}

        </section>
    );
};
