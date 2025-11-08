"use client";
import React from 'react'
import { Search, X, Mic } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from 'next-themes';

const SearchBar = () => {
    const {theme} = useTheme();
    const [query, setQuery] = useState("");
    const [isExpanded, setIsExpanded] = useState(false);
    const [isLight, setIsLight] = useState(theme === 'light');

    useEffect(() => {
        setIsLight(theme === "light");
      }, [theme]);

  return (
    <>
      {/* Normal desktop search bar */}
      <section
        className={`hidden lg:flex items-center w-full max-w-lg rounded-full border transition-all duration-300 px-3 py-1.5
          ${isLight === true ? "bg-gray-100 border-gray-300" : "bg-neutral-800 border-neutral-700"}
        `}
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search"
          className={`flex-1 bg-transparent outline-none px-2 text-sm
            ${isLight === true ? "text-black placeholder-gray-500" : "text-white placeholder-gray-400"}
          `}
        />
        <button
          className={`flex items-center justify-center rounded-full p-2 transition-all duration-200
            ${isLight === true ? "hover:bg-gray-200" : "hover:bg-neutral-700"}
          `}
        >
          <Search size={18} className={`${isLight === true ? "text-black" : "text-white"}`} />
        </button>
      </section>

      {/* Mobile search icon */}
      <button
        className={`lg:hidden p-2 rounded-full transition-all hover:cursor-pointer ${isLight === true ? 'hover:bg-neutral-300' : 'hover:bg-neutral-500'}`}
        onClick={() => setIsExpanded(true)}
      >
        <Search size={22} />
      </button>

      {/* Overlay search bar for mobile */}
      {isExpanded && (
        <div
          className={`fixed top-0 left-0 w-full h-14 z-999 flex items-center justify-center px-4 transition-all duration-300
            ${isLight === true ? "bg-white text-black" : "bg-neutral-900 text-white"}
          `}
        >
          <button
            onClick={() => setIsExpanded(false)}
            className={`p-2 mr-2 rounded-full transition-all hover:cursor-pointer
                ${isLight === true ? "hover:bg-neutral-200" : "hover:bg-neutral-800"}`}
          >
            <X size={22} />
          </button>

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            autoFocus
            className={`w-2/3 bg-transparent outline-none text-sm border rounded-full py-2 px-3
              ${isLight === true ? "text-black placeholder-gray-500 border-zinc-300" : "text-white placeholder-gray-400 border-zinc-500"}
            `}
          />

          <button
            className={`p-2 mr-2 rounded-full transition-all hover:cursor-pointer
                ${isLight === true ? "hover:bg-neutral-200" : "hover:bg-neutral-800"}`}
          >
            <Mic size={22} />
          </button>
        </div>
      )}
    </>
  )
}

export default SearchBar





