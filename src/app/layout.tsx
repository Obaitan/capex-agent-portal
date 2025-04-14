import type { Metadata } from 'next';
import './globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Roboto } from 'next/font/google';
import { TopLinksComponent } from '@/components/navigation/TopLinks';
import { NavComponent } from '@/components/navigation/Nav';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'Capital Express Insurance Agent Portal',
  description: 'Agents Business Management Portal',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} font-sans`}>
        <ToastContainer />
        <div className="bg-background min-h-screen">
          <TopLinksComponent />
          <NavComponent />
          <div className="flex-grow px-7 pt-14 pb-[108px] md:pt-20 md:px-12 xl:px-9 2xl:px-14 ml-0 xl:ml-[245px]">
            <Suspense
              fallback={
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="animate-spin w-8 h-8 text-blue-600" />
                </div>
              }
            >
              {children}
            </Suspense>
          </div>
        </div>
      </body>
    </html>
  );
}
