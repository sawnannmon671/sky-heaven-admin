"use client";

import { MantineProvider, createTheme } from "@mantine/core";
import { useThemeStore } from "@/lib/theme-store";
import { useEffect, useState } from "react";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const primaryColor = useThemeStore((state) => state.primaryColor);
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const theme = createTheme({
    primaryColor,
  });

  if (!mounted) {
    return (
      <MantineProvider theme={createTheme({ primaryColor: "blue" })}>
        {children}
      </MantineProvider>
    );
  }

  return <MantineProvider theme={theme}>{children}</MantineProvider>;
}
