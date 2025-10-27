"use client";

import React from 'react'
import { House, Film, CircleUserRound } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const tabs = [
  { name: "Home", path: "/" },
  { name: "Shorts", path: "/shorts" },
  { name: "Subscriptions", path: "/subscriptions" },
  { name: "You", path: "/you" },
];

const sidebar = ({ isOpen }: {isOpen: boolean}) => {
    const pathname = usePathname();
    const { theme, setTheme, systemTheme } = useTheme();
    const [isLight, setIsLight] = useState(theme === "light");
  
    const [mounted, setMounted] = useState(false);
  
    useEffect(() => setMounted(true), []);
  
    if (!mounted) return null; // avoid mismatches
  
    const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <aside
      className={`fixed top-16 left-0 h-[calc(100vh-64px)] overflow-hidden
        ${isOpen ? "w-[120px] pr-2 md:pr-2" : "w-0"}
        ${currentTheme === "light" ? "bg-white text-black" : "bg-neutral-900 text-white"}
      flex justify-center`}
    >
      {/* {isOpen && (
        <div className={`w-full h-full py-2 pr-2 pl-2 ${isLight === true ? 'bg-white' : 'bg-black'}`}>
          <ul className="w-full mt-4 space-y-8 items-center z-50 h-full">
            {tabs.map((tab) => (
              <li key={tab.name} className={`w-full flex flex-col items-center hover:bg-gray-300 rounded-[8px] transition-all duration-300 px-1 py-2`}>
                <Link href={tab.path} className={`w-full flex flex-col items-center ${pathname === tab.path ? "text-red-500" : "text-inherit"}`}>
                  {tab.name === "Home" && <House className='inline mb-1'/>}
                  {tab.name === "Shorts" && <Film className='inline mb-1'/>}
                  {tab.name === "Subscriptions" && <Film className='inline mb-1'/>}
                  {tab.name === "You" && <CircleUserRound className='inline mb-1'/>}
                  <div className='text-[8px] md:text-[12px]'>{tab.name}</div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )} */}
      <div
        className={`h-full py-2 px-2 transition-opacity duration-200
          ${isOpen ? "opacity-100 delay-100" : "opacity-0 delay-0"}
        `}
      >
        <ul className="mt-4 space-y-8 items-center h-full">
          {tabs.map((tab) => (
            <li
              key={tab.name}
              className="w-full flex flex-col items-center hover:bg-gray-300 rounded-[8px] transition-all duration-300 px-1 py-2"
            >
              <Link
                href={tab.path}
                className={`w-full flex flex-col items-center ${
                  pathname === tab.path ? "text-red-500" : "text-inherit"
                }`}
              >
                {tab.name === "Home" && <House className="inline mb-1" />}
                {tab.name === "Shorts" && <Film className="inline mb-1" />}
                {tab.name === "Subscriptions" && <Film className="inline mb-1" />}
                {tab.name === "You" && <CircleUserRound className="inline mb-1" />}
                <div className="text-[8px] md:text-[12px]">{tab.name}</div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}

export default sidebar