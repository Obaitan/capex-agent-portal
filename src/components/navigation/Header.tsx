'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Bars3CenterLeftIcon, DocumentPlusIcon } from '@heroicons/react/24/solid';
import { userData } from '@/lib/dummyData';
import { getUserInitials } from '@/lib/functions';
import Tooltip from '../general/Tooltip';

const HeaderComponent = () => {
  const newMessages = 2;

  return (
    <div className="bg-white h-16 shadow xl:shadow-sm absolute top-0 left-0 right-0 z-40 flex items-center px-6 md:px-10">
      <div className="flex justify-between items-center gap-5 w-full">
        <Image
          src={'/branding/paylaterhub-logo.svg'}
          alt="Paylaterhub logo"
          width={219}
          height={50}
          className="w-36 xl:hidden"
        />
        <p className="hidden xl:block text-[15px] font-semibold text-gray-800 uppercase">
          Agent Portal
        </p>

        <div className="flex items-center gap-3 md:gap-4 lg:gap-5 xl:gap-4">
          <div className="flex gap-2">
            <Tooltip content="Create Quote" position="bottom">
              <Link
                href="/quotes/create"
                className="bg-[#f2f2f2] w-9 h-9 rounded-full border border-gray-50 flex justify-center items-center hover:bg-primary-50 cursor-pointer"
              >
                <DocumentPlusIcon className="h-5 w-5 text-secondary/90" />
              </Link>
            </Tooltip>
            <Tooltip content="Notifications" position="bottom">
              <button className="bg-[#f2f2f2] w-9 h-9 rounded-full border border-gray-50 flex justify-center items-center hover:bg-primary-50 relative cursor-pointer">
                <Image
                  src="/shapes/notification.svg"
                  alt={
                    newMessages ? 'New notifications' : 'No new notifications'
                  }
                  width={24}
                  height={24}
                  priority
                />
                {newMessages > 0 && (
                  <span className="absolute -top-0.5 right-0 bg-red-600 text-white text-[9px] font-medium w-4 h-4 rounded-full flex justify-center items-center">
                    {newMessages}
                  </span>
                )}
              </button>
            </Tooltip>
          </div>

          <Link href="/settings" className="flex items-center gap-2.5">
            {userData?.profilePicture ? (
              <div className="relative h-9 w-9 overflow-hidden flex justify-center items-center rounded-full border border-disabled">
                <Image
                  src={userData.profilePicture}
                  alt="Profile picture"
                  fill
                  sizes="36px"
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="bg-gray-50 w-9 h-9 rounded-full flex justify-center items-center text-[22px] font-semibold">
                {getUserInitials()}
              </div>
            )}
          </Link>

          <button className="xl:hidden">
            <Bars3CenterLeftIcon className="h-7 w-7 text-gray-900" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;
