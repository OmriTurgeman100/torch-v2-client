import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

interface TimeSeries {
  value: number;
  time: string;
}

interface ModernChartProps {
  Data: TimeSeries[];
}

export const ModernChart = ({ Data }: ModernChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={Data}>
        <CartesianGrid strokeDasharray="5 5" />
        <YAxis />

        <XAxis dataKey="time" />
        <Tooltip />
        <Area
          type={"monotone"}
          stroke="blue"
          fill="#4361ee"
          dataKey="value"
        ></Area>
      </AreaChart>
    </ResponsiveContainer>
  );
};
