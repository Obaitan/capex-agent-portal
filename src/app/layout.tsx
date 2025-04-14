import type { Metadata } from 'next';
import './globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--roboto',
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
        <>{children}</>
      </body>
    </html>
  );
}
