// src/app/profile/page.tsx
"use client";

import React from "react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function ProfilePage() {

  const {data: session} = useSession();

  const userName = session?.user.name ?? "";

  const firstTwoLetters = userName.slice(0, 2).toUpperCase();


  return (
    <div className="flex flex-col gap-4 p-6">
      <h1 className="text-2xl font-semibold">
        Здравствуйте, {session?.user.name}!
      </h1>
      <p className="text-lg text-muted-foreground">
        Добро пожаловать в ваш личный кабинет.
      </p>

      <div className="flex flex-col gap-4 border rounded-lg p-4">

        <div className="flex justify-evenly items-center">

          <div>
            <div className="inline-flex items-center justify-center w-10 h-10 border border-black rounded-full">
              {firstTwoLetters}
            </div>
          </div>

          <div>
            <h4 className="text-lg">Личные данные</h4>
          </div>

          <Link href='profile/edit-profile'>
            <Button className="bg-white border text-black shadow-none hover:shadow-none hover:bg-gray-300">
              Изменить
            </Button>
          </Link>

        </div>

        <div className="border-b">

        </div>

        <div className="flex flex-col gap-4">
          <p>{session?.user.name}</p>
          <p>{session?.user.email}</p>
        </div>

      </div>
      <Button
        variant="destructive"
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        Выйти
      </Button>
    </div>
  );
}
