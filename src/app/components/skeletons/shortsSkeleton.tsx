import Image from 'next/image';
import React from 'react'
import Link from 'next/link';

interface ShortsProps {
  thumbnailUrl?: string; // optional fallback image
  title?: string;
  channelName?: string;
  views?: string;
  videoUrl?: string; // YouTube embed URL for the short
}

const ShortsSkeleton = ({ thumbnailUrl, title, channelName, views, videoUrl }: ShortsProps) => {
    const isLoading = !title || !channelName || (!thumbnailUrl && !videoUrl);

    if (isLoading) {
        return (
        <div className="w-full max-w-[400px] h-full animate-pulse flex flex-col gap-2">
            <div className="h-full w-full bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
            <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="h-3 w-1/2 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>
        );
    }

  return (
    <div className="w-full h-full flex flex-col gap-2 items-center justify-center">
      {videoUrl ? (
        <div className="w-full max-w-md flex-1 overflow-hidden">
          <iframe
            src={videoUrl}
            className="h-full w-full object-cover rounded-lg"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title={title}
          />
        </div>
      ) : (
        thumbnailUrl && (
          <Image
            src={thumbnailUrl}
            alt={title || "video thumbnail"}
            className="h-60 w-full rounded-lg object-cover"
            width={200}
            height={200}
          />
        )
      )}
      <p className="text-sm font-medium line-clamp-2">{title}</p>
      <p className="text-xs text-gray-500 dark:text-gray-400">{channelName}</p>
      {views && (
        <p className="text-xs text-gray-500 dark:text-gray-400">{views} views</p>
      )}
    </div>
  );
}

export default ShortsSkeleton