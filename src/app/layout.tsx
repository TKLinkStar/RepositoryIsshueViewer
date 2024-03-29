import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import WithApollo from "@/components/WithApollo";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create test App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}><WithApollo>{children}</WithApollo></body>
    </html>
  );
}

