import type { Metadata } from "next";
import "./globals.css";
import {ChatProvider} from '@/app/context/ChatContext'

export const metadata: Metadata = {
  title: "ease credit",
  description: "",
  keywords: "SEO, project management, web tools, Insightedge",

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className='relative'>
        <ChatProvider>
            <div className="container mx-auto ">
              {children}
            </div>
          </ChatProvider>
      </body>
    </html>
  );
}
