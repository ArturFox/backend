// app/products/[id]/page.tsx
import { Api } from "@/services/api-client";

interface Props {
  params: { id: string };
}

export default async function ProductPage({ params }: Props) {
  const { id } = params;

  
  const product = await Api.products.getById(id);

  if (!product) return <div>Товар не найден</div>;

  return (
    <section className="flex gap-8 p-8">

      <div className="aspect-[3/4]">
        <img src={product.imageUrl} className="rounded-xl w-full h-full"/>
      </div>

      <div className="flex flex-col gap-2">
        <div className="p-[0.1rem] bg-gray-500">
          <p>{product.tag}</p>
        </div>
        <div className="font-bold text-[1.5rem]">
          <p>{product.title}</p>
        </div>
        <div>
            <p> 
              <span className="text-gray-400">Автор: </span>
              <span className="text-blue-700">{product.author}</span>
            </p>
        </div>
        <div>
          <p>{product.format.name}</p>
        </div>
        <div>
          <p>{product.description}</p>
        </div>
        <div>
          <p>{product.price}</p>
        </div>
      </div>

    </section>
  );
}
