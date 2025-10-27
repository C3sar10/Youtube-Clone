import Image from 'next/image';
import React from 'react'

interface ShortsProps {
  thumbnailUrl?: string;
  title?: string;
  channelName?: string;
  views?: string;
}

const ShortsSkeleton = ({ thumbnailUrl, title, channelName, views }: ShortsProps) => {
    const isLoading = !thumbnailUrl || !title || !channelName;

    if (isLoading) {
        return (
        <div className="w-2/3 max-w-[400px] h-3/4 max-h-[700px] animate-pulse flex flex-col gap-2">
            <div className="h-full w-full bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
            <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="h-3 w-1/2 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>
        );
    }

  return (
    <div className="w-40 flex flex-col gap-2">
      <Image
        src={thumbnailUrl}
        alt={title}
        className="h-60 w-full rounded-lg object-cover"
      />
      <p className="text-sm font-medium line-clamp-2">{title}</p>
      <p className="text-xs text-gray-500 dark:text-gray-400">{channelName}</p>
      <p className="text-xs text-gray-500 dark:text-gray-400">{views} views</p>
    </div>
  );
}

export default ShortsSkeleton