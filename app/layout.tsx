import type { Metadata } from "next";
import "./globals.css";
import {ChatProvider} from '@/app/context/ChatContext'

export const metadata: Metadata = {
  title: "Labpspace",
  description: "A lab porter for managing and assigning tasks",
  keywords: "",

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
            <div className="2xl:container mx-auto ">
              {children}
            </div>
          </ChatProvider>
      </body>
    </html>
  );
}
