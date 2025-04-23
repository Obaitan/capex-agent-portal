import { Metadata } from 'next';
import { columns } from '@/components/claims/claimColumns';
import { DataTable } from '@/components/ui/dataTable';

export const metadata: Metadata = {
  title: 'Claims',
};

export default function ClaimsPage() {
  const data: {
    id: number;
    policyNumber: string;
    policyName: string;
    firstName: string;
    lastName: string;
    phone: string;
    sumAssured: number;
    startDate: string;
    endDate: string;
    status: 'active' | 'elaspsed';
  }[] = [
    {
      id: 1,
      policyNumber: 'POL123456',
      policyName: 'Target Savings Plan',
      firstName: 'John',
      lastName: 'Doe',
      phone: '0803 456 7890',
      sumAssured: 240000,
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
      sumAssured: 450000,
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
      sumAssured: 375000,
      startDate: '2022-05-20',
      endDate: '2027-05-20',
      status: 'active',
    },
  ];

  return (
    <>
      <div className="bg-white shadow-sm rounded p-4 md:px-6 md:py-4 mb-1">
        <p className="font-medium uppercase">Claims</p>
      </div>
      <DataTable columns={columns} data={data} />
    </>
  );
}
