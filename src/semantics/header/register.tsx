import React from "react";
import { cn } from "@/lib/utils";
import { FormProvider, useForm } from "react-hook-form";
import { FormInputM } from "./form-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { registerZod, TregisterZod } from "./schemas";
import { Api } from "@/services/api-client";

interface Props {
    flagDialog: boolean;
    setflagDialog: (flagDialog: boolean) => void;
};

export const RegisterM = ({flagDialog, setflagDialog}: Props) => {

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
    try {
      await Api.users.registerUser({
        email: data.email,
        fullName: data.name,
        password: data.password,
      });
      setflagDialog(false);
    } catch (e: any) {
      console.error(e);
      alert(e.message || 'Ошибка регистрации');
    }
  }

    return(
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>

                <FormInputM name="email" label="Электронная почта" required/>
                <FormInputM name="name" label="Ваше имя" required/>
                <FormInputM name="password" label="Пароль" required/>
                <FormInputM name="confirmPassword" label="Повторите пароль" required/>

                <Button type="submit" disabled={form.formState.isSubmitting}>
                    Зарегистрироваться
                </Button>
            </form>
        </FormProvider>
    )
}