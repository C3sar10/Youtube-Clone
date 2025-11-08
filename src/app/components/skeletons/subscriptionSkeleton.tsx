"use client";
import React from 'react'
import { useState, useEffect, useRef } from 'react';
import { Bell, BellOff, BellRing, ChevronDown } from "lucide-react";
import Image from 'next/image';
import { useTheme } from 'next-themes';

interface SubscriptionProps {
  channelLogo?: string;
  channelName?: string;
  handle?: string;
  subsCount?: string;
  description?: string;
}


const SubscriptionSkeleton = ({
  channelLogo,
  channelName,
  handle,
  subsCount,
  description,
}: SubscriptionProps) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [notifLevel, setNotifLevel] = useState("All"); // All, Personalized, None
    const menuRef = useRef<HTMLDivElement>(null);
    const { theme, setTheme, systemTheme } = useTheme();
    const [isLight, setIsLight] = useState(theme === "light");

    useEffect(() => {
          const current = theme === "system" ? systemTheme : theme;
          setIsLight(current === "light");
        }, [theme, systemTheme]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
            setMenuOpen(false);
        }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

  return (
    <div className={`flex items-start justify-between w-full rounded-xl p-4 transition-all duration-300`}>
      {/* Left: Channel logo */}
      <div className="flex-shrink-0">
        {channelLogo ? (
          <div className="relative w-16 h-16 rounded-full overflow-hidden">
            <Image
              src={channelLogo}
              alt={channelName || "Channel logo"}
              fill
              className="object-cover rounded-full"
              sizes="64px"
              priority={false}
            />
          </div>
        ) : (
          <div className="w-16 h-16 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse" />
        )}
      </div>

      {/* Middle: Channel info */}
      <div className="flex flex-col flex-1 px-4">
        {channelName ? (
          <>
            <h2 className="text-lg font-semibold">{channelName}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {handle} • {subsCount} subscribers
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
              {description}
            </p>
          </>
        ) : (
          <div className="flex flex-col gap-2 mt-1 animate-pulse">
            <div className="h-4 w-1/2 bg-gray-300 dark:bg-gray-700 rounded" />
            <div className="h-3 w-1/3 bg-gray-300 dark:bg-gray-700 rounded" />
            <div className="h-3 w-3/4 bg-gray-300 dark:bg-gray-700 rounded" />
          </div>
        )}
      </div>

      {/* Right: Dropdown Menu (hidden on small screens) */}
      <div ref={menuRef} className="relative hidden sm:block">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`p-2 rounded-full transition-all duration-300 ease-in-out inline-flex items-center gap-2 hover:cursor-pointer ${isLight === true ? "bg-zinc-200 hover:bg-zinc-300" : "bg-zinc-600 hover:bg-zinc-400"}`}
        >
            {notifLevel === 'All' ?  <BellRing /> : notifLevel === 'Personalized' ? <Bell /> : <BellOff />}
          <span className='text-sm'>Subscribed</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-300 ${
                menuOpen ? "rotate-180" : "rotate-0"
              }`}
            />
        </button>

        {menuOpen && (
          <div className={`absolute right-0 mt-2 w-48 shadow-lg rounded-md overflow-hidden z-20 ${isLight === true ? "bg-zinc-300" : "bg-zinc-800"}`}>
            <button
              onClick={() => {
                setNotifLevel("All");
                setMenuOpen(false);
              }}
              className={`flex items-center gap-2 w-full text-left px-4 py-2 hover:cursor-pointer ${isLight === true ? "hover:bg-gray-100" : "hover:bg-zinc-700"} ${
                notifLevel === "All" && isLight === true
                  ? "bg-gray-100 font-semibold"
                  : notifLevel === "All" && isLight === false ? "bg-zinc-700 font-semibold" 
                  : ""
              }`}
            >
              <BellRing size={14} /> All
            </button>
            <button
              onClick={() => {
                setNotifLevel("Personalized");
                setMenuOpen(false);
              }}
              className={`flex items-center gap-2 w-full text-left px-4 py-2 hover:cursor-pointer ${isLight === true ? "hover:bg-gray-100" : "hover:bg-zinc-700"} ${
                notifLevel === "Personalized" && isLight === true
                  ? "bg-gray-100 font-semibold"
                  : notifLevel === "Personalized" && isLight === false ? "bg-zinc-700 font-semibold" 
                  : ""
              }`}
            >
              <Bell size={14} /> Personalized
            </button>
            <button
              onClick={() => {
                setNotifLevel("None");
                setMenuOpen(false);
              }}
              className={`flex items-center gap-2 w-full text-left px-4 py-2 hover:cursor-pointer ${isLight === true ? "hover:bg-gray-100" : "hover:bg-zinc-700"} ${
                notifLevel === "None" && isLight === true
                  ? "bg-gray-100 font-semibold"
                  : notifLevel === "None" && isLight === false ? "bg-zinc-700 font-semibold" 
                  : ""
              }`}
            >
              <BellOff size={14} /> None
            </button>

            <button
              onClick={() => alert("Unsubscribed")}
              className={`w-full text-left px-4 py-2 hover:cursor-pointer text-red-600 ${isLight === true ? "hover:bg-gray-100" : "hover:bg-zinc-700"}`}
            >
              Unsubscribe
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionSkeleton