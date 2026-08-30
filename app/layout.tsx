import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from '@next/third-parties/google'

const poppins = Poppins({
  subsets: ["latin", "devanagari"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Premadhu Gau Seva Samiti - Protecting Gau Mata",
  description:
    "Dedicated to the protection, care, and welfare of Gau Mata. Founded with a vision to serve and protect cows through shelter, nourishment, medical care, and community outreach in Jabalpur, India.",
  keywords: [
    "Premadhu",
    "Gau Seva Samiti",
    "Cow Protection",
    "Gaushala",
    "Jabalpur",
    "Gau Mata",
    "Gau Seva",
  ],
  icons: {
    icon: "/New_logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} scroll-smooth`}>
      <body className="font-sans antialiased text-[#2E2E2E] bg-white selection:bg-[#4CAF50]/20 selection:text-[#2E7D32]">
        {children}
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
      </body>
    </html>
  );
}
