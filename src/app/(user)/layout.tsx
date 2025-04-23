import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import HeaderComponent from '@/components/navigation/Header';

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative px-6 pt-[104px] md:pb-16 md:px-10 h-full bg-[#f8f8f9]">
      <HeaderComponent/>
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
  );
};

export default AppLayout;
