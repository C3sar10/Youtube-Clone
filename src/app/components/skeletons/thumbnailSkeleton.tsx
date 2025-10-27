import React from 'react'
import { EllipsisVertical } from 'lucide-react';
import Image from 'next/image';

interface ThumbnailProps {
  title?: string;
  channel?: string;
  thumbnailUrl?: string;
}


const ThumbnailSkeleton = ({ title, channel, thumbnailUrl }: ThumbnailProps) => {
  const isSkeleton = !title || !channel || !thumbnailUrl;

  return (
    // <div className="w-full max-w-[450px] flex flex-col animate-pulse hover:cursor-pointer hover:bg-gray-600/40 transition-all ease-in-out duration-500 p-4 rounded-[12px]">
    //   {/* Thumbnail placeholder */}
    //   <div className="w-full h-[225px] bg-gray-300 dark:bg-gray-700 rounded-[12px]"></div>

    //   <div className='flex flex-row mt-3 gap-3 justify-center items-start'>
    //     {/* Channel logo in circle */}
    //     <div className='w-10 h-10 bg-gray-700 rounded-full'></div>

    //     {/* Video title with channel name, views, and upload time   */}
    //     <div className='flex flex-col flex-1 ml-2 mt-2 gap-4'>
    //         <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
    //         <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
    //         <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
    //     </div>

    //     {/* Three dots menu for more options */}
    //     <EllipsisVertical className="ml-auto text-gray-500 mt-3"/>
    //   </div>

    // </div>
    <div
      className={`w-full max-w-[450px] flex flex-col hover:cursor-pointer hover:bg-gray-600/40 transition-all ease-in-out duration-500 p-4 rounded-[12px] 
      ${isSkeleton ? "animate-pulse" : ""}`}
    >
      {/* Thumbnail */}
      {isSkeleton ? (
        <div className="w-full h-[225px] bg-gray-300 dark:bg-gray-700 rounded-[12px]"></div>
      ) : (
        <Image
          src={thumbnailUrl}
          alt={title}
          width={200}
          height={200}
          className="w-full h-[225px] object-cover rounded-[12px]"
        />
      )}

      <div className="flex flex-row mt-3 gap-3 items-start">
        {/* Channel logo */}
        {isSkeleton ? (
          <div className="w-10 h-10 bg-gray-700 dark:bg-gray-600 rounded-full"></div>
        ) : (
          <div className="w-10 h-10 bg-gray-500 rounded-full">
            <Image
              src={thumbnailUrl}
              alt={title}
              width={200}
              height={200}
              className="w-full object-cover rounded-full"
            />
          </div> // Replace with channel image later
        )}

        {/* Video details */}
        <div className="flex flex-col flex-1">
          {isSkeleton ? (
            <>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
            </>
          ) : (
            <>
              <h3 className="font-semibold text-sm line-clamp-2">{title}</h3>
              <p className="text-xs text-gray-400">{channel}</p>
            </>
          )}
        </div>

        {/* Menu (3 dots) */}
        <EllipsisVertical className={`ml-auto mt-3 ${isSkeleton ? "text-gray-500" : "text-gray-400"}`} />
      </div>
    </div>
  )
}

export default ThumbnailSkeleton