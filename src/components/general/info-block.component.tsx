import { ReactNode } from 'react';

export const InfoBlockComponent = ({
  icon,
  label,
  value,
  className,
}: {
  icon: ReactNode;
  label: string;
  value: number | string;
  className?: string | null | undefined;
}) => {
  return (
    <div
      className={`bg-white flex md:items-center gap-x-2.5 md:gap-x-3.5 2xl:gap-x-3 rounded-lg md:rounded-xl p-3 md:py-4 md:px-6 xl:px-5 2xl:px-6 shadow ${className}`}
    >
      <div className="flex items-center justify-center rounded-2xl bg-[#f8f8f9] h-10 w-10 md:h-12 md:w-12">
        {icon}
      </div>
      <div>
        <p className="text-sm lg:text-xs 2xl:text-sm font-medium text-primary">{label}</p>
        <p className="text-base md:text-[17px] xl:text-base 2xl:text-[17px] mt-0.5 text-text-darker">
          {value}
        </p>
      </div>
    </div>
  );
};
