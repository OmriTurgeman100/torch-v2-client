import { useParams } from "react-router-dom";

export const ReportRules = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>report_parent {id}</h1>
    </div>
  );
};
