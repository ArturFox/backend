import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LoginM } from "./login";
import { RegisterM } from "./register";
import { ForgotPassword } from "./forgot-password";
import { useAuthContext } from "./auth-context";

export const AuthModalM = () => {

    const { flagDialog, setflagDialog, currentForm, setCurrentForm } = useAuthContext();

    return(
        <Dialog open={flagDialog} onOpenChange={(open) => {
                    setflagDialog(open); 
                    if(!open){
                        setCurrentForm("login");
                    };
                }}
        >
            <DialogContent className="bg-white flex flex-col gap-4 rounded-2xl p-6 shadow-lg sm:max-w-md">
                
                <DialogTitle className="text-center text-xl font-bold">
                    {
                        {
                            login: "Логин",
                            register: "Создание аккаунта",
                            forgotPassword: "Востановление пароля",
                        }[currentForm]
                    }
                </DialogTitle>
                    
                    
                {
                    {
                        login: <LoginM/>,
                        register: <RegisterM/>,
                        forgotPassword: <ForgotPassword/>,
                    }[currentForm]
                }
                
                { currentForm === "login" && (
                    <div className="flex flex-col gap-4">
                        <div>
                            <Button 
                                className="w-full"
                                onClick={() => setCurrentForm('forgotPassword')}
                            >
                                Забыли пароль
                            </Button>
                        </div>
                        <div>
                            <Button 
                                className="w-full"
                                onClick={() => setCurrentForm('register')}
                            >
                                Создать аккаунт
                            </Button>
                        </div>
                    </div>
                )}

                { currentForm === 'forgotPassword' && (
                    <div>
                        <Button 
                            className="w-full"
                            onClick={() => setCurrentForm('login')}
                        >
                            Вернуться назад
                        </Button>
                    </div>
                )}

                { currentForm === "register" && (
                    
                    <div>
                        <Button 
                            className="w-full"
                            onClick={() => setCurrentForm('login')}
                        >
                            Вернуться назад
                        </Button>
                    </div>
                    
                )}

            </DialogContent>
        </Dialog>
    )
}