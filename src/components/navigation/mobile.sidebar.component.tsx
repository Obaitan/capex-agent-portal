'use client';

import { useState, ReactNode, useTransition } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  UserCircleIcon,
  Cog6ToothIcon,
  ChartBarIcon,
  DocumentDuplicateIcon,
  ChevronDownIcon,
  NewspaperIcon,
  UserGroupIcon,
  WrenchScrewdriverIcon,
  ListBulletIcon,
  CreditCardIcon,
  ChatBubbleBottomCenterTextIcon,
  XMarkIcon,
  Bars3Icon,
  ArrowLeftEndOnRectangleIcon,
  ArrowRightEndOnRectangleIcon,
  ClipboardDocumentListIcon,
  UserIcon,
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
  const hrefPath = href.split('/')[2];
  const pathnamePath = pathname.split('/')[2];

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-5 py-3.5 text-sm hover:bg-[#eeeeee97] hover:text-primary rounded-full ${className} ${
        hrefPath === pathnamePath
          ? 'font-medium text-primary bg-[#eeeeee97]'
          : 'font-normal text-[#ddd] bg-transparent'
      }`}
    >
      {icon}
      {children}
    </Link>
  );
};

export const MobileSidebarComponent = () => {
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [accountName, setAccountName] = useState<string | null>(null);
  const [open, setOpen] = useState(0);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleOpen = (value: any) => {
    setOpen(open === value ? 0 : value);
  };

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const handleLogout = async () => {
    startTransition(async () => {
      if (isLoggedIn) {
        /// Simulate a login process
      }
    });
  };
  const pathname = usePathname();

  return (
    <>
      <div></div>
    </>
  );
};
