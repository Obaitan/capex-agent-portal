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
    productName: string;
    firstName: string;
    lastName: string;
    monthlyPremium: number;
    totalPremium: number;
    sumAssured: number;
    term: number;
    status: 'active' | 'inactive';
  }[] = [
    {
      id: 1,
      policyNumber: 'POL123456',
      productName: 'Target Savings Plan',
      firstName: 'John',
      lastName: 'Doe',
      monthlyPremium: 12000,
      totalPremium: 320000,
      sumAssured: 375000,
      term: 4,
      status: 'active',
    },
    {
      id: 2,
      policyNumber: 'POL122345',
      productName: 'Capex Savers Plan',
      firstName: 'Samuel',
      lastName: 'Jackson',
      monthlyPremium: 15000,
      totalPremium: 540000,
      sumAssured: 600000,
      term: 5,
      status: 'active',
    },
    {
      id: 3,
      policyNumber: 'POL132254',
      productName: 'Children Education Plan',
      firstName: 'Mary',
      lastName: 'Poppins',
      monthlyPremium: 20000,
      totalPremium: 720000,
      sumAssured: 800000,
      term: 6,
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
