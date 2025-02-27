import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
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
  height: number;
}

export const ModernChart = ({ Data, height }: ModernChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
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
          dot={{ r: 4 }}
        ></Area>
      </AreaChart>
    </ResponsiveContainer>
  );
};
