// store/useThemeStore.ts
import { create } from "zustand";

interface ThemeState {
  isDarkMode: boolean;
  toggleTheme: () => void;
  setDarkMode: (value: boolean) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  isDarkMode: false,
  toggleTheme: () =>
    set((state) => {
      const newTheme = !state.isDarkMode;
      document.documentElement.classList.toggle("dark", newTheme);
      localStorage.setItem("theme", newTheme ? "dark" : "light");
      return { isDarkMode: newTheme };
    }),
  setDarkMode: (value: boolean) => {
    document.documentElement.classList.toggle("dark", value);
    localStorage.setItem("theme", value ? "dark" : "light");
    set({ isDarkMode: value });
  },
}));
