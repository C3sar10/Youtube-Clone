"use client";

import { useTheme } from 'next-themes';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { Menu } from 'lucide-react';
import ThemeToggle from './themeToggle';
import SearchBar from './searchBar';
import Link from 'next/link';

const navbar = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const { theme, setTheme, systemTheme } = useTheme();
  const [isLight, setIsLight] = useState(theme === "light");

  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null; // avoid mismatches

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <nav className={`fixed top-0 left-0 w-full ${currentTheme === "light" ? "bg-white text-black" : "bg-neutral-900 text-white"} flex items-center justify-between px-4 py-2 z-100 opacity-85`}>
      <div className='w-fit inline-flex items-center justify-center'>
        <Menu className='hover:cursor-pointer mr-4' onClick={toggleSidebar} size={25}/>
        <Link href={'/'} className='inline-flex items-center'>
          <Image src={"/youtube_logo.png"} alt="Youtube Logo" width={50} height={20} />
          <h1 className="text-md md:text-lg font-bold">YouTube Clone</h1>
        </Link>
      </div>
      <SearchBar />
      <div className='w-fit flex items-center gap-4 mr-2'>
        <ThemeToggle />
        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-white">
            <Image
              src={"/youtube_logo.png"}
              alt="Profile Picture"
              fill
              className="object-cover rounded-full"
              sizes="64px"
            />
          </div>
      </div>
    </nav>
  );
}

export default navbar