import { Metadata } from 'next';
import { columns } from '@/components/quotes/quoteColumns';
import { DataTable } from '@/components/ui/dataTable';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Quotes',
};

export default function QuotesPage() {
  const data: {
    id: number;
    quoteNumber: string;
    policyName: string;
    firstName: string;
    lastName: string;
    phone: string;
    premium: number;
    duration: number;
  }[] = [
    {
      id: 1,
      quoteNumber: 'POL123456',
      policyName: 'Target Savings Plan',
      firstName: 'John',
      lastName: 'Doe',
      phone: '0803 456 7890',
      premium: 12000,
      duration: 4,
    },
    {
      id: 2,
      quoteNumber: 'POL122345',
      policyName: 'Capex Savers Plan',
      firstName: 'Samuel',
      lastName: 'Jackson',
      phone: '0805 426 3256',
      premium: 15000,
      duration: 3,
    },
    {
      id: 3,
      quoteNumber: 'POL132254',
      policyName: 'Children Education Plan',
      firstName: 'Mary',
      lastName: 'Poppins',
      phone: '0802 123 4567',
      premium: 20000,
      duration: 5,
    },
  ];

  return (
    <>
      <div className="bg-white shadow-sm rounded p-4 md:px-6 md:py-4 mb-1 flex items-center justify-between">
        <p className="font-medium uppercase">Quotes</p>
        <Link
          href="/quotes/create"
          className="bg-[#02364B] text-sm font-medium px-4 py-2 text-white rounded-full hover:opacity-85 transition-all duration-200"
        >
          New Quote
        </Link>
      </div>
      <DataTable columns={columns} data={data} />
    </>
  );
}
