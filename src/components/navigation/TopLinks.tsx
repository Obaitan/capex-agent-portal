'use client';

import { ClipboardDocumentListIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const TopLinksComponent = () => {
  const pathname = usePathname();

  return (
    <div className="fixed z-40 top-0 left-0 right-0 h-14 md:h-20 w-full">
      <div className="fixed top-6 right-9 hidden xl:flex items-center gap-x-5">
        <Link
          href={'/quotes/create'}
          className={`flex items-center gap-x-2 text-sm hover:text-[#8A2121] ${
            pathname.split('/')[1] === 'quotes'
              ? 'text-[#8A2121]'
              : 'text-gray-700'
          }`}
        >
          <ClipboardDocumentListIcon className="w-[18px] h-[18px]" />
          Create Quote
        </Link>
      </div>
    </div>
  );
};
