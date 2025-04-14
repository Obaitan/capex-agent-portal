'use client';

import { SidebarComponent } from './sidebar.component';
import { MobileSidebarComponent } from './mobile.sidebar.component';
import { useScreenSize } from '@/hooks/useScreenSize';

export const NavComponent = () => {
  const { width } = useScreenSize();
  return (
    <>{width < 1200 ? <MobileSidebarComponent /> : <SidebarComponent />}</>
  );
};
