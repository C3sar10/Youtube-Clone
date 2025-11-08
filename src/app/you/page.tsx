"use client";

import { useTheme } from 'next-themes';
import Image from 'next/image';
import React from 'react'
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ThumbnailSkeleton from '../components/skeletons/thumbnailSkeleton';
import useEmblaCarousel from 'embla-carousel-react';

const page = () => {
  const { theme, setTheme } = useTheme();
  const [isLight, setIsLight] = useState(theme === "light");
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [watchLaterRef, watchLaterApi] = useEmblaCarousel({ loop: false });
  const [likedVideosRef, likedVideosApi] = useEmblaCarousel({ loop: false });

  useEffect(() => {
    setIsLight(theme === "light");
  }, [theme]);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  const scrollWatchLaterPrev = () => watchLaterApi?.scrollPrev();
  const scrollWatchLaterNext = () => watchLaterApi?.scrollNext();
  
  const scrollLikedVideosPrev = () => likedVideosApi?.scrollPrev();
  const scrollLikedVideosNext = () => likedVideosApi?.scrollNext();

  return (
    <main
      className={`relative min-h-screen h-full w-full flex justify-center py-20 px-5 overflow-x-hidden ${
        isLight ? "bg-white" : "bg-neutral-900"
      }`}
    >
      <div className="w-full max-w-6xl flex flex-col justify-start gap-4 p-4">
        {/* Header Section */}
        <div className="w-full flex flex-row gap-4">
          <div className="relative w-20 h-20 rounded-full overflow-hidden bg-white">
            <Image
              src={"/youtube_logo.png"}
              alt="Profile Picture"
              fill
              className="object-cover rounded-full"
              sizes="64px"
            />
          </div>
          <div className="w-full flex flex-col gap-1">
            <h1 className="text-2xl font-bold">Cesar Perez</h1>
            <span className="inline-flex gap-1 text-xs">
              <span>@cesarperez123</span>-<span>View Channel</span>
            </span>
          </div>
        </div>

        <div className="w-1/2 inline-flex gap-2 justify-center text-sm">
          <button
            className={`${
              isLight
                ? "bg-zinc-300 hover:bg-zinc-400"
                : "bg-zinc-700 hover:bg-zinc-500"
            } w-full px-2 py-2 rounded-full transition-all duration-300 whitespace-nowrap`}
          >
            Switch Account
          </button>
          <button
            className={`${
              isLight
                ? "bg-zinc-300 hover:bg-zinc-400"
                : "bg-zinc-700 hover:bg-zinc-500"
            } w-full px-2 py-2 rounded-full transition-all duration-300 whitespace-nowrap`}
          >
            Google Account
          </button>
        </div>

        {/* History Header */}
        <div className="w-full flex justify-between items-center py-2">
          <h2 className="text-xl font-semibold">History</h2>
          <div className="flex flex-row gap-2 w-fit">
            <h2
              className={`text-sm border ${
                isLight
                  ? "border-zinc-300 hover:bg-zinc-300"
                  : "border-zinc-600 hover:bg-zinc-600"
              } rounded-full px-2 py-1 whitespace-nowrap hover:cursor-pointer`}
            >
              View all
            </h2>
            <div className="flex w-full gap-2 justify-center items-center">
              <ChevronLeft
                onClick={scrollPrev}
                className="rounded-full border border-white hover:cursor-pointer hover:bg-zinc-700 transition"
              />
              <ChevronRight
                onClick={scrollNext}
                className="rounded-full border border-white hover:cursor-pointer hover:bg-zinc-700 transition"
              />
            </div>
          </div>
        </div>

        {/* Carousel */}
        <div className="w-full max-w-full overflow-hidden" ref={emblaRef}>
          <div className="flex touch-pan-y select-none">
            {[1, 2, 3, 4, 5, 6].map((_, i) => (
              <div key={i} className="flex-[0_0_100%] 
                sm:flex-[0_0_50%] 
                md:flex-[0_0_33.333%] 
                p-2
                box-border">
                <ThumbnailSkeleton />
              </div>
            ))}
          </div>
        </div>
       
        {/* Watch Later Header */}
        <div className="w-full flex justify-between items-center py-2">
          <h2 className="text-xl font-semibold">Watch Later</h2>
          <div className="flex flex-row gap-2 w-fit">
            <h2
              className={`text-sm border ${
                isLight
                  ? "border-zinc-300 hover:bg-zinc-300"
                  : "border-zinc-600 hover:bg-zinc-600"
              } rounded-full px-2 py-1 whitespace-nowrap hover:cursor-pointer`}
            >
              View all
            </h2>
            <div className="flex w-full gap-2 justify-center items-center">
              <ChevronLeft
                onClick={scrollWatchLaterPrev}
                className="rounded-full border border-white hover:cursor-pointer hover:bg-zinc-700 transition"
              />
              <ChevronRight
                onClick={scrollWatchLaterNext}
                className="rounded-full border border-white hover:cursor-pointer hover:bg-zinc-700 transition"
              />
            </div>
          </div>
        </div>

        {/* Carousel */}
        <div className="w-full max-w-full overflow-hidden" ref={watchLaterRef}>
          <div className="flex touch-pan-y select-none">
            {[1, 2, 3, 4, 5, 6].map((_, i) => (
              <div key={i} className="flex-[0_0_100%] 
                sm:flex-[0_0_50%] 
                lg:flex-[0_0_33.333%] 
                p-2
                box-border">
                <ThumbnailSkeleton />
              </div>
            ))}
          </div>
        </div>

        {/* Liked Videos Header */}
        <div className="w-full flex justify-between items-center py-2">
          <h2 className="text-xl font-semibold">Liked Videos</h2>
          <div className="flex flex-row gap-2 w-fit">
            <h2
              className={`text-sm border ${
                isLight
                  ? "border-zinc-300 hover:bg-zinc-300"
                  : "border-zinc-600 hover:bg-zinc-600"
              } rounded-full px-2 py-1 whitespace-nowrap hover:cursor-pointer`}
            >
              View all
            </h2>
            <div className="flex w-full gap-2 justify-center items-center">
              <ChevronLeft
                onClick={scrollLikedVideosPrev}
                className="rounded-full border border-white hover:cursor-pointer hover:bg-zinc-700 transition"
              />
              <ChevronRight
                onClick={scrollLikedVideosNext}
                className="rounded-full border border-white hover:cursor-pointer hover:bg-zinc-700 transition"
              />
            </div>
          </div>
        </div>

        {/* Carousel */}
        <div className="w-full max-w-full overflow-hidden" ref={likedVideosRef}>
          <div className="flex touch-pan-y select-none">
            {[1, 2, 3, 4, 5, 6].map((_, i) => (
              <div key={i} className="flex-[0_0_100%] 
                sm:flex-[0_0_50%] 
                lg:flex-[0_0_33.333%] 
                p-2
                box-border">
                <ThumbnailSkeleton />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

export default page