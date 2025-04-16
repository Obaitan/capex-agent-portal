'use client';

import BarChartComponent from './BarChart';
import PieChartComponent from './PieChart';
import NewCustomers from './NewCustomers';
import Link from 'next/link';
import {
  ArrowDownIcon,
  ArrowUpDownIcon,
  ArrowUpIcon,
  FileText,
  Users,
  ReceiptText,
  BanknoteArrowDown,
  FileWarning,
} from 'lucide-react';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  iconBg?: string;
}

const StatCard = ({
  icon,
  label,
  value,
  iconBg = 'bg-blue-50',
}: StatCardProps) => (
  <div className="flex items-center gap-3 bg-white shadow-sm rounded px-6 pt-5 pb-4 hover:shadow-md transition-all duration-500">
    <div className={`p-3 rounded-lg ${iconBg}`}>{icon}</div>
    <div>
      <p className="text-gray-800 font-semibold">{value}</p>
      <p className="text-sm text-gray-400">{label}</p>
    </div>
  </div>
);

const DashboardComponent = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-2">
        <StatCard
          icon={<FileText className="text-blue-600 h-5 w-5" />}
          label="Policies"
          value="185"
        />
        <StatCard
          icon={<Users className="text-purple-600 h-5 w-5" />}
          label="Clients"
          value="120"
          iconBg="bg-purple-50"
        />
        <StatCard
          icon={<BanknoteArrowDown className="text-green-600 h-5 w-5" />}
          label="Commission"
          value="₦ 240,000"
          iconBg="bg-green-50"
        />
        <StatCard
          icon={<ReceiptText className="text-orange-600 h-5 w-5" />}
          label="Open Quotes"
          value="42"
          iconBg="bg-orange-50"
        />
        <StatCard
          icon={<FileWarning className="text-red-600 h-5 w-5" />}
          label="Claims"
          value="16"
          iconBg="bg-red-50"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10 bg-white shadow-sm rounded px-6 pt-5 pb-4 mt-5 hover:shadow-md transition-all duration-500">
        <div className="mx-auto">
          <PieChartComponent />
        </div>
        <div className="md:col-span-2 md:border-r md:border-r-gray-50 lg:pr-10">
          <BarChartComponent />
        </div>
      </div>
      <hr className="my-10 border-gray-50" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-0 gap-y-10"></div>
    </>
  );
};

export default DashboardComponent;
