import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import { newPassword, TnewPassword } from "./schemas"
import { Button } from "@/components/ui/button"
import { FormInputM } from "./form-input"
import { Api } from "@/services/api-client"
import toast from "react-hot-toast"
import { useAuthContext } from "./auth-context"

export const NewPassword = () => {

    const {newPasswordProps, setnewPasswordProps, setflagDialog, setCurrentForm} = useAuthContext();

    const form = useForm<TnewPassword>({
        resolver: zodResolver(newPassword),
        defaultValues:{
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = async (data: TnewPassword) => {
        try{

            const userId = localStorage.getItem("pendingUserId");

            if (!userId) {
                return toast.error("Не удалось определить пользователя");
            }

            const res = await Api.users.newPassPost({
                userId,
                password: data.password,
            });

            if(res.success){
                toast.success(res.message ?? "Пароль обновлён ✅");
                setnewPasswordProps(false);
                setCurrentForm('login');
                setflagDialog(true);
                localStorage.removeItem("pendingUserId");
            }
            
        } catch(e){

        }
    }

    return(
        <Dialog open={newPasswordProps} onOpenChange={setnewPasswordProps}>
            <DialogContent className="bg-white">

                <DialogTitle>
                    Введите новый пароль
                </DialogTitle>

                <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} 
                          className="flex flex-col gap-4">

                        <FormInputM name="password" label="Код " required/>
                        <FormInputM name="confirmPassword" label="Код подтверждения" required/>

                        <Button 
                            type="submit"
                            disabled={form.formState.isSubmitting}
                            className="w-full disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Добавть новый пароль
                        </Button>

                    </form>
                </FormProvider>

            </DialogContent>
        </Dialog>
    )
}