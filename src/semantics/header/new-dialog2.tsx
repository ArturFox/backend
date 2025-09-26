import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { Api } from "@/services/api-client";
import { FormInputM } from "./form-input";
import { FormProvider, useForm } from "react-hook-form";
import { confirmZod, TconfirmZod } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useAuthContext } from "./auth-context";

export const NewDialog2 = () => {

    const { newflagDialog, setnewflagDialog, setflagDialog, setCurrentForm, flow, setnewPasswordProps } = useAuthContext();
    const [counter, setCounter] = useState(60);
    const [canResend, setCanResend] = useState(false);
    const [timerKey, setTimerKey] = useState(0);

    const form = useForm<TconfirmZod>({
        resolver: zodResolver(confirmZod),
        defaultValues: {
            password: '',
        },
    });

    const onSubmit = async (data: TconfirmZod) => {
      try {
        const userId = localStorage.getItem("pendingUserId");

        if (!userId) {
          return toast.error("Не удалось определить пользователя");
        }

        const res = await Api.users.verifyCode({
          userId,
          code: data.password,
        });

        if (res.success) {
          toast.success("Почта успешно подтверждена!");
          setnewflagDialog(false);
          
          if(flow === 'register'){
            setCurrentForm('login');
            setflagDialog(true);
            localStorage.removeItem("pendingUserId");
          } else {
            setnewPasswordProps(true);
          }

        } else {
          toast.error(res.message || "Ошибка подтверждения");
        }
      } catch (e: any) {
          toast.error(e.message || "Ошибка подтверждения");
      } 
    };


    const newPasswordEmail = async () => {
      try{

        const userId = localStorage.getItem("pendingUserId");

        if(!userId){
          return toast.error("Не удалось определить пользователя");
        };

        const res = await Api.users.newPasswordEmail({
          userId,
        });

        if(res){
          toast.success(res.message ?? 'Новый пароль выслан 📝. Подтвердите свою почту', {icon: '✅',});
        }
      } catch(e: any){
        toast.error(e.message || 'Ошибка при регистрации', { icon: '❌' });
      } finally {
        setTimerKey(prev => prev + 1);
      }
    }

    

    useEffect(() => {
      
      if (!newflagDialog) return;

        setCounter(60);
        setCanResend(false);


        const interval = setInterval(() => {
          setCounter((prev) => {
            if(prev <= 1){
              
              clearInterval(interval);
              setCanResend(true);
              
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
        return () => clearInterval(interval);
      
    }, [newflagDialog, timerKey]);


    return (
    
      <Dialog open={newflagDialog} onOpenChange={setnewflagDialog}>
        <DialogContent className="bg-white">

          <DialogTitle>Подтвердите почту</DialogTitle>

          <FormProvider {...form}>

            <form onSubmit={form.handleSubmit(onSubmit)}
                  className="flex flex-col gap-4"
            >

              <FormInputM name="password" label="Код подтверждения" required/>
            
              <Button 
                type="submit" 
                disabled={form.formState.isSubmitting}
                className="w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Подтвердить
              </Button>

              <div className="flex justify-between items-center mt-2">

                <span className="text-sm text-gray-500">
                  {canResend ? "Вы можете отправить код снова" : `Повторная отправка через ${counter}s`}
                </span>

                <Button 
                  type="button"
                  onClick={() => newPasswordEmail()}
                  disabled={!canResend} 
                  className="disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Отправить код снова
                </Button>
              </div>


            </form>

          </FormProvider>

        </DialogContent>
      </Dialog>
    );
}
