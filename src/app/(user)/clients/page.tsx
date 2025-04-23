import { Metadata } from 'next';
import { columns } from '@/components/clients/clientColumns';
import { DataTable } from '@/components/ui/dataTable';

export const metadata: Metadata = {
  title: 'Clients',
};

export default function ClientsPage() {
  const data: {
    id: number;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    numberOfPolicies: number;
    dateOnboarded: string;
    status: 'active' | 'inactive';
  }[] = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      phone: '0803 456 7890',
      email: 'john.doe@example.com',
      numberOfPolicies: 3,
      dateOnboarded: '2023-01-15',
      status: 'inactive',
    },
    {
      id: 2,
      firstName: 'Samuel',
      lastName: 'Jackson',
      phone: '0805 426 3256',
      email: 'samuel.jackson@example.com',
      numberOfPolicies: 5,
      dateOnboarded: '2023-01-18',
      status: 'active',
    },
    {
      id: 3,
      firstName: 'Mary',
      lastName: 'Poppins',
      phone: '0802 123 4567',
      email: 'mary.poppins@example.com',
      numberOfPolicies: 4,
      dateOnboarded: '2023-02-12',
      status: 'active',
    },
  ];

  return (
    <>
      <div className="bg-white shadow-sm rounded p-4 md:px-6 md:py-4 mb-1">
        <p className="font-medium uppercase">Clients</p>
      </div>
      <DataTable columns={columns} data={data} />
    </>
  );
}
