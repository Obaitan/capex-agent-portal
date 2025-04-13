// 'use client';

// import { useState, ReactNode, useTransition } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { usePathname, useRouter } from 'next/navigation';
// import {
//   Card,
//   List,
//   Accordion,
//   AccordionHeader,
//   AccordionBody,
//   Drawer,
//   Spinner,
// } from '@material-tailwind/react';
// import {
//   UserCircleIcon,
//   Cog6ToothIcon,
//   ChartBarIcon,
//   DocumentDuplicateIcon,
//   ChevronDownIcon,
//   NewspaperIcon,
//   UserGroupIcon,
//   WrenchScrewdriverIcon,
//   ListBulletIcon,
//   CreditCardIcon,
//   ChatBubbleBottomCenterTextIcon,
//   XMarkIcon,
//   Bars3Icon,
//   ArrowLeftEndOnRectangleIcon,
//   ArrowRightEndOnRectangleIcon,
//   ClipboardDocumentListIcon,
//   UserIcon,
// } from '@heroicons/react/24/solid';
// import { useAuth } from '@capex/context/auth.context';
// import { revalidateRetailPlansPath } from '@capex/services/revalidations';

// interface NavLinkProps {
//   href: string;
//   icon: ReactNode;
//   children: ReactNode;
//   className?: string;
// }

// export const NavLink = ({ href, icon, children, className }: NavLinkProps) => {
//   const pathname = usePathname();
//   const hrefPath = href.split('/')[2];
//   const pathnamePath = pathname.split('/')[2];

//   return (
//     <Link
//       href={href}
//       className={`flex items-center gap-3 px-5 py-3.5 text-sm hover:bg-[#eeeeee97] hover:text-primary rounded-full ${className} ${
//         hrefPath === pathnamePath
//           ? 'font-medium text-primary bg-[#eeeeee97]'
//           : 'font-normal text-[#ddd] bg-transparent'
//       }`}
//     >
//       {icon}
//       {children}
//     </Link>
//   );
// };

// export const MobileSidebarComponent = () => {
//   const { loading, isLoggedIn, email, accountName } = useAuth();
//   const [open, setOpen] = useState(0);
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const router = useRouter();
//   const [isPending, startTransition] = useTransition();

//   const handleOpen = (value: any) => {
//     setOpen(open === value ? 0 : value);
//   };

//   const openDrawer = () => setIsDrawerOpen(true);
//   const closeDrawer = () => setIsDrawerOpen(false);

//   const handleLogout = async () => {
//     startTransition(async () => {
//       if (isLoggedIn) {
//         await fetch('/api/auth/signout');
//         await revalidateRetailPlansPath();
//         router.push('/auth/signin');
//       }
//     });
//   };
//   const pathname = usePathname();

//   return (
//     <>
//       <Drawer open={isDrawerOpen} onClose={closeDrawer}>
//         <Card className="fixed z-50 bottom-0 top-0 left-0 h-full w-[300px] p-5 shadow-md rounded-none bg-[linear-gradient(to_bottom,rgba(256,256,256,1),rgba(2,56,77,0.73),rgba(1,51,70,0.96),rgba(1,50,69,0.95),rgba(1,53,74,0.95)),url('/img/sidebar-image.jpeg')] bg-cover bg-center overflow-y-auto">
//           <div className="mt-2 flex justify-center">
//             <Image src="/img/LOGO.png" width={210} height={38} alt="logo" />
//           </div>

//           {loading ? (
//             <div className="flex items-center justify-center h-full">
//               <Spinner className="h-6 w-6" />
//             </div>
//           ) : (
//             <>
//               {isLoggedIn && (
//                 <List className="mt-9">
//                   <NavLink
//                     href={'/console/'}
//                     icon={<ChartBarIcon className="h-4 w-4" />}
//                   >
//                     Dashboard
//                   </NavLink>
//                   <NavLink
//                     href={'/console/policies'}
//                     icon={<DocumentDuplicateIcon className="h-4 w-4" />}
//                   >
//                     Policies
//                   </NavLink>
//                   <NavLink
//                     href={'/console/pay-premium'}
//                     icon={<CreditCardIcon className="h-4 w-4" />}
//                   >
//                     Pay Premium
//                   </NavLink>
//                   <NavLink
//                     href={'/console/claims'}
//                     icon={<NewspaperIcon className="h-4 w-4" />}
//                   >
//                     My Claims
//                   </NavLink>
//                   <NavLink
//                     href={'/console/self-service'}
//                     icon={<UserCircleIcon className="h-4 w-4" />}
//                   >
//                     Self Service
//                   </NavLink>
//                   <NavLink
//                     href={'/console/referrals'}
//                     icon={<UserGroupIcon className="h-4 w-4" />}
//                   >
//                     Referrals
//                   </NavLink>
//                   <NavLink
//                     href={'/console/contact-centre'}
//                     icon={
//                       <ChatBubbleBottomCenterTextIcon className="h-4 w-4" />
//                     }
//                   >
//                     Contact Centre
//                   </NavLink>
//                   <NavLink
//                     href={'/console/settings'}
//                     icon={<Cog6ToothIcon className="h-4 w-4" />}
//                   >
//                     Settings
//                   </NavLink>
//                 </List>
//               )}
//               <div className="p-2 my-4 h-full flex flex-col justify-end text-sm">
//                 {isLoggedIn && (
//                   <div className="p-2 mt-3 text-[#bbb]">
//                     <div className="flex items-center gap-2 mb-1">
//                       <UserIcon className="h-3.5 w-4" />
//                       <p>{accountName}</p>
//                     </div>
//                     <p className="text-xs">{email}</p>
//                   </div>
//                 )}
//               </div>
//             </>
//           )}
//         </Card>
//       </Drawer>
//       <div className="bg-white fixed inset-0 bottom-0 px-8 h-[68px] md:h-[72px] mt-auto shadow-md border-t border-t-#ddd z-50">
//         <div className="flex justify-between md:justify-evenly items-center w-full h-full text-[11px] md:text-xs">
//           <Link href={isLoggedIn ? '#' : '/auth/signin'}>
//             <button
//               onClick={handleLogout}
//               className="flex flex-col items-center gap-1 text-text-mid"
//             >
//               {isLoggedIn && (
//                 <>
//                   <ArrowLeftEndOnRectangleIcon className="h-6 w-6" />
//                   Log Out
//                 </>
//               )}
//               {!isLoggedIn && (
//                 <>
//                   <ArrowRightEndOnRectangleIcon className="h-6 w-6" />
//                   Sign In
//                 </>
//               )}
//             </button>
//           </Link>
//           <Link
//             href={'/products'}
//             className={`flex flex-col items-center gap-1 hover:text-secondary ${
//               pathname.split('/')[2] === 'products'
//                 ? 'text-secondary'
//                 : 'text-text-mid'
//             }`}
//           >
//             <CreditCardIcon className="w-6 h-6" />
//             Buy Insurance
//           </Link>
//           <Link
//             href={'/console/quotes'}
//             className={`flex flex-col items-center gap-1 hover:text-secondary ${
//               pathname.split('/')[2] === 'quotes'
//                 ? 'text-secondary'
//                 : 'text-text-mid'
//             }`}
//           >
//             <ClipboardDocumentListIcon className="w-6 h-6" />
//             Quotes
//           </Link>

//           <button
//             onClick={openDrawer}
//             className="flex flex-col items-center gap-1 text-text-mid"
//           >
//             {isDrawerOpen ? (
//               <XMarkIcon className="h-6 w-6" />
//             ) : (
//               <Bars3Icon className="h-6 w-6" />
//             )}
//             Menu
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };
