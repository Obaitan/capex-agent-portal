import { ReactNode } from 'react';

export const PageFrameComponent = ({ children }: { children: ReactNode }) => {
  return <div className="py-4 md:pt-14 md:pb-0 h-full">{children}</div>;
};
