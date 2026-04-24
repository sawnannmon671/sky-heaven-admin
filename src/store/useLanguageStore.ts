import { create } from "zustand";
import { persist } from "zustand/middleware";

type Language = "en" | "mm";

interface LanguageState {
  lang: Language;
  setLang: (lang: Language) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      lang: "en",
      setLang: (lang) => set({ lang }),
    }),
    {
      name: "language-storage",
    }
  )
);
