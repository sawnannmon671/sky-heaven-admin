import { useState, useEffect } from "react";
import { useLanguageStore } from "@/store/useLanguageStore";

export function useTranslation() {
  const { lang, setLang } = useLanguageStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Return a stable language even during hydration, 
  // but we'll use 'mounted' to decide whether to show the translated content
  return { 
    lang: mounted ? lang : "en", 
    setLang, 
    mounted 
  };
}
