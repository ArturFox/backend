// app/products/[id]/page.tsx
"use client"
import { use, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { commentSchema, TcommentSchema } from "@/semantics/header/schemas";
import { Api } from "@/services/api-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

interface Props {
  params: Promise<{ id: string }>;
}

export default function ProductPage({ params }: Props) {

  const { id } = use(params);
  const {data: session} = useSession();
  const userSession = session?.user.name;
  const userSessionId = session?.user.id;
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const [comments, setComments] = useState<any[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (e.target.value.length <= 250) {
        setText(e.target.value);
        form.setValue("content", e.target.value);
      }
  };

  

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await Api.products.getById(id);
        setProduct(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  const form = useForm<TcommentSchema>({
    resolver: zodResolver(commentSchema),
    defaultValues:{
      content: '',
    }
  });

  const onSubmit = async (data: TcommentSchema) => {

    try{

      if(!userSessionId){
        throw new Error("Войдите в аккаунт");
      }

      const res = await Api.setPostComment.postComment({
        content: data.content,
        bookId: id,
        userId: userSessionId,
      });

      if(res.success){
        toast.success(res.message ?? 'Комментарий отправлен', {icon: '✅',});
        setComments(prev => [res.data, ...prev]);
        form.reset();
        setText('');
      }

    } catch(e: unknown){
      const errMessage = e instanceof Error ? e.message : "Что-то пошло не так";
      toast.error(errMessage);
    }
  }

  useEffect(() => {

    async function setAllComments() {
      try{
        const res = await Api.allComments.getAllComments();

        if(res.success){
          if(res.data){
            setComments(res.data);
          }
        }
      
      } catch(e: unknown){
        const err = e instanceof Error ? e.message : "Что-то пошло не так";
        toast.error(err);
      }
    }

    setAllComments();

  }, [id]);

  if (loading) return <div>Загрузка...</div>;
  if (!product) return <div>Товар не найден</div>;

  return (
    
    <section className="flex flex-col gap-8 p-8">

      <div className="flex gap-8 p-8  bg-gray-100">

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
      </div>
  
      <div>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col bg-gray-100 gap-2 py-[1rem]">
            <div className="mx-[1rem]"><p>{userSession}</p></div>
            <label className="mx-[1rem]">Оставьте отзыв</label>

            <textarea 
                      value={text} 
                      onChange={handleChange} 
                      className="mx-[1rem] rounded-lg p-2"  
                      placeholder="Что думаете о книге?" 
                      rows= {4} 
                      cols={25}>
                      
            </textarea>
            
            {form.formState.errors.content && (
              <p className="text-red-500 text-sm mx-[1rem]">
                {form.formState.errors.content.message}
              </p>
            )}
            <div className="flex gap-2 justify-end mx-[1rem]">
              <p>Введите небольше</p>
              <p>{text.length}</p>
            </div>
            <Button type="submit" className="mx-[1rem] w-auto self-start">
              Опубликовать
            </Button>
          </form>
        </FormProvider>
      </div>

      <div className="mt-6">

        <h3 className="font-bold text-lg mb-2">Комментарии</h3>

        {comments.length === 0 && <p>Пока нет комментариев</p>}

        {comments.map(c => (
          <div key={c.id} className="border-b py-2">
            <p className="font-semibold">{c.user.fullName}</p>
            <p>{c.content}</p>
            <p className="text-sm text-gray-400">{new Date(c.createdAt).toLocaleString()}</p>
          </div>
        ))}

      </div>

    </section>

  );
}
