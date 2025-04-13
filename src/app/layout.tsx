import type { Metadata } from 'next';
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
// import { NavComponent } from '@/components/navigation/nav.component';
import { TopLinksComponent } from '@/components/navigation/toplinks.component';
import { ToastContainer } from 'react-toastify';
import { Suspense } from 'react';

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
    <Suspense>
      <html lang="en">
        <body className="font-roboto">
          <ToastContainer />
          <div className="min-h-screen flex">
            <TopLinksComponent />
            {/* <NavComponent /> */}
            <div className="flex-grow px-7 pt-14 pb-[108px] md:pt-20 md:px-12 xl:px-9 2xl:px-14 ml-0 xl:ml-[300px] bg-background">
              {children}
            </div>
          </div>
        </body>
      </html>
    </Suspense>
  );
}
