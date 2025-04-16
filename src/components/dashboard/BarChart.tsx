import Link from 'next/link';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import { TooltipProps } from 'recharts';

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<number, string>) => {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="bg-white p-2 rounded shadow-md text-sm">
      <p className="text-gray-700 font-medium">{label}</p>
      {payload.map((entry, index) => (
        <p key={index} className="text-gray-500 py-0.5">
          {entry.name}: <span className="font-bold">{entry.value}</span>
        </p>
      ))}
    </div>
  );
};

import { LegendProps } from 'recharts';

const CustomLegend = ({ payload }: LegendProps) => {
  if (!payload || payload.length === 0) return null;
  return (
    <div className="flex flex-wrap space-x-4 justify-center mt-4">
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center space-x-1.5">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          ></div>
          <span className="text-[#667185] text-[13px]">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

// Sample data
const applicationsData = [
  { month: 'Jan', 2024: 600, 2023: 200 },
  { month: 'Feb', 2024: 400, 2023: 150 },
  { month: 'Mar', 2024: 620, 2023: 300 },
  { month: 'Apr', 2024: 450, 2023: 250 },
  { month: 'May', 2024: 500, 2023: 270 },
  { month: 'Jun', 2024: 550, 2023: 290 },
  { month: 'Jul', 2024: 800, 2023: 400 },
  { month: 'Aug', 2024: 780, 2023: 390 },
  { month: 'Sep', 2024: 600, 2030: 350 },
  { month: 'Oct', 2024: 700, 2023: 370 },
  { month: 'Nov', 2024: 650, 2023: 360 },
  { month: 'Dec', 2024: 400, 2023: 250 },
];

export default function BarChartComponent() {
  return (
    <div>
      <Link
        href={'/commissions'}
        className="text-[##15617f] font-medium mb-5 inline-block"
      >
        Commissions
      </Link>
      <div className="w-full h-[275px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={applicationsData}
            barCategoryGap={0}
            barGap={6}
            style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
          >
            <XAxis
              dataKey="month"
              tick={{ fontSize: 13, fill: '#98A0AD' }}
              axisLine={{ stroke: '#D0D3D9' }}
              tickLine={{ stroke: '#D0D3D9' }}
            />
            <YAxis
              tick={{ fontSize: 13, fill: '#98A0AD' }}
              axisLine={{ stroke: '#D0D3D9' }}
              tickLine={{ stroke: '#D0D3D9' }}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: 'transparent' }}
            />
            <Legend content={<CustomLegend />} />
            <Bar dataKey="2024" fill="#14617F" name="Year 2024" barSize={12} />
            <Bar dataKey="2023" fill="#D8D9DB" name="Year 2023" barSize={12} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
