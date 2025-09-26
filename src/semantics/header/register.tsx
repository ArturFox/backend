import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FormInputM } from "./form-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { registerZod, TregisterZod } from "./schemas";
import { Api } from "@/services/api-client";
import toast from "react-hot-toast";
import { useAuthContext } from "./auth-context";

export const RegisterM = () => {

    const { setflagDialog, setnewflagDialog, setFlow} = useAuthContext();

    const form = useForm<TregisterZod>({

        resolver: zodResolver(registerZod),

        defaultValues: {
            email: '',
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

        try {
            const response = await Api.users.registerUser({
                email: trimmedData.email,
                fullName: trimmedData.name,
                password: trimmedData.password,
            });

            if (response.success) {
                toast.success(response.message ?? 'Подтвердите свою почту', {icon: '✅',});
                localStorage.setItem("pendingUserId", response.userId);
                setFlow('register');
                setflagDialog(false);
                setnewflagDialog(true);
            }
        } catch (e: any) {
            toast.error(e?.message || 'Ошибка при регистрации', { icon: '❌' });
        }

    };


    return(
        <FormProvider {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
            >


                <FormInputM name="email" label="Электронная почта" required />
                <FormInputM name="name" label="Ваше имя" required />
                <FormInputM name="password" label="Пароль" required />
                <FormInputM name="confirmPassword" label="Повторите пароль" required />

                <Button
                    type="submit"
                    disabled={form.formState.isSubmitting}
                    className="w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {form.formState.isSubmitting ? "Регистрация..." : "Зарегистрироваться"}
                </Button>


            </form>
        </FormProvider>
    )
}