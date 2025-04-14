import { NavComponent } from '@/components/navigation/nav.component';
import { TopLinksComponent } from '@/components/navigation/toplinks.component';
import 'react-toastify/dist/ReactToastify.css';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <TopLinksComponent />
      <NavComponent />
      <div className="flex-grow px-7 pt-14 pb-[108px] md:pt-20 md:px-12 xl:px-9 2xl:px-14 ml-0 xl:ml-[245px] bg-background">
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-full">
              <Loader2 className="animate-spin w-8 h-8 text-secondary-200" />
            </div>
          }
        >
          {children}
        </Suspense>
      </div>
    </div>
  );
}
