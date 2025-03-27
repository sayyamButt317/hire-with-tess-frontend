import type { Metadata } from "next";
import { Roboto  } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/Utils/Providers/ReactQueryprovider"
import React from "react";

const inter = Roboto({
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  variable: "--font-roboto", // Optional CSS variable
  display: 'swap'
});
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-roboto`}
      >
        
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
