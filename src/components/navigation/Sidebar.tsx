'use client';

import { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Cog6ToothIcon,
  ChartBarIcon,
  DocumentDuplicateIcon,
  UserGroupIcon,
  UserCircleIcon,
  ArrowRightEndOnRectangleIcon,
  ArrowLeftEndOnRectangleIcon,
  ClipboardDocumentListIcon,
  BuildingOffice2Icon,
  BanknotesIcon,
  ClipboardDocumentCheckIcon,
} from '@heroicons/react/24/solid';
import { Loader2 } from 'lucide-react';
import { userData } from '@/lib/dummyData';

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
          ? 'font-semibold text-primary bg-[#eeeeeea1]'
          : 'font-normal text-[#f3f3f3] bg-[#eeeeee26] border border-[#eeeeee3f]'
      }`}
    >
      {icon}
      {children}
    </Link>
  );
};

export const SidebarComponent = () => {
  const isLoggedIn = true; // Replace with actual authentication logic
  const isPending = false; // Replace with actual loading state

  async function handleLogout(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ): Promise<void> {
    event.preventDefault();
    try {
      // Simulate a logout process or call an API to log out
      console.log('Logging out...');
      // Example: await api.logout();
      window.location.href = '/auth/signin'; // Redirect to sign-in page after logout
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }

  return (
    <div className="fixed z-50 bottom-0 top-0 left-0 w-[245px] h-screen p-5 shadow-md bg-[linear-gradient(to_bottom,rgba(256,256,256,0.85),rgba(216,66,72,0.65),rgba(216,66,72,0.75),rgba(216,66,72,0.88),rgba(216,66,72,0.95)),url('/capex-images/sidebar-image.jpeg')] bg-cover bg-center flex flex-col overflow-y-auto">
      <div className="flex justify-center">
        <Image
          src="/capex-images/logo.png"
          width={210}
          height={38}
          alt="logo"
        />
      </div>

      {isLoggedIn && (
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
            href={'/claims'}
            icon={<ClipboardDocumentCheckIcon className="h-[18px] w-[18px]" />}
          >
            Claims
          </NavLink>
          <NavLink
            href={'/commissions'}
            icon={<BanknotesIcon className="h-[18px] w-[18px]" />}
          >
            Commissions
          </NavLink>
          <NavLink
            href={'/agency-desk'}
            icon={<BuildingOffice2Icon className="h-[18px] w-[18px]" />}
          >
            Agency Desk
          </NavLink>
          <NavLink
            href={'/settings'}
            icon={<Cog6ToothIcon className="h-[18px] w-[18px]" />}
          >
            Settings
          </NavLink>
        </div>
      )}

      <div className="py-2 mb-8 mt-auto text-sm">
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
          <div className="p-2 mt-3 text-[#fff]">
            <div className="flex items-center gap-2 mb-1">
              <UserCircleIcon className="h-5 w-5" />
              <p>
                {userData?.firstName} {userData?.lastName}
              </p>
            </div>
            <p className="text-xs">{userData?.email}</p>
          </div>
        )}
      </div>
    </div>
  );
};
