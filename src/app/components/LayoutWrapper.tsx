// src/app/components/LayoutWrapper.tsx
"use client";

import { useState } from "react";
import { ThemeProvider, useTheme } from "next-themes";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import { useEffect } from "react";


export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { theme, setTheme, systemTheme } = useTheme();
  const [isLight, setIsLight] = useState(theme === "light");

  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null; // avoid mismatches

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <ThemeProvider
          attribute="class"
          enableSystem
          defaultTheme="system"
          disableTransitionOnChange
        >
        <div className={`min-h-screen flex flex-col ${currentTheme === 'light' ? 'bg-white' : 'bg-neutral-900'}`}>
        {/* Navbar always on top */}
        <Navbar toggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />

        {/* Sidebar + Main Content */}
        <div className={`flex min-h-screen`}>
          {/* Sidebar */}
          <Sidebar isOpen={isSidebarOpen} />

          {/* Main Section — shrinks when sidebar is open */}
          <main
            className={`flex-1 h-full transition-all duration-300 ${
              isSidebarOpen ? "ml-[90px] md:ml-[110px]" : "" 
            } 
            ${currentTheme === 'light' ? 'bg-white' : 'bg-neutral-900'}
            flex items-center justify-center`}
          >
            {children}
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}
