import Link from 'next/link';
import { Tooltip, PieChart, Pie, Cell } from 'recharts';
import { TooltipProps } from 'recharts';

type PieTooltipPayload = {
  name: string;
  value: number;
};

// Sample data
const requestsData = [
  { name: 'December', value: 40 },
  { name: 'November', value: 32 },
  { name: 'October', value: 28 },
];

const COLORS = ['#02384D', '#14617F', '#82a2ad', '#15617f'];

// Custom Tooltip
const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const data = payload[0] as PieTooltipPayload; // Type assertion
    return (
      <div className="bg-white p-2 shadow-md rounded-md text-sm">
        <p className="text-gray-700 font-medium">{data.name}</p>
        <p className="text-gray-500">Value: {data.value}</p>
      </div>
    );
  }
  return null;
};

export default function DonutChartComponent() {
  return (
    <div>
      <Link
        href={'/quotes'}
        className="text-[##15617f] font-medium mb-5 inline-block"
      >
        Quotes
      </Link>
      <PieChart width={375} height={275}>
        <Pie
          data={requestsData}
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={88}
          fill="#8884d8"
          dataKey="value"
          label={({ name, value, midAngle, cx, cy }) => {
            const RADIAN = Math.PI / 180;
            const radius = 112; // Position outside the pie
            const x = cx + radius * Math.cos(-midAngle * RADIAN);
            const y = cy + radius * Math.sin(-midAngle * RADIAN);
            return (
              <text
                x={x}
                y={y}
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
                fontSize="13px"
                fontWeight="400"
              >
                <tspan x={x} dy="-0.4em" fill="#14617F">
                  {name}
                </tspan>
                <tspan x={x} dy="1.2em" fill="#667185">
                  {value}
                </tspan>
              </text>
            );
          }}
        >
          {requestsData.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
      </PieChart>
    </div>
  );
}
