import { Metadata } from 'next';
import { columns } from '@/components/commissions/commissionColumns';
import { DataTable } from '@/components/ui/dataTable';

export const metadata: Metadata = {
  title: 'Commissions',
};

export default function CommissionsPage() {
  const data: {
    id: number;
    policyName: string;
    firstName: string;
    lastName: string;
    phone: string;
    sumAssured: number;
    startDate: string;
    commission: number;
    status: 'paid' | 'pending';
  }[] = [
    {
      id: 1,
      policyName: 'Target Savings Plan',
      firstName: 'John',
      lastName: 'Doe',
      phone: '0803 456 7890',
      sumAssured: 220000,
      startDate: '2023-01-01',
      commission: 11000,
      status: 'paid',
    },
    {
      id: 2,
      policyName: 'Capex Savers Plan',
      firstName: 'Samuel',
      lastName: 'Jackson',
      phone: '0805 426 3256',
      sumAssured: 350000,
      startDate: '2023-03-15',
      commission: 17500,
      status: 'pending',
    },
    {
      id: 3,
      policyName: 'Children Education Plan',
      firstName: 'Mary',
      lastName: 'Poppins',
      phone: '0802 123 4567',
      sumAssured: 520000,
      startDate: '2022-05-20',
      commission: 25100,
      status: 'pending',
    },
  ];

  return (
    <>
      <div className="bg-white shadow-sm rounded p-4 md:px-6 md:py-4 mb-1">
        <p className="font-medium uppercase">Commissions</p>
      </div>
      <DataTable columns={columns} data={data} />
    </>
  );
}
