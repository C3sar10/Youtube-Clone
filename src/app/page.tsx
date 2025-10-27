"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import ThumbnailSkeleton from "./components/skeletons/thumbnailSkeleton";
import "../../public/youtube_logo.png"

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [isLight, setIsLight] = useState(theme === "light");
  const videos: unknown[] = [];

  useEffect(() => {
    setIsLight(theme === "light");
  }, [theme]);

  return (
    <main className={`min-h-screen h-full w-full flex justify-center py-15 ${isLight === true ? 'bg-white' : 'bg-neutral-900'}`}>
      <div className="w-full px-6 py-2 mt-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-4 place-items-center">
        <ThumbnailSkeleton thumbnailUrl="/youtube_logo.png" title="Youtube Video" channel="My Channel"/>
        <ThumbnailSkeleton />
        <ThumbnailSkeleton />
        <ThumbnailSkeleton />
        <ThumbnailSkeleton />
        <ThumbnailSkeleton />
      </div>
    </main>
  );
}
