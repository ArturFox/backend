import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface Props{
    flagDialog: boolean;
    setflagDialog: (flagDialog: boolean) => void;
};

export const ProfileButtonM = ({flagDialog, setflagDialog}:Props) => {
    //const {data: session} = useSession()
    const session = false;
    return(
        <div>
            {session
                ? (
                    <Link href='/profile'>
                        <Button>
                            Пользователь
                        </Button>
                    </Link>
                )
                : (
                    <Button onClick={() => setflagDialog(!flagDialog)}>
                        Войти
                    </Button>
                )
            }
        </div>
    );
};