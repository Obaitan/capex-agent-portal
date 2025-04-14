'use client';

import { SidebarComponent } from './Sidebar';
import { MobileSidebarComponent } from './MobileSidebar';
import { useScreenSize } from '@/hooks/useScreenSize';

export const NavComponent = () => {
  const { width } = useScreenSize();
  return (
    <>{width < 1200 ? <MobileSidebarComponent /> : <SidebarComponent />}</>
  );
};
