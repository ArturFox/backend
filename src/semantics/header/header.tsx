'use client'

import React from "react";
import { ProfileButtonM } from "./profile-button";
import { AuthModalM } from "./auth-modal";
import { NewDialog2 } from "./new-dialog2";
import { NewPassword } from "./new-password";
import { AuthProvider } from "./auth-context";
import { useRouter } from "next/navigation";


export const HeaderM = () => {

    const router = useRouter();

    const goHome = () => {
        router.push("/");
    };

    return(

        <header className="flex items-center justify-between gap-8 px-4">

            

            <div className="bg-gray-100 p-2 cursor-pointer hover:shadow-md " onClick={ goHome}>
                    
                Home
            
            </div>

            <div>
                Инпут
            </div>

            

            <AuthProvider>
                <div>
                    
                    <ProfileButtonM/>
                    <AuthModalM/>
                    <NewDialog2/>
                    <NewPassword/>
                    
                </div>
            </AuthProvider>

        </header>
        
    )
}