"use client";

import "./globals.css";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import { HeaderM } from "@/semantics/header/header";
import { Nunito } from 'next/font/google';

const nunito = Nunito({
  subsets: ['cyrillic'],
  variable: '--font-nunito',
  weight: ['400', '500', '600', '700', '800', '900'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={nunito.variable} lang="en">

      <body className="antialiased">

        <SessionProvider>

          <HeaderM />

          <main>
            {children}
          </main> 

          <Toaster
            position="top-center"
            toastOptions={{
              duration: 4000,
              style: { textAlign: "center" },
            }}
          />

          <footer>
            <div>Тут быдет подвал</div>
          </footer>

        </SessionProvider>

      </body>

    </html>
  );
}
