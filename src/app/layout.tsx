import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import Header from '@/components/header';
import BottomNav from '@/components/bottom-nav';
import { Toaster } from "@/components/ui/toaster"


export const metadata: Metadata = {
  title: 'Vidhi Gyan Sodh',
  description: 'Your gateway to legal knowledge.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700;900&family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body
        className={cn(
          'font-body antialiased',
          'flex min-h-screen flex-col'
        )}
      >
        <Header />
        <main className="flex-1 overflow-y-auto">{children}</main>
        <BottomNav />
        <Toaster />
      </body>
    </html>
  );
}
