import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LoginM } from "./login";
import { RegisterM } from "./register";

interface Props {
    flagDialog: boolean;
    setflagDialog: (flagDialog: boolean) => void;
};

export const AuthModalM = ({flagDialog, setflagDialog}: Props) => {

    const [loginORregister, setloginORregister] = useState<'login' | 'register'>('login');

    return(
        <Dialog open={flagDialog} onOpenChange={setflagDialog}>
            <DialogContent>
                
                {loginORregister === 'login'

                    ? (<DialogTitle>
                            <LoginM flagDialog={flagDialog} setflagDialog={setflagDialog}/>
                        </DialogTitle>
                    )

                    : (<DialogTitle>
                            <RegisterM flagDialog={flagDialog} setflagDialog={setflagDialog}/>
                        </DialogTitle>
                    )
                    
                }

                <div><p>or</p></div>

                <div>
                    <Button onClick={() => signIn('google', {callbackUrl: '/', redirect: true})} type="button">
                        Google
                    </Button>
                </div>

                <div>
                    <Button onClick={() => setloginORregister('register')}>
                        Создать аккаунт 
                    </Button>
                </div>

            </DialogContent>
        </Dialog>
    )
}