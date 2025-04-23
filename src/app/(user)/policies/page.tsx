import { Metadata } from 'next';
import { columns } from '@/components/policies/policyColumns';
import { DataTable } from '@/components/ui/dataTable';

export const metadata: Metadata = {
  title: 'Policies',
};

export default function PoliciesPage() {
  const data: {
    id: number;
    policyNumber: string;
    policyName: string;
    firstName: string;
    lastName: string;
    phone: string;
    premium: number;
    duration: number;
    startDate: string;
    endDate: string;
    status: 'active' | 'inactive';
  }[] = [
    {
      id: 1,
      policyNumber: 'POL123456',
      policyName: 'Target Savings Plan',
      firstName: 'John',
      lastName: 'Doe',
      phone: '0803 456 7890',
      premium: 12000,
      duration: 4,
      startDate: '2023-01-01',
      endDate: '2027-01-01',
      status: 'active',
    },
    {
      id: 2,
      policyNumber: 'POL122345',
      policyName: 'Capex Savers Plan',
      firstName: 'Samuel',
      lastName: 'Jackson',
      phone: '0805 426 3256',
      premium: 15000,
      duration: 3,
      startDate: '2023-03-15',
      endDate: '2026-03-15',
      status: 'active',
    },
    {
      id: 3,
      policyNumber: 'POL132254',
      policyName: 'Children Education Plan',
      firstName: 'Mary',
      lastName: 'Poppins',
      phone: '0802 123 4567',
      premium: 20000,
      duration: 5,
      startDate: '2022-05-20',
      endDate: '2027-05-20',
      status: 'active',
    },
  ];

  return (
    <>
      <div className="bg-white shadow-sm rounded p-4 md:px-6 md:py-4 mb-1">
        <p className="font-medium uppercase">Policies</p>
      </div>
      <DataTable columns={columns} data={data} />
    </>
  );
}
