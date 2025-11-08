// src/app/components/LayoutWrapper.tsx
"use client";

import { useState } from "react";
import { ThemeProvider, useTheme } from "next-themes";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import { useEffect } from "react";


export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
        <div className={`min-h-screen flex flex-col relative ${currentTheme === 'light' ? 'bg-white' : 'bg-neutral-900'}`}>
        {/* Navbar always on top */}
        <Navbar toggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />

        {/* Sidebar as overlay */}
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        {/* Overlay background */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-102"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main content — no margin shifting needed */}
        <main
          className={`flex-1 h-full transition-all duration-300 flex items-center justify-center z-10 relative ${
            currentTheme === "light" ? "bg-white" : "bg-neutral-900"
          }`}
        >
          {children}
        </main>
      </div>
    </ThemeProvider>
  );
}
