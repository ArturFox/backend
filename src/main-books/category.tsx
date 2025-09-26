

import { BookCategoryNames, BookWithRelations } from "@/store/all-technique";
import { MainCardM } from "./one-book";
import { ReactNode, useEffect, useState } from "react";
import { useInView } from 'react-intersection-observer';
import { useCategoriesStore } from "@/store/categories";
import { useSearchParams } from "next/navigation";
import { useFlagTopBarStore } from "@/store/flag-top-bar";

interface Props {
  name: string;
  books: BookWithRelations[];
  ref?: ReactNode;
  inView?: boolean;
}

export const BookCategorySection = ({ name, books }: Props) => {

  const searchParams = useSearchParams();

  const flag = useFlagTopBarStore((state) => state.flag);
  const setFlag = useFlagTopBarStore((state) => state.setFlag);

  useEffect(() => {

    const params = Object.fromEntries(searchParams.entries());

    if(Object.keys(params).length === 0){
      setFlag(false);
    } else{
      setFlag(true)
    }

  }, [searchParams])

  const setCategoryInView = useCategoriesStore((state) => state.setCategoryInView);

  const { ref, inView } = useInView({
    threshold: 0.1,
    
  });

  useEffect(() => {
    setCategoryInView(name, inView);
  }, [inView, name, setCategoryInView]);

  return (

    <div>

      {flag 
        ? ( 
            <section>
              <h2 className="text-center text-[1.5rem] font-bold m-[3rem]">
                <p>Поиск по фильтрам</p>
              </h2>

              <article className="grid grid-cols-5 gap-x-6 gap-y-20
                                  max-[1024px]:grid-cols-2
                                  max-[640px]:grid-cols-1">
                  
                    
                {books.map((book) => (
                  <MainCardM
                    key={book.id}
                    id={book.id}
                    title={book.title}
                    author={book.author}
                    description={book.description}
                    imageUrl={book.imageUrl}
                    price={book.price}
                    tagl={book.tag}
                    discont={book.discount?.percent ?? 0}
                  />
                ))}
                      
              </article>
            </section>
          ) 
            
        : (
            <section id={name} ref={ref} className="flex flex-col">

              <h2 className="text-center text-[1.5rem] font-bold m-[3rem]">
                {BookCategoryNames[name]}
              </h2>

              <article className="grid grid-cols-5 gap-x-6 gap-y-20
                                  max-[1024px]:grid-cols-2
                                  max-[640px]:grid-cols-1">
                  
                    
                {books.map((book) => (
                  <MainCardM
                    key={book.id}
                    id={book.id}
                    title={book.title}
                    author={book.author}
                    description={book.description}
                    imageUrl={book.imageUrl}
                    price={book.price}
                    tagl={book.tag}
                    discont={book.discount?.percent ?? 0}
                  />
                ))}
                      
              </article>

            </section>
          )
      }

    </div>

  );
};
