"use client"

import { MainBooks } from "@/main-books/main-books";
import { MainTopBar } from "@/main-books/top-bar";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MainFillter } from "@/main-books/main-fillter";
import { useFlagTopBarStore } from "@/store/flag-top-bar";

export default function Home() {
  
  const flag = useFlagTopBarStore((state) => state.flag);

  const [showNav, setShowNav] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);

  useEffect(() => {

    const handleScroll = () => {

      const current = window.scrollY;
      if (current > lastScroll && current > 50) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }
      setLastScroll(current);

    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    
  }, [lastScroll]);

  return (
    <main className="flex flex-col bg-gray-100 gap-[1.5rem] p-[2rem] relative">

      {flag   ? (<div className="text-center p-6 opacity-0">0</div>) 
              : (<motion.nav
        className="text-center sticky top-[1rem] z-10"
        animate={showNav ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >

        <MainTopBar />

      </motion.nav>)
      }

      <section className="flex gap-[1.5rem]">

        <aside className="sticky top-[1rem] self-start p-[1rem] border-[0.5rem] border-white rounded-lg bg-white flex-1">
          <MainFillter/>
        </aside>

        <section className="px-[1rem] pb-[1rem] border-[0.5rem] border-white rounded-lg bg-white flex-[5]">
          <MainBooks/>
        </section>

      </section>

    </main>
  );
}
