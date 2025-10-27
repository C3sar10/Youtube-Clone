"use client";

import { useTheme } from 'next-themes';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { Menu } from 'lucide-react';
import ThemeToggle from './themeToggle';

const navbar = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const { theme, setTheme, systemTheme } = useTheme();
  const [isLight, setIsLight] = useState(theme === "light");

  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null; // avoid mismatches

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <nav className={`fixed top-0 left-0 w-full ${currentTheme === "light" ? "bg-white text-black" : "bg-neutral-900 text-white"} flex items-center justify-between px-4 py-2 border-b z-50`}>
      <div className='w-fit inline-flex items-center justify-center'>
        <Menu className='hover:cursor-pointer mr-4' onClick={toggleSidebar}/>
        <Image src={"/youtube_logo.png"} alt="Image Logo" width={50} height={20} />
        <h1 className="text-lg font-bold">YouTube Clone</h1>
      </div>
      <ThemeToggle />
    </nav>
  );
}

export default navbar