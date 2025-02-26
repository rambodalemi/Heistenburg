import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "Heistenburg",
  description: "Best GTA Store",
  openGraph: {
    title: "Heistenburg",
    description: "Best GTA Store",
    url: "heistenburg.com",
    siteName: "heistenburg.com",
    images: [
      {
        url: `heistenburg.com/logo.png`,
        width: 1200,
        height: 675,
      },
    ],
  },
  twitter: {
    title: "Heistenburg",
    card: "summary_large_image",
  },
  icons: {
    shortcut: "/logo.png",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <body
          className={`${inter.className} antialiased min-h-screen bg-gradient-to-b from-black to-zinc-900 text-zinc-50`}
        >

            {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
