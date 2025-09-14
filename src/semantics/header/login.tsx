import React from "react";
import { cn } from "@/lib/utils";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginZod, TloginZod } from "./schemas";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { FormInputM } from "./form-input";

interface Props {
    flagDialog: boolean;
    setflagDialog: (flagDialog: boolean) => void;
};

export const LoginM = ({flagDialog, setflagDialog}: Props) => {

    const form = useForm<TloginZod>({
        resolver: zodResolver(loginZod),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (data: TloginZod) => {
        try{
            const reso = await signIn('credentials', {
                ...data,
                redirect: false,
            });

            setflagDialog(!flagDialog);
        } catch(e){
            console.error(e);
        }
    };

    return(
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                
                <FormInputM name='email' label='E-Mail' required/>
                <FormInputM name='password' label='Password' required/>

                <Button type="submit" disabled={form.formState.isSubmitting} className="disabled:opacity-50 disabled:cursor-not-allowed">
                    {form.formState.isSubmitting ? 'Вход...' : 'Войти'}
                </Button>
            </form>
        </FormProvider>
    )
}