import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetch_nodes_report } from "../services/Get-Nodes-Reports";
import { useAuthContext } from "../Context/UseAuthContext";
import { Typography, Box } from "@mui/material";

type sub_nodes = {
  description: string;
  excluded: string;
  node_id: number;
  parent: number | null;
  status: string;
  time: string;
  title: string;
};

type reports = {
  description: string;
  id: number;
  parent: number;
  report_id: string;
  time: string;
  title: string;
  value: number | null;
};

type data = {
  reports?: reports[];
  nodes?: sub_nodes[];
};

export const TreeNodesReports = () => {
  const [nodesData, setNodesData] = useState<data | null>(null);
  const { id } = useParams();
  const { user } = useAuthContext();

  const get_reports_nodes = async () => {
    const response = await fetch_nodes_report(user.token, id);
    setNodesData(response.data);
  };

  useEffect(() => {
    get_reports_nodes();
  }, []);

  return (
    <Box>
      {nodesData?.reports && nodesData.reports.length > 0 && (
        <Typography variant="h6" color="primary">
          Reports found
        </Typography>
      )}
      {nodesData?.nodes && nodesData.nodes.length > 0 && (
        <Typography variant="h6" color="secondary">
          Nodes found
        </Typography>
      )}
      {nodesData?.nodes?.length === 0 && nodesData?.reports?.length === 0 && (
        <Typography variant="h6" color="secondary">
          Nothing found
        </Typography>
      )}
    </Box>
  );
};
