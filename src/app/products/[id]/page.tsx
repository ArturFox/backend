// app/products/[id]/page.tsx
import { Button } from "@/components/ui/button";
import { Api } from "@/services/api-client";

interface Props {
  params: { id: string };
}

export default async function ProductPage({ params }: Props) {
  const { id } = params;

  
  const product = await Api.products.getById(id);

  if (!product) return <div>Товар не найден</div>;

  return (
    
    <section className="flex gap-8 p-8 bg-gray-100">

  
      <div className="aspect-[3/4]">
        <img 
          src={product.imageUrl} 
          className="rounded-xl w-full h-full shadow-md"
          alt={product.title}
        />
      </div>

  
      <div className="flex flex-col gap-4 justify-between">

  
        <div>
          <p className="inline-block bg-orange-500 text-white text-sm font-semibold rounded-full px-4 py-2">
            {product.tag}
          </p>

        </div>

    
        <div className="font-extrabold text-3xl text-gray-900 leading-snug">
          <p>{product.title}</p>
        </div>

        
        <div>
          <p className="text-base text-gray-700">
            <span className="text-gray-400">Автор: </span>
            <span className="text-blue-700 font-medium">{product.author}</span>
          </p>
        </div>

        
        <div>
          <p className="inline-block rounded-xl bg-white border border-gray-300 px-5 py-3 text-gray-700 font-medium shadow-sm text-base">
            {product.format.name}
          </p>
        </div>

      
        <div>
          <p className="text-gray-800 text-lg leading-relaxed">{product.description}</p>
        </div>

        
        <div>
          <p className="text-2xl font-bold text-green-600">{product.price}</p>
        </div>

        <div className="flex gap-4 ">
          <Button className="flex-1 h-12">
          Купить
        </Button>

        <Button className="flex-1 h-12">
          Добавить в корзину
        </Button>
        </div>

      </div>

    </section>

  );
}
