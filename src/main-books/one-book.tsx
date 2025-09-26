import { Button } from "@/components/ui/button";
import { Heart, PencilIcon, ShoppingCart } from "lucide-react";
import Link from "next/link";

interface Props {
  id: string;
  title: string;
  author: string;
  description: string;
  imageUrl: string;
  price: number;
  tagl: string;
  discont: number;
};

export const MainCardM = ({ id, tagl, discont, title, author, description, price, imageUrl }: Props) => {

    let newPrice;

    if(discont > 0){
        newPrice = price - (price * discont / 100);
    };

  return (
    
    <article className="relative flex flex-col">

      <div className="rounded-xl transition-transform duration-300 hover:shadow-lg active:scale-95 active:shadow-sm cursor-pointer">
        <Link href={`/products/${id}`}> 

          <div className="w-full aspect-[3/4] relative">

            <span className="absolute -translate-y-6 top-0 left-0 bg-red-500 text-white text-xs font-bold px-2 py-1 pb-3 z-1 rounded-t">
              {tagl}
            </span>

            <img src={imageUrl} alt={title} className="rounded-t-xl w-full h-full object-coverrounded relative z-9"/>
            
          </div>

          <div className="flex flex-col gap-[0.5rem] relative">

            {(discont && discont > 0) ? (

              <div className="flex absolute top-0 -left-5 -translate-y-10 z-10">

                <div className="w-0 h-0 border-t-[12px] border-b-[12px] border-r-[12px] border-t-transparent border-b-transparent border-r-red-500" />
                
                <div className="bg-red-500 text-white text-xs font-bold px-1 py-1">
                  {discont}%
                </div>

              </div>
            ) : null}


            <h3 className="line-clamp-1 font-semibold">{title}</h3>
            <div className="line-clamp-1 font-semibold">{author}</div>
            <div className="line-clamp-1 font-semibold">{description}</div>

            <div className="flex gap-2 group">
                {(newPrice && newPrice > 0) ? <div>{newPrice}</div> : <div>{price}</div>}
                {(newPrice && newPrice > 0) && <div className="absolute translate-x-8 -translate-y-2 text-[0.9rem] text-gray-500 line-through">{price}</div>}
            </div>
            

          </div>

        </Link>
      </div>

      <div className="flex items-center justify-between">

        <Button className="group text-black bg-blue-500 hover:bg-blue-500">
          Купить
          <div className="relative flex items-center justify-center">
            <ShoppingCart className="absolute opacity-100 group-hover:opacity-0 transition duration-300"/>
            <PencilIcon className="absolute opacity-0 group-hover:opacity-100 transition duration-300 -translate-x-2 group-hover:translate-x-0 "/>
          </div>
        </Button>

        <Button className="group bg-blue-500 hover:bg-blue-500">
          <Heart className="stroke-gray-500 group-hover:stroke-red-500 transition-colors duration-300" />
        </Button>

      </div>

    </article>
  );
};
