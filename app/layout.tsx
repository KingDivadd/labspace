import type { Metadata } from "next";
import "./globals.css";
import {ChatProvider} from '@/app/context/ChatContext'

export const metadata: Metadata = {
  title: "Fintaza",
  description: "A comprehensive platform for managing loans, streamlining application processes, automating credit evaluation, enabling seamless payments, and enhancing user experience with secure customer and admin portals.",
  keywords: "Lending Management, Loan Application Portal, Credit Scoring, KYC/AML Verification, Payment Processing, User Roles & Permissions",

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
