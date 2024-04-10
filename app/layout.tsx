"use client ";

import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import type { PropsWithChildren } from "react";

import { Footer } from "@/components/main/footer";
import { Navbar } from "@/components/main/navbar";
import { StarsCanvas } from "@/components/main/star-background";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/react"
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#030014",
};

export const metadata: Metadata = {
  title:{
    default:'Ewumesh - Providing the best project experience',
    template:'%s - Ewumesh'
  },
  description:'Explore our cutting-edge projects, dynamic solutions, and unpralleled expertise in software development, web design, and digital transformation.',
  twitter: {
    card:'summary_large_image'
  }
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body
        className={cn(
          "bg-[#030014] overflow-y-scroll overflow-x-hidden",
          inter.className
        )}
      >
        <Analytics/>
        <StarsCanvas />
        <Navbar />
        {/* <BrowserRouter> */}
        {children}
        {/* </BrowserRouter> */}
        <Footer />
        <script async src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js"></script>
      </body>
    </html>
  );
}
