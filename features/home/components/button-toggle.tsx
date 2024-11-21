"use client"
// components/ThemeToggle.tsx
import React, { useEffect } from "react";
import { useThemeStore } from "../store/theme.store";

export const ButtonToggle = () => {
    const { isDarkMode, toggleTheme } = useThemeStore();

    const setDarkMode = useThemeStore((state) => state.setDarkMode);

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme === "dark") {
            setDarkMode(true);
        } else {
            setDarkMode(false);
        }
    }, [setDarkMode]);

    return (
        <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-800"
            aria-label="Toggle Dark Mode"
        >
            {isDarkMode ? (
                <span className="text-yellow-500">🌙</span> // Moon icon
            ) : (
                <span className="text-blue-500">☀️</span> // Sun icon
            )}
        </button>
    );
};