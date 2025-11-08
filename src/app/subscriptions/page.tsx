"use client";

import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react';
import SubscriptionSkeleton from '../components/skeletons/subscriptionSkeleton';

const page = () => {
  const { theme, setTheme } = useTheme();
  const [isLight, setIsLight] = useState(theme === "light");
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Most relevant");

  useEffect(() => {
    setIsLight(theme === "light");
  }, [theme]);

  const handleSelect = (option: string) => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <main className={`min-h-screen h-full w-full flex justify-center py-20 ${isLight === true ? 'bg-white' : 'bg-neutral-900'}`}>
      <section className='w-4/5 flex flex-col p-4 gap-4 z-100'>
        <h1 className='text-4xl font-bold'>All subscriptions</h1>
        <div className="relative inline-block text-left">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`w-fit flex items-center gap-2 px-4 py-2 text-sm rounded-[8px] ease-in-out transition-all duration-500 hover:cursor-pointer ${isLight === true ? 'bg-zinc-300 text-black' : 'bg-zinc-600 text-white'}`}>
            <span>{selected}</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-300 ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>

          {isOpen && (
            <div className={`right-0 mt-2 w-1/4 min-w-[200px] shadow-lg rounded-md overflow-hidden z-20 ${isLight === true ? 'bg-zinc-300 text-black' : 'bg-zinc-600 text-white'}`}>
              {["Most relevant", "New Activity", "A-Z"].map((option) => (
                <button
                  key={option}
                  onClick={() => handleSelect(option)}
                  className={`w-full text-left px-4 py-3 hover:cursor-pointer hover:bg-zinc-400 ease-in-out transition-all duration-300 text-sm`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className='w-full flex flex-col gap-4 mt-2'>
          <SubscriptionSkeleton channelLogo='/youtube_logo.png' channelName='SMii7Y' handle='@SMii7Y' subsCount='8.23M' description='Pronounced "Smitty" -Gameplay, Funny Moments, Hilarity & More! Use code S7 on Gamer Supps for 10% OFF your order! http://gamersupps.gg/s7'/>
          <SubscriptionSkeleton />
          <SubscriptionSkeleton />
        </div>
      </section>
    </main>
  )
}

export default page