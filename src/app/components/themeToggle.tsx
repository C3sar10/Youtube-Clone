"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={`relative flex items-center w-14 h-6 lg:w-18 lg:h-8 rounded-full transition-colors duration-300 hover:cursor-pointer ${
        theme === "light" ? "bg-zinc-800" : "bg-zinc-800"
      }`}
    >
      <Sun
        className={`absolute right-2 w-4 h-4 lg:w-5 lg:h-5 transition-opacity duration-300 ${
          theme === 'light' ? "opacity-100 text-yellow-300" : "opacity-0"
        }`}
      />
      <Moon
        className={`absolute left-2 w-4 h-4 lg:w-5 lg:h-5 transition-opacity duration-300 ${
          theme === 'light' ? "opacity-0" : "opacity-100 text-blue-200"
        }`}
      />

      <motion.div
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={`absolute w-6 h-6 lg:w-8 lg:h-8 bg-white rounded-full shadow-md ${
          theme === 'light' ? "left-0" : "right-0"
        }`}
      />
    </button>
  );
}