import { useEffect, useMemo, useState } from "react";
import { OneFillter } from "./one-fillter";
import { useRouter, useSearchParams } from "next/navigation";
import debounce from "lodash.debounce";
import qs from 'qs';

type FilltersType = {
    id: string;
    name: string;
    category: string;
}

interface Props {
    name: string;
    fillters: FilltersType[];
}

export const ManyFillters = ({name, fillters}: Props) => {

    const searchParams = useSearchParams();
    const router = useRouter();

    const [localStore, setLocalStore] = useState<Set<string>>(new Set());

    useEffect(() => {

        const params = Object.fromEntries(searchParams.entries());

        if (Object.keys(params).length === 0) {

            setLocalStore(new Set()); 

        }

    }, [searchParams]);



    const toggle = (id: string) => {

        setLocalStore((prev) => {

            const newSet = new Set(prev);
            ;

            if(newSet.has(id)){
                newSet.delete(id);
            }else{
                newSet.add(id);
            }

            return newSet;

        });
    };

    const updateQueryParams = useMemo(

        () =>

          debounce((params) => {

            router.push(

                `?${qs.stringify(params, { arrayFormat: 'comma' })}`, 
                { scroll: false }

            );

          }, 300),

        [router]

    );

    
    useEffect(() => {
    
        const currentParams: Record<string, string | string[]> = {};

        searchParams.forEach((value, key) => {
            currentParams[key] = value;
        });

        
        if (localStore.size > 0) {

            currentParams[name.toLowerCase()] = Array.from(localStore);

        } else {

            delete currentParams[name.toLowerCase()];
            
        }

        updateQueryParams(currentParams);

    }, [localStore, name, searchParams, updateQueryParams]);







    

    return(
        <div>
            <h3 className="font-bold mb-2">{name}</h3>

            <div className="ml-2">
                {fillters.map((item, i) => (
                    <OneFillter
                        key={i}
                        id={item.id}
                        name={item.name}
                        category={item.category}
                        checked={localStore.has(item.id)}
                        onCheckedChange={() => toggle(item.id)}
                    />
                ))}
            </div>

        </div>
    )
}