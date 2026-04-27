import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import { ColorSchemeScript } from "@mantine/core";
import { ThemeProvider } from "@/components/theme-provider";
import NextTopLoader from "nextjs-toploader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sky Haven Condominium",
  description: "Condo Building Management System",
  icons: {
    icon: "/sh.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript defaultColorScheme="light" />
      </head>
      <body>
        <NextTopLoader 
          color="#014F86" 
          initialPosition={0.08} 
          crawlSpeed={200} 
          height={4} 
          crawl={true} 
          showSpinner={false} 
          easing="ease" 
          speed={200} 
          shadow="0 0 10px #014F86,0 0 5px #014F86" 
        />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
