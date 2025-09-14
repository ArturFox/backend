
import { Nunito } from "next/font/google";
import "./globals.css";

const getNunito = Nunito({
  variable: "--font-nunito",
  subsets: ["cyrillic", "latin"],
});

export default function RootLayout({ children,}: Readonly<{ children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body className={`${getNunito.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
