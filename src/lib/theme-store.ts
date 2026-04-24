import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MantineColor } from "@mantine/core";

interface ThemeState {
  primaryColor: MantineColor;
  setPrimaryColor: (color: MantineColor) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      primaryColor: "blue",
      setPrimaryColor: (color) => set({ primaryColor: color }),
    }),
    {
      name: "theme-storage",
    }
  )
);
