import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useAuthContext } from "./auth-context";
import { PencilLine, User } from "lucide-react";

export const ProfileButtonM = () => {
    
    const {data: session} = useSession();

    const {flagDialog, setflagDialog} = useAuthContext();

    return(
        <div>
            {session
                ? (
                    <Link href='/profile'>
                        <Button className= "group relative flex flex-col gap-2 py-8 bg-white text-black border-none outline-none shadow-none hover:bg-white"    
                        >

                            <div className="relative flex items-center justify-center w-full h-full">
                                <User className="transition duration-300 group-hover:opacity-0"/>
                                <PencilLine className="absolute right-3 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0" />
                            </div>

                            {session.user.name}

                        </Button>
                    </Link>
                )
                : (
                    <Button onClick={() => setflagDialog(!flagDialog)}
                        className= "group relative flex flex-col gap-2 py-8 bg-white text-black border-none outline-none shadow-none hover:bg-white"     
                    >
                        <div className="relative flex items-center justify-center w-full h-full">
                            <User className="transition duration-300 group-hover:opacity-0"/>
                            <PencilLine className="absolute right-3 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0" />
                        </div>
                        Войти
                    </Button>
                )
            }
        </div>
    );
};