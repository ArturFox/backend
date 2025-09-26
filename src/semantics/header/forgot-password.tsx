import { FormProvider, useForm } from "react-hook-form"
import { FormInputM } from "./form-input"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { fogotZod, TfogotZod } from "./schemas"
import { Api } from "@/services/api-client"
import toast from "react-hot-toast"
import { useAuthContext } from "./auth-context"

export const ForgotPassword = () => {

    const { setnewflagDialog, setflagDialog, setFlow } = useAuthContext();

    const form = useForm<TfogotZod>({
        resolver: zodResolver(fogotZod),
        defaultValues:{
            email: '',
        },
    });

    const onSubmit = async (data: TfogotZod) => {

        const trimmedData = {
            email: data.email.trim(),
        };

        try{
            const response = await Api.users.fogotPasPost({
                email: trimmedData.email,
            });

            if(response.success){
                toast.success(response.message ?? 'Проверте почту', {icon: '✅',});
                localStorage.setItem("pendingUserId", response.userId);
                setFlow('forgotPassword');
                setflagDialog(false);
                setnewflagDialog(true);
            }
        } catch(e: any){
            toast.error(e?.message || 'Ошибка при отправке кода на почту', { icon: '❌' });
        }
    };

    return(
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} 
                  className="flex flex-col gap-4"
            >
                <FormInputM name="email" label="Введите электронную почту" required/>
                <Button 
                    type="submit" 
                    disabled={form.formState.isSubmitting}
                    className="w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Отправить на почту
                </Button>
            </form>
        </FormProvider>
    );
};