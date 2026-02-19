import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Playfair_Display } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({ subsets: ["latin"] });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Markly—Real-Time Bookmark Manager",
  description:
    "Markly is a secure bookmark manager that lets users sign in with Google, save links, and manage personal bookmarks privately. Features include real-time sync across tabs, instant updates, and seamless bookmark deletion.",
  keywords: [
    "bookmark manager",
    "nextjs app",
    "supabase project",
    "google authentication",
    "real-time bookmarks",
    "link saver",
    "web app assignment",
  ],
  authors: [{ name: "Devanshu" }],
  creator: "Devanshu",
  metadataBase: new URL("https://markly-kappa.vercel.app/"),
  openGraph: {
    title: "Markly — Real-Time Bookmark Manager",
    description:
      "Save, manage, and access your bookmarks instantly with Google login and live syncing across tabs.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased max-w-7xl mx-auto px-2 flex flex-col min-h-screen bg-gray-200/50`}
      >
        <Toaster position="top-right" reverseOrder={false} />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
