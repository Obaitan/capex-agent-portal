'use client';

import { columns } from '@/components/clients/clientColumns';
import { DataTable } from '@/components/clients/clientDataTable';
import { useState } from 'react';
import PeriodFilter from '@/components/general/PeriodFilter';

export default function ClientsPage() {
  const [appliedRange, setAppliedRange] = useState<{ from?: Date; to?: Date }>(
    {}
  );

  type Payment = {
    id: string;
    amount: number;
    status: 'pending' | 'processing' | 'success' | 'failed';
    email: string;
  };

  const data: Payment[] = [
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'm@example.com',
    },
    {
      id: '489e1d42',
      amount: 125,
      status: 'processing',
      email: 'example@gmail.com',
    },
    // ...
  ];

  return (
    <>
    
      <div className="flex justify-end">
        <PeriodFilter
          appliedRange={appliedRange}
          setAppliedRange={setAppliedRange}
        />
      </div>
      <DataTable columns={columns} data={data} />
    </>
  );
}
