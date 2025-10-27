"use client";
import React from 'react'

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import ShortsSkeleton from '../components/skeletons/shortsSkeleton';
import { ArrowBigDown, ArrowBigUp } from 'lucide-react';

const page = () => {
  const videos: unknown[] = [];
  const { theme, setTheme, systemTheme } = useTheme();
  const [isLight, setIsLight] = useState(theme === "light");
  const [currentIndex, setCurrentIndex] = useState(0);

  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null; // avoid mismatches

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <main className={`relative h-screen w-full flex justify-center overflow-hidden px-4 ${currentTheme === "light" ? "bg-white text-black" : "bg-neutral-900 text-white"}`}>
      {/* <div className="w-full px-6 py-2 mt-4 flex flex-col place-items-center">
        <ShortsSkeleton />
        <ShortsSkeleton />
        <ShortsSkeleton /> 
      </div> */}

      <div className="relative w-full flex justify-center">      
        <div
          className="pt-5 w-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateY(-${currentIndex * 100}vh)` }}
        >
          {/* If no videos yet - show skeletons */}
          {videos.length === 0 ? (
            <>
              <div className="h-screen flex items-center justify-center">
                <ShortsSkeleton />
              </div>
              <div className="h-screen flex items-center justify-center">
                <ShortsSkeleton />
              </div>
              <div className="h-screen flex items-center justify-center">
                <ShortsSkeleton />
              </div>
            </>
          ) : (
            videos.map((video, index) => (
              <div key={index} className="h-screen flex items-center justify-center">
                {/* <Short {...video} /> */}
              </div>
            ))
          )}
        </div>

        {/* Navigation Buttons (optional for now) */}
        <div className="absolute right-2 md:right-16 lg:right-40 xl:right-60 top-1/2 -translate-y-1/2 gap-4 animate-none flex flex-col">
          <button
            onClick={() => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev))}
            className="bg-gray-600 text-white px-2 py-2 hover:cursor-pointer rounded-full"
          >
            <ArrowBigUp fill='white'/>
          </button>
          <button
            onClick={() =>
              setCurrentIndex((prev) =>
                prev < (videos.length || 3) - 1 ? prev + 1 : prev
              )
            }
            className="bg-gray-600 text-white px-2 py-2 rounded-full hover:cursor-pointer"
          >
            <ArrowBigDown fill='white'/>
          </button>
        </div>
      </div>
    </main>
  )
}

export default page