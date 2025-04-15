import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="px-6 pt-14 md:py-20 md:px-12 xl:px-9 2xl:px-14 h-full">
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
