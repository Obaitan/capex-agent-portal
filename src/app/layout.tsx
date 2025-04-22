import type { Metadata } from 'next';
import './globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Roboto } from 'next/font/google';
import { NavComponent } from '@/components/navigation/Nav';

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
      <body className={`${roboto.variable}`}>
        <ToastContainer />
        <NavComponent />
        <div className="ml-0 xl:ml-[245px] flex-grow overflow-y-auto h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
