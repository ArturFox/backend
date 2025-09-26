import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginZod, TloginZod } from "./schemas";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { FormInputM } from "./form-input";
import { toast } from 'react-hot-toast';
import { useAuthContext } from "./auth-context";

export const LoginM = () => {

    const {flagDialog, setflagDialog} = useAuthContext();

    const form = useForm<TloginZod>({
        resolver: zodResolver(loginZod),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (data: TloginZod) => {

        const trimmedData = {
            email: data.email.trim(),
            password: data.password.trim(),
        };

        try{
            const reso = await signIn('credentials', {
                ...trimmedData,
                redirect: false,
            });

            if(!reso?.ok){
                return toast.error('Неверный E-Mail или пароль', {icon: '❌'});
            }

            if(reso.ok){
                toast.success('Вы успешно вошли', {icon: '✅'});
                setflagDialog(!flagDialog);
            }

        } catch(e){
            toast.error('Не удалось войти', {
                icon: '❌',
            });
        }
    };

    return(
        <FormProvider {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
            >
                <FormInputM name="email" label="E-Mail" required />
                <FormInputM name="password" label="Password" required />

                <Button
                    type="submit"
                    disabled={form.formState.isSubmitting}
                    className="w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {form.formState.isSubmitting ? "Вход..." : "Войти"}
                </Button>
            </form>

        </FormProvider>
    )
}