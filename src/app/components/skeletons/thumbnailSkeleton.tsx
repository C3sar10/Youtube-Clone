import React, { useEffect, useState } from 'react'
import { EllipsisVertical, Dot } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';

interface ThumbnailProps {
  id?: string;
  title?: string;
  channel?: string;
  thumbnailUrl?: string;
  duration?: string;
  views?: string;
  published?: string;
}


const ThumbnailSkeleton = ({ id, title, channel, thumbnailUrl, duration, views, published }: ThumbnailProps) => {
  const { theme, setTheme } = useTheme();
  const [isLight, setIsLight] = useState(theme === "light");
  const isSkeleton = !id || !title || !channel || !thumbnailUrl;

  useEffect(() => {
    setIsLight(theme === "light");
  }, [theme]);

  if(isSkeleton){
    return(
      <div
      className={`w-full max-w-[550px] flex flex-col hover:cursor-pointer transition-all ease-in-out duration-500 p-4 rounded-[12px] animate-pulse ${isLight === true ? 'hover:bg-gray-200' : 'hover:bg-gray-600/40'}`}>
      {/* Thumbnail */}
      <div className="w-full h-[225px] bg-gray-300 dark:bg-gray-700 rounded-[12px]"></div>

      <div className="flex flex-row mt-3 gap-3 items-start">
        <div className="w-10 h-10 bg-gray-700 dark:bg-gray-600 rounded-full"></div>
        {/* Video details */}
        <div className="flex flex-col flex-1">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
        </div>
        {/* Menu (3 dots) */}
        <EllipsisVertical className={`ml-auto mt-3 ${isSkeleton ? "text-gray-500" : "text-gray-400"}`} />
      </div>
    </div>
    );
  }

  return (
    <Link href={`/watch/${id}`}
      className={`w-full max-w-[550px] flex flex-col hover:cursor-pointer transition-all ease-in-out duration-500 p-4 rounded-[12px] ${isLight === true ? 'hover:bg-gray-200' : 'hover:bg-gray-600/40'}`}
    >
      {/* Thumbnail */}
      <div className="relative w-full h-[225px] rounded-[12px] overflow-hidden hover:scale-102 transition-all duration-500 ease-in-out">
        <Image
          src={thumbnailUrl}
          alt={title}
          fill
          className="object-cover rounded-[12px]"
        />
        <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-semibold px-1.5 py-0.5 rounded">
          {duration}
        </span>
      </div>

      <div className="flex flex-row mt-3 gap-3 items-start">
        {/* Channel logo */}
        <div className="w-10 h-10 rounded-full">
          <Image
            src={thumbnailUrl}
            alt={title}
            width={200}
            height={200}
            className="w-full h-full object-fit rounded-full place-items-center"
          />
        </div> 

        {/* Video details */}
        <div className="flex flex-col flex-1">
          <h3 className="font-semibold text-md line-clamp-2">{title}</h3>
          <p className="text-sm text-gray-400">{channel}</p>
          <p className="text-xs text-gray-400 flex items-center">{views} <Dot size={16}/> {published}</p>
        </div>

        {/* Menu (3 dots) */}
        <EllipsisVertical className={`ml-auto mt-3 ${isSkeleton ? "text-gray-500" : "text-gray-400"}`} />
      </div>
    </Link>
  )
}

export default ThumbnailSkeleton