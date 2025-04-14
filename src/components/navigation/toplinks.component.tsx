'use client';

import {
  ClipboardDocumentListIcon,
  // CreditCardIcon,
} from '@heroicons/react/24/solid';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const TopLinksComponent = () => {
  const pathname = usePathname();

  return (
    <div className="fixed z-40 top-0 left-0 right-0 h-14 md:h-20 bg-background w-full">
      <div className="fixed top-7 right-9 hidden xl:flex items-center gap-x-5">
        <Link
          href={'/console/quotes'}
          className={`flex items-center gap-x-2 text-sm hover:text-secondary ${
            pathname.split('/')[2] === 'quotes'
              ? 'text-secondary'
              : 'text-text-mid'
          }`}
        >
          <ClipboardDocumentListIcon className="w-[18px] h-[18px]" />
          Create Quote
        </Link>
      </div>
    </div>
  );
};
