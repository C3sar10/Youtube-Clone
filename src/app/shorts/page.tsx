"use client";
import React from 'react'

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import ShortsSkeleton from '../components/skeletons/shortsSkeleton';
import { ArrowBigDown, ArrowBigUp } from 'lucide-react';

interface YouTubeVideo {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    description: string;
    channelTitle: string;
    channelId: string;
    publishedAt: string;
    thumbnails: {
      default: { url: string };
      medium: { url: string };
      high: { url: string };
    };
  };
  contentDetails: {
    duration: string; // ISO 8601 format, e.g. "PT5M30S"
  };
  statistics: {
    viewCount: string;
    likeCount: string;
    commentCount: string;
  };
}


function parseYouTubeDuration(duration: string): number {
    // returns duration in seconds
    const match = duration.match(/PT(?:(\d+)M)?(?:(\d+)S)?/);
    const minutes = parseInt(match?.[1] || "0");
    const seconds = parseInt(match?.[2] || "0");
    return minutes * 60 + seconds;
  }

const Page = () => {
  const { theme, setTheme, systemTheme } = useTheme();
  const [isLight, setIsLight] = useState(theme === "light");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [mounted, setMounted] = useState(false);

  const testVideoId = "2Vv-BfVoq4g"; // Just a regular video or short

  const testVideos = [
    {
      id: { videoId: "2Vv-BfVoq4g" },
      snippet: {
        title: "Test Video",
        channelTitle: "Test Channel",
        thumbnails: {
          high: { url: "https://i.ytimg.com/vi/2Vv-BfVoq4g/hqdefault.jpg" },
        },
      },
      statistics: { viewCount: "123456" },
    },
    
    {
      id: { videoId: "2Vv-BfVoq4g" },
      snippet: {
        title: "Test Video",
        channelTitle: "Test Channel",
        thumbnails: {
          high: { url: "https://i.ytimg.com/vi/2Vv-BfVoq4g/hqdefault.jpg" },
        },
      },
      statistics: { viewCount: "123456" },
    },
  ];

  useEffect(() => setMounted(true), []);

  const currentTheme = theme === "system" ? systemTheme : theme;

  useEffect(() => {
    const cached = localStorage.getItem("videos");
    if (cached) {
      const parsed: YouTubeVideo[] = JSON.parse(cached);

      // Filter videos under 60 seconds → potential Shorts
      const shorts = parsed.filter((v) => {
        if (!v.contentDetails?.duration) return false;
        const duration = parseYouTubeDuration(v.contentDetails.duration);
        return duration <= 60;
      });

      // Shuffle so they’re random
      const shuffled = shorts.sort(() => Math.random() - 0.5);

      setVideos(shuffled);
    }
  }, []);

  if (!mounted) return null; // avoid mismatches

  return (
    <main className={`relative h-screen w-full flex justify-center overflow-hidden px-4 ${currentTheme === "light" ? "bg-white text-black" : "bg-neutral-900 text-white"}`}>

      <div className="relative w-full h-full overflow-hidden">      
        <div
          className="transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateY(-${currentIndex * 100}vh)`,
          }}
        >
          {testVideos.length === 0 ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-screen flex items-center justify-center p-15 pt-20">
                <ShortsSkeleton />
              </div>
            ))
          ) : (
            testVideos.map((video, index) => (
              <div key={index} className="h-screen w-full flex items-center justify-center">
                <ShortsSkeleton
                  // YouTube embed URL for the short
                  videoUrl={`https://www.youtube.com/embed/${video.id.videoId}?autoplay=0&controls=0`}
                  // Fallback thumbnail if needed
                  thumbnailUrl={video.snippet.thumbnails.high.url}
                  title={video.snippet.title}
                  channelName={video.snippet.channelTitle}
                  views={video.statistics?.viewCount}
                />
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
                prev < (videos.length || 4) - 1 ? prev + 1 : prev
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

export default Page