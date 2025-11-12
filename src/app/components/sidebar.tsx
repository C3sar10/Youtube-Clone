"use client";

import React from 'react'
import { House, Film, CircleUserRound, X, Video } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const tabs = [
  { name: "Home", path: "/" },
  { name: "Shorts", path: "/shorts" },
  { name: "Subscriptions", path: "/subscriptions" },
  { name: "You", path: "/you" },
];

const Sidebar = ({ isOpen, onClose }: {isOpen: boolean, onClose: () => void;}) => {
    const pathname = usePathname();
    const { theme, setTheme, systemTheme } = useTheme();
    const [isLight, setIsLight] = useState(theme === "light");
  
    const [mounted, setMounted] = useState(false);
  
    useEffect(() => setMounted(true), []);

    useEffect(() => {
      if (!mounted) return;
      const current = theme === "system" ? systemTheme : theme;
      setIsLight(current === "light");
    }, [mounted, theme, systemTheme]);

  return (
    <aside
      className={`fixed top-0 left-0 h-full w-64 z-103 transform transition-transform duration-300 py-2 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } ${isLight === true ? 'bg-white text-black' : 'bg-zinc-900 text-white'}`}
    >
      <div
        className={`h-full py-2 px-2 transition-opacity duration-200
          ${isOpen ? "opacity-100 delay-100" : "opacity-0 delay-0"}
        `}
      >
        <div className='w-fit inline-flex items-center justify-center'>
        <button
          onClick={onClose}
          className={`hover:cursor-pointer mx-2 transition-colors duration-300 ease-in-out ${isLight === true ? "text-zinc-900 hover:text-zinc-400" : "text-white hover:text-zinc-400"}`}
        >
          <X size={25} />
        </button>
        <Image src={"/youtube_logo.png"} alt="Image Logo" width={50} height={20} />
        <h1 className="text-lg font-bold">YouTube Clone</h1>
      </div>
        <ul className="mt-4 space-y-8 items-center h-full">
          {tabs.map((tab) => (
            <li
              key={tab.name}
              className="w-full flex flex-col items-center hover:bg-gray-300 rounded-[8px] transition-all duration-300 px-2 py-2"
            >
              <Link
                href={tab.path}
                className={`w-full flex flex-row gap-2 items-center justify-start ${
                  pathname === tab.path ? "text-red-500" : "text-inherit"
                }`}
              >
                {tab.name === "Home" && <House className="inline mb-1" />}
                {tab.name === "Shorts" && <Video className="inline mb-1" />}
                {tab.name === "Subscriptions" && <Film className="inline mb-1" />}
                {tab.name === "You" && <CircleUserRound className="inline mb-1" />}
                <div className="text-[12px] md:text-[16px] mb-[1px]">{tab.name}</div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}

export default Sidebar