import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const clients = [
  {
    name: 'Femi Branch',
    plan: 'Capex Savers Plus',
    amount: '₦ 25,000',
    frequency: 'Monthly',
  },
  {
    name: 'Muyiwa Adebayo',
    plan: 'Capex Savers Plus',
    amount: '₦ 15,000',
    frequency: 'Monthly',
  },
  {
    name: 'Kayode Olofinlana',
    plan: 'Target Savers Plan',
    amount: '₦ 35,000',
    frequency: 'Monthly',
  },
  {
    name: 'Amina Lawal',
    plan: 'Capex Savers Plus',
    amount: '₦ 18,000',
    frequency: 'Monthly',
  },
];

const RecentCustomers = () => {
  return (
    <div className="px-6 md:px-8">
      <div className="flex items-center justify-between space-y-0 mb-7">
        <div>
          <h3 className="text-lg font-semibold">Recent Clients</h3>
          <p className="text-sm text-gray-500">Last 30 days</p>
        </div>
        <button className="bg-[#f6f6f6] text-primary text-medium text-sm px-5 py-2 rounded-full cursor-pointer">
          View Clients
        </button>
      </div>
      <div>
        <div className="space-y-4">
          {clients.map((client, index) => (
            <div key={index} className="flex items-center gap-4">
              <Avatar className="h-10 w-10">
                <div className="bg-gray-200 h-full w-full flex items-center justify-center text-sm font-semibold">
                  {client.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </div>
              </Avatar>
              <div className="flex-1">
                <h4 className="font-medium text-primary text-sm">{client.name}</h4>
                <p className="text-xs text-gray-500">{client.plan}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-primary text-sm">{client.amount}</p>
                <p className="text-xs text-gray-500">{client.frequency}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentCustomers;
