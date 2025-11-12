"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import ThumbnailSkeleton from "./components/skeletons/thumbnailSkeleton";
import ShortsSkeleton from "./components/skeletons/shortsSkeleton";
import "../../public/youtube_logo.png"
import { EllipsisVertical, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [isLight, setIsLight] = useState(theme === "light");
  const [visibleCount, setVisibleCount] = useState(5);
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);

  function shuffleArray<T>(array: T[]): T[] {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  function formatPublishedTime(publishedAt: string) {
    const publishedDate = new Date(publishedAt);
    const now = new Date();
    const diffMs = now.getTime() - publishedDate.getTime();

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (seconds < 60) return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
    if (minutes < 60) return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
    if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    if (days < 7) return `${days} day${days !== 1 ? "s" : ""} ago`;
    if (weeks < 5) return `${weeks} week${weeks !== 1 ? "s" : ""} ago`;
    if (months < 12) return `${months} month${months !== 1 ? "s" : ""} ago`;
    return `${years} year${years !== 1 ? "s" : ""} ago`;
  }

  function formatDuration(duration: string) {
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return "0:00";

    const hours = parseInt(match[1] || "0", 10);
    const minutes = parseInt(match[2] || "0", 10);
    const seconds = parseInt(match[3] || "0", 10);

    // If at least 1 hour long → show "h:mm"
    if (hours > 0) {
      const paddedMinutes = minutes.toString().padStart(2, "0");
      return `${hours}:${paddedMinutes}`;
    }

    // Otherwise show "m:ss"
    const paddedSeconds = seconds.toString().padStart(2, "0");
    return `${minutes}:${paddedSeconds}`;
  }

  function formatViews(views: string) {
    const num = parseInt(views);
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M views`;
    if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K views`;
    return `${num} views`;
  }

  async function fetchPopularVideos() {
    try {
      const res = await fetch("/api/youtube");
      const data = await res.json();
      if (data.items) {
        // cache data with timestamp
        localStorage.setItem("cachedVideos", JSON.stringify({
          timestamp: Date.now(),
          items: data.items,
        }));
        setVideos(data.items);
      }
    } catch (err) {
      console.error("Error fetching popular videos:", err);
    }
  }

  useEffect(() => {
    setIsLight(theme === "light");
  }, [theme]);

  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth;
      if (width >= 1280) setVisibleCount(5); // xl and up
      else if (width >= 1024) setVisibleCount(4); // lg
      else if (width >= 768) setVisibleCount(3); // md
      else setVisibleCount(2); // small screens
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  useEffect(() => {
    const cache = localStorage.getItem("cachedVideos");
    const CACHE_DURATION = 12 * 60 * 60 * 1000; 

    if (cache) {
      const { timestamp, items } = JSON.parse(cache) as {
        timestamp: number;
        items: YouTubeVideo[];
      };
      const isExpired = Date.now() - timestamp > CACHE_DURATION;

      if (!isExpired) {
        console.log("Using cached videos");
        const shuffled = shuffleArray(items);
        setVideos(shuffled);
        return; // skip API call
      }
    }

    console.log("Cache empty or expired — fetching fresh data");
    fetchPopularVideos();
  }, []);
  
  return (
    <main className={`h-full w-full flex flex-col justify-center py-15 px-5 ${isLight === true ? 'bg-white' : 'bg-neutral-900'} gap-4`}>
      <div className="w-full px-2 py-2 mt-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-4 place-items-center justify-start">
        {videos.length > 0 ? (
          videos.slice(0, 6).map((video, index) => (
          <ThumbnailSkeleton
            key={index}
            id={typeof video.id === "string" ? video.id : video.id.videoId}
            title={video.snippet.title}
            channel={video.snippet.channelTitle}
            thumbnailUrl={video.snippet.thumbnails.high.url}
            duration={formatDuration(video.contentDetails.duration)}
            views={formatViews(video.statistics.viewCount)}
            published={formatPublishedTime(video.snippet.publishedAt)}
          />
        ))
        ) : (
          Array.from({ length: 6 }).map((_, i) => <ThumbnailSkeleton key={i} />)
        )}
      </div>
      <div className={`relative w-full flex flex-col justify-center px-4 py-12 gap-4 border-b ${isLight === true ? 'border-gray-300' : 'border-gray-700'}`}>
        <div className="w-full flex justify-between">
          <span className="flex gap-2 items-center">
            <Image src={"/Youtube_Shorts.png"} alt="Youtube Shorts Logo" width={20} height={20}/>
            <h2 className="text-2xl font-bold">Shorts</h2>
          </span>
          <EllipsisVertical />
        </div>
        <div className="grid gap-8 w-full place-items-center h-[350px] md:h-[375px] lg:h-[400px]"
            style={{
              gridTemplateColumns: `repeat(${visibleCount}, minmax(0, 1fr))`,
            }}>
          {Array.from({ length: visibleCount }).map((_, i) => (
            <ShortsSkeleton key={i}/>
          ))}
        </div>
        <Link href={"/shorts"} className={`absolute left-1/2 -translate-x-1/2 -bottom-4 z-10 border rounded-full px-4 py-1 shadow-sm cursor-pointer w-1/3 transition-all duration-500 ${isLight === true ? "bg-white hover:bg-neutral-100 border-gray-300" : "bg-neutral-900 hover:bg-neutral-800 border-gray-700"} flex items-center justify-center gap-2`}>
          <span>More shorts</span>
          <ArrowRight size={20}/>
        </Link>
      </div>
      <div className="w-full px-2 py-2 mt-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-4 place-items-center justify-start">
        {videos.length > 0 ? (
          videos.slice(6, 12).map((video, index) => (
          <ThumbnailSkeleton
            key={index}
            id={typeof video.id === "string" ? video.id : video.id.videoId}
            title={video.snippet.title}
            channel={video.snippet.channelTitle}
            thumbnailUrl={video.snippet.thumbnails.high.url}
            duration={formatDuration(video.contentDetails.duration)}
            views={formatViews(video.statistics.viewCount)}
            published={formatPublishedTime(video.snippet.publishedAt)}
          />
        ))
        ) : (
          Array.from({ length: 6 }).map((_, i) => <ThumbnailSkeleton key={i} />)
        )}
      </div>
    </main>
  );
}
