import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  
} from '@clerk/nextjs'
import Provider from "./provider";
import {Outfit, Roboto_Slab} from "next/font/google"

const outfit = Outfit({subsets:['latin']
});


export const metadata: Metadata = {
  title: "Clipverse: AI Short Video Generator",
  description: "AI Short Video Creation Platform",
  icons: {
    icon: "/clipmania_logo.png",
  },

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={outfit.className}
      >
        
        <Provider>{children}</Provider>
      </body>
    </html>
    </ClerkProvider>
  );
}
