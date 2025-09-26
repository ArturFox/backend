import { useAllBookStore } from "@/store/all-technique"
import { useEffect, useMemo, useState } from "react";
import { ManyFillters } from "./many-fillters";
import { Skeleton } from "@/components/ui/skeleton";

export const MainFillter = () => {

    const loading = useAllBookStore((state) => state.loading);

    const [firstLoad, setFirstLoad] = useState(true);

    useEffect(() => {
        if (!loading) {
        setFirstLoad(false);
        }
    }, [loading]);

    const genre = useAllBookStore((state) => state.genres);
    const language = useAllBookStore((state) => state.languages);
    const format = useAllBookStore((state) => state.formats);

    const combined = [
        ...genre.map((g) => ({...g, category: "Жанр"})),
        ...language.map((l) => ({...l, category: "Языки"})),
        ...format.map((f) => ({...f, category: "Формат"})),
        
    ];

    const allFillters = useMemo(() => {

        return combined.reduce((acc, item) => {

            if(!acc[item.category]){
                acc[item.category] = [];
            };

            acc[item.category].push(item);

            return acc;

        }, {} as Record<string, typeof combined>);

    }, [combined]);


    if (loading && firstLoad) {
    return (
      <section className="flex flex-col gap-[0.5rem] w-full">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex flex-col rounded-lg bg-white p-4">
            <Skeleton className="w-full h-6 rounded mb-2" />
            <div className="flex flex-col gap-2 ml-2">
              <Skeleton className="w-full h-6 rounded" />
              <Skeleton className="w-full h-6 rounded" />
              <Skeleton className="w-full h-6 rounded" />
              <Skeleton className="w-full h-6 rounded" />
            </div>
          </div>
        ))}
      </section>
    );
  }

    

    return(
        <div className="flex flex-col gap-[1rem]">
            {Object.entries(allFillters).map(([nameFillter, items]) => (
                <ManyFillters
                    key={nameFillter}
                    name={nameFillter}
                    fillters={items}
                />
            ))}
        </div>
    )
}