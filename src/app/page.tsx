"use client"

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { useFlagTopBarStore } from "@/store/flag-top-bar";
import { WordList } from "@/semantics/rr";


  const words = [
    "яблоко",
    "банан",
    "апельсин",
    "киви",
    "виноград",
    "манго",
    "персик",
    "груша",
    "арбуз",
    "слива",
  ];


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

        

      </motion.nav>)
      }

      <section className="flex gap-[1.5rem]">

        <aside className="sticky top-[1rem] self-start p-[1rem] border-[0.5rem] border-white rounded-lg bg-white flex-1">
          
        </aside>

        <section className="px-[1rem] pb-[1rem] border-[0.5rem] border-white rounded-lg bg-white flex-[5]">
          
        </section>

      </section>


      <div>
        <WordList words={words}/>
      </div>

    </main>
  );
}
