'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ArrowDownNarrowWideIcon } from 'lucide-react';
import { format, subWeeks, subMonths } from 'date-fns';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { DayPicker, getDefaultClassNames } from 'react-day-picker';
import 'react-day-picker/style.css';
import { XMarkIcon } from '@heroicons/react/24/solid';

interface PeriodFilterProps {
  appliedRange: { from?: Date; to?: Date };
  setAppliedRange: (range: { from?: Date; to?: Date }) => void;
}

export default function PeriodFilter({
  appliedRange,
  setAppliedRange,
}: PeriodFilterProps) {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [isPickingEndDate, setIsPickingEndDate] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [showCustomPicker, setShowCustomPicker] = useState(false);

  const defaultClassNames = getDefaultClassNames();

  const applyPredefinedRange = (range: 'lastWeek' | 'lastMonth') => {
    const now = new Date();
    const from = range === 'lastWeek' ? subWeeks(now, 1) : subMonths(now, 1);
    setAppliedRange({ from, to: now });
    setShowCustomPicker(false);
    setIsPopoverOpen(false);
  };

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <button
          id="date"
          className={cn(
            'bg-white flex items-center gap-2 py-2 px-3 rounded-md border border-priary text-priary font-normal hover:opacity-80 text-[13px] cursor-pointer',
            !appliedRange.from && !appliedRange.to && 'bg-white'
          )}
          onClick={() => setIsPopoverOpen(!isPopoverOpen)}
        >
          <ArrowDownNarrowWideIcon className="w-[18px] h-[18px]" />
          {appliedRange.from ? (
            appliedRange.to ? (
              `${format(appliedRange.from, 'LLL dd, y')} - ${format(
                appliedRange.to,
                'LLL dd, y'
              )}`
            ) : (
              format(appliedRange.from, 'LLL dd, y')
            )
          ) : (
            <span>Period Filter</span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-2" align="end">
        {!showCustomPicker ? (
          <div className="space-y-0.5 text-sm">
            <button
              className="w-full text-gray-500 hover:!bg-primary/10 hover:text-primary text-left px-3 py-2 cursor-pointer"
              onClick={() => applyPredefinedRange('lastWeek')}
            >
              Last 7 Days
            </button>
            <button
              className="w-full text-gray-500 hover:!bg-primary/10 hover:text-primary text-left px-3 py-2 cursor-pointer"
              onClick={() => applyPredefinedRange('lastMonth')}
            >
              Last 30 Days
            </button>
            <button
              className="w-full text-gray-500 hover:!bg-primary/10 hover:text-primary text-left px-3 py-2 cursor-pointer"
              onClick={() => setShowCustomPicker(true)}
            >
              Custom Period
            </button>
            <button
              className="w-full flex gap-1 items-center text-red-600 hover:!text-red-600 hover:!bg-red-50 text-left px-3 py-2 cursor-pointer"
              onClick={() => {
                setStartDate(undefined);
                setEndDate(undefined);
                setAppliedRange({});
                setIsPickingEndDate(false);
                setShowCustomPicker(false);
                setIsPopoverOpen(false);
              }}
            >
              <XMarkIcon className="h-4 w-4" />
              Clear Filter
            </button>
          </div>
        ) : (
          <>
            <DayPicker
              mode="single"
              selected={isPickingEndDate ? endDate : startDate}
              onSelect={(date) => {
                if (!isPickingEndDate) {
                  setStartDate(date ?? undefined);
                  setEndDate(undefined);
                  setIsPickingEndDate(true);
                } else {
                  setEndDate(date ?? undefined);
                  setIsPickingEndDate(false);
                }
              }}
              classNames={{
                today: `bg-[#f6f6f6]`,
                selected: `bg-secondary-50 text-secondary-200 font-semibold text-base`,
                root: `${defaultClassNames.root} text-sm`,
                chevron: `fill-secondary-200`,
              }}
            />
            <p className="text-secondary-200 font-semibold mt-4 mb-2.5">
              {isPickingEndDate ? 'Pick An End Date' : 'Pick A Start Date'}
            </p>
            <div className="flex gap-3">
              <div className="w-full space-y-1">
                <p className="text-xs text-gray-300">Start Date</p>
                <div className="bg-[#f9f9f9] text-sm text-gray-500 px-3 h-9 flex items-center">
                  {startDate ? format(startDate, 'LLL dd, y') : ''}
                </div>
              </div>
              <div className="w-full space-y-1">
                <p className="text-xs text-gray-300">End Date</p>
                <div className="bg-[#f9f9f9] text-sm text-gray-500 px-3 h-9 flex items-center">
                  {endDate ? format(endDate, 'LLL dd, y') : ''}
                </div>
              </div>
            </div>
            <div className="flex gap-3 text-sm font-medium mt-5">
              <button
                className="w-full px-6 py-2 bg-secondary-200 text-white shadow rounded-md hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => {
                  setAppliedRange({ from: startDate, to: endDate });
                  setIsPopoverOpen(false);
                }}
                disabled={!startDate || !endDate}
              >
                Apply
              </button>
              <button
                className="px-6 py-2 border shadow border-secondary-200 text-secondary-200 rounded-md hover:opacity-80"
                onClick={() => {
                  setStartDate(undefined);
                  setEndDate(undefined);
                  setAppliedRange({});
                  setIsPickingEndDate(false);
                  setShowCustomPicker(false);
                  setIsPopoverOpen(false);
                }}
              >
                Reset
              </button>
            </div>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
}
