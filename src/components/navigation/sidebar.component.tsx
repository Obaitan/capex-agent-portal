'use client';

import { useState, ReactNode, useTransition } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Cog6ToothIcon,
  ChartBarIcon,
  DocumentDuplicateIcon,
  UserGroupIcon,
  CreditCardIcon,
  UserIcon,
  ArrowRightEndOnRectangleIcon,
  ArrowLeftEndOnRectangleIcon,
  ClipboardDocumentListIcon,
} from '@heroicons/react/24/solid';
import { Loader2 } from 'lucide-react';

interface NavLinkProps {
  href: string;
  icon: ReactNode;
  children: ReactNode;
  className?: string;
}

export const NavLink = ({ href, icon, children, className }: NavLinkProps) => {
  const pathname = usePathname();
  const hrefPath = href.split('/')[1];
  const pathnamePath = pathname.split('/')[1];

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-5 py-3 text-sm hover:bg-[#eeeeee97] hover:text-primary rounded-full ${className} ${
        hrefPath === pathnamePath
          ? 'font-semibold text-primary bg-[#eeeeee97]'
          : 'font-normal text-[#ddd] bg-transparent'
      }`}
    >
      {icon}
      {children}
    </Link>
  );
};

export const SidebarComponent = () => {
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [accountName, setAccountName] = useState<string | null>(null);
  const [open, setOpen] = useState(0);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleOpen = (value: any) => {
    setOpen(open === value ? 0 : value);
  };

  const handleLogout = async () => {
    startTransition(async () => {
      if (isLoggedIn) {
        /// Simulate a login process
      }
    });
  };
  return (
    <div className="fixed z-50 bottom-0 top-0 left-0 w-[245px] h-screen p-5 shadow-md bg-[linear-gradient(to_bottom,rgba(256,256,256,1),rgba(216,66,72,0.59),rgba(216,66,72,0.75),rgba(216,66,72,0.88),rgba(216,66,72,0.95)),url('/capex-images/sidebar-image.jpeg')] bg-cover bg-center flex flex-col overflow-y-auto">
      <div className="mt-2 flex justify-center">
        <Image
          src="/capex-images/logo.png"
          width={210}
          height={38}
          alt="logo"
        />
      </div>

      <div className="mt-9 space-y-1 flex-grow">
        <NavLink
          href={'/dashboard'}
          icon={<ChartBarIcon className="h-[18px] w-[18px]" />}
        >
          Dashboard
        </NavLink>
        <NavLink
          href={'/clients'}
          icon={<UserGroupIcon className="h-[18px] w-[18px]" />}
        >
          Clients
        </NavLink>
        <NavLink
          href={'/policies'}
          icon={<DocumentDuplicateIcon className="h-[18px] w-[18px]" />}
        >
          Policies
        </NavLink>
        <NavLink
          href={'/quotes'}
          icon={<ClipboardDocumentListIcon className="h-[18px] w-[18px]" />}
        >
          Quotes
        </NavLink>
        <NavLink
          href={'/commissions'}
          icon={<CreditCardIcon className="h-[18px] w-[18px]" />}
        >
          Commissions
        </NavLink>
        <NavLink
          href={'/settings'}
          icon={<Cog6ToothIcon className="h-[18px] w-[18px]" />}
        >
          Settings
        </NavLink>
      </div>

      <div className="py-2 my-4 text-sm">
        <Link
          href={isLoggedIn ? '#' : '/auth/signin'}
          onClick={handleLogout}
          className="bg-[#eeeeee97] w-full flex items-center gap-3 px-5 py-3 text-primary rounded-full hover:bg-[#eeeeee7c] font-medium"
        >
          {isLoggedIn && <ArrowLeftEndOnRectangleIcon className="h-5 w-5" />}
          {!isLoggedIn && <ArrowRightEndOnRectangleIcon className="h-5 w-5" />}
          {isPending ? (
            <Loader2 className="h-4 w-4" />
          ) : isLoggedIn ? (
            'Log out'
          ) : (
            'Sign In'
          )}
        </Link>
        {isLoggedIn && (
          <div className="p-2 mt-3 text-[#bbb]">
            <div className="flex items-center gap-2 mb-1">
              <UserIcon className="h-3.5 w-4" />
              <p>{accountName}</p>
            </div>
            <p className="text-xs">{email}</p>
          </div>
        )}
      </div>
    </div>
  );
};
