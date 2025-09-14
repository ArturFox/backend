'use client'

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ProfileButtonM } from "./profile-button";
import { AuthModalM } from "./auth-modal";

export const HeaderM = () => {

    const [flagDialog, setflagDialog] = useState(false);

    return(
        <div>
            <div>
                <ProfileButtonM flagDialog={flagDialog} setflagDialog={setflagDialog}/>
                <AuthModalM flagDialog={flagDialog} setflagDialog={setflagDialog}/>
            </div>
        </div>
    )
}