import { useState, useEffect } from "react";
import { get_graph_data_report } from "../services/Get-Report-Graph";
import { toast, ToastContainer } from "react-toastify";
import { Bounce } from "react-toastify";
import { useAuthContext } from "../Context/UseAuthContext";
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

interface ReportProps {
  report_id: string | null | undefined;
  handle_close_graph: () => void;
}

interface TimeSeriesGraphData {
  value: number;
  time: string;
}

export const ReportGraph = ({ report_id, handle_close_graph }: ReportProps) => {
  const { user } = useAuthContext();
  const [ReportTimeSeriesData, setReportTimeSeriesData] = useState<
    TimeSeriesGraphData[]
  >([]);
  const fetch_report_graph = async () => {
    try {
      const response = await get_graph_data_report(user.token, report_id, '2 days');

      setReportTimeSeriesData(response.time_series_data);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetch_report_graph();
  }, []);

  return (
    <div>
      <div>
        <AreaChart width={1000} height={500} data={ReportTimeSeriesData}>
          <Area type="monotone" dataKey="value" />
        </AreaChart>
      </div>

      <h1>{report_id}</h1>

      <button onClick={handle_close_graph}>close</button>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </div>
  );
};
