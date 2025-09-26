"use client";

import { Button } from "@/components/ui/button";
import { FormInputM } from "@/semantics/header/form-input";
import { registerZod, TregisterZod } from "@/semantics/header/schemas";
import { Api } from "@/services/api-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function EditProfilePage(){

    const router = useRouter();

    const form = useForm<TregisterZod>({
        resolver: zodResolver(registerZod),
        defaultValues:{
            email:'',
            name: '',
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = async (data: TregisterZod) => {
        
        const trimmedData = {
            email: data.email.trim(),
            name: data.name.trim(),
            password: data.password.trim(),
            confirmPassword: data.confirmPassword.trim(),
        };

        try{
            const response = await Api.users.newConfirmNewData({
                email: trimmedData.email,
                fullName: trimmedData.name,
                password: trimmedData.password,
            });

            if(response.success){
                toast.success(response.message ?? 'Данные успешно обновлены', {icon: '✅',});
                router.push("/");
            }
        } catch(e: any){
            toast.error(e?.message || 'Ошибка при обновление данных', { icon: '❌' });
        }
    }

    return (
    <section className="flex justify-center items-start pt-16 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 flex flex-col gap-6">
        <header className="text-center">
          <h1 className="text-2xl font-semibold text-gray-800">Изменение профиля</h1>
          <p className="text-gray-500 mt-1 text-sm">Обновите свои личные данные</p>
        </header>

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <fieldset className="flex flex-col gap-4 border border-gray-200 rounded-lg p-4">
              <FormInputM name="email" required label="Электронная почта" />
              <FormInputM name="name" required label="Ваше имя" />
              <FormInputM name="password" required label="Пароль" />
              <FormInputM name="confirmPassword" required label="Повторите пароль" />
            </fieldset>

            <footer className="mt-4">
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="w-full bg-red-600 hover:bg-blue-700 text-white font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {form.formState.isSubmitting ? "Подтверждение..." : "Подтвердите изменения"}
              </Button>
            </footer>
          </form>
        </FormProvider>
      </div>
    </section>
  );
}