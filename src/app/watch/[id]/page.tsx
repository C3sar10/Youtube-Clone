"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

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

export default function WatchPage() {
    const { id } = useParams();
    const [video, setVideo] = useState<YouTubeVideo | null>(null);
    const [related, setRelated] = useState<YouTubeVideo[]>([]);

    useEffect(() => {
        const cached = localStorage.getItem('cachedVideos');
        if (cached) {
          const parsed = JSON.parse(cached);
          const items = parsed.items || []; // Extract the actual array

          const current = items.find(
            (v: any) => v.id === id || v.id?.videoId === id
          );
          setVideo(current || null);

          setRelated(
            items.filter((v: any) => v.id !== id && v.id?.videoId !== id).slice(0, 10)
          );
        }
    }, [id]);

    if(!video){
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-400">
                Loading video...
            </div>
        );
    }

    return( 
      <main className="flex flex-col lg:flex-row w-full min-h-screen bg-neutral-900 text-white mt-15">
      {/* Main Video Section */}
      <section className="flex-1 p-4 lg:p-6">
        <div className="aspect-video w-full bg-black rounded-xl overflow-hidden">
          <iframe
            src={`https://www.youtube.com/embed/${video.id.videoId}?autoplay=1&controls=1&playsinline=1`}
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="w-full h-full"
          />
        </div>

        <h1 className="text-xl font-semibold mt-4">{video.snippet.title}</h1>
        <p className="text-sm text-gray-400">{video.snippet.channelTitle}</p>
        {video.statistics?.viewCount && (
          <p className="text-xs text-gray-500 mt-1">
            {parseInt(video.statistics.viewCount).toLocaleString()} views
          </p>
        )}

        <p className="text-sm mt-3 text-gray-300 whitespace-pre-line">
          {video.snippet.description}
        </p>
      </section>

      {/* Sidebar with related videos */}
      <aside className="w-full lg:w-[400px] p-4 lg:p-6 border-t lg:border-t-0 lg:border-l border-gray-700">
        <h2 className="font-semibold mb-3 text-lg">Related Videos</h2>
        <div className="flex flex-col gap-4">
          {related.map((vid, index) => (
            <Link
              key={index}
              href={`/watch/${vid.id}`}
              className="flex gap-3 hover:bg-neutral-800 p-2 rounded-lg transition"
            >
              <Image
                src={vid.snippet.thumbnails.high.url}
                alt={vid.snippet.title}
                className="w-40 h-24 object-cover rounded-md"
                width={200}
                height={200}
              />
              <div>
                <p className="text-sm font-medium line-clamp-2">
                  {vid.snippet.title}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {vid.snippet.channelTitle}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </aside>
    </main>
    );
}