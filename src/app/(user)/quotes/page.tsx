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
    productName: string;
    firstName: string;
    lastName: string;
    phone: string;
    monthlyPremium: number;
    sumAssured: number;
    term: number;
  }[] = [
    {
      id: 1,
      quoteNumber: 'POL123456',
      productName: 'Target Savings Plan',
      firstName: 'John',
      lastName: 'Doe',
      phone: '0803 456 7890',
      monthlyPremium: 12000,
      sumAssured: 200000,
      term: 5,
    },
    {
      id: 2,
      quoteNumber: 'POL122345',
      productName: 'Capex Savers Plan',
      firstName: 'Samuel',
      lastName: 'Jackson',
      phone: '0805 426 3256',
      monthlyPremium: 15000,
      sumAssured: 300000,
      term: 4,
    },
    {
      id: 3,
      quoteNumber: 'POL132254',
      productName: 'Children Education Plan',
      firstName: 'Mary',
      lastName: 'Poppins',
      phone: '0802 123 4567',
      monthlyPremium: 20000,
      sumAssured: 500000,
      term: 10,
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
