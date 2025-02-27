interface ReportProps {
  report_id: string | null | undefined;
  handle_close_graph: () => void;
}

export const ReportGraph = ({ report_id, handle_close_graph }: ReportProps) => {
  return (
    <div>
      <h1>{report_id}</h1>

      <button onClick={handle_close_graph}>close</button>
    </div>
  );
};
