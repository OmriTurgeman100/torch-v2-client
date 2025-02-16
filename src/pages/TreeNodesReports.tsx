import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetch_nodes_report } from "../services/Get-Nodes-Reports";
import { useAuthContext } from "../Context/UseAuthContext";
import { Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { node_colors } from "../utils/NodeColors";

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
  const [Data, setData] = useState<data | null>(null);
  const { id } = useParams();
  const { user } = useAuthContext();

  const get_reports_nodes = async () => {
    const response = await fetch_nodes_report(user.token, id);
    setData(response.data);
  };

  useEffect(() => {
    get_reports_nodes();
  }, [id]);

  return (
    <>
      {Data?.nodes && Data.nodes.length > 0 && (
        <div className="grid-container">
          {Data.nodes.map((node) => (
            <Link to={`/${node.node_id}`}>
              <Box
                key={node.node_id}
                className="card"
                sx={{
                  width: "200px",
                  height: "80px",
                  background: node_colors(node.status),
                  padding: "15px",
                  borderRadius: 1,
                  boxShadow: 5,
                }}
              >
                <Typography
                  variant="h4"
                  style={{
                    color: "white",
                    fontSize: "1.6rem",
                    letterSpacing: "1px",
                  }}
                >
                  {node.title}
                </Typography>

                <Typography
                  variant="h4"
                  style={{
                    color: "white",
                    fontSize: "1.0rem",
                    opacity: "50%",
                    letterSpacing: "1px",
                  }}
                >
                  {node.status}
                </Typography>
              </Box>
            </Link>
          ))}
        </div>
      )}
      {Data?.reports && Data.reports.length > 0 && (
        <div className="grid-container">
          {Data.reports.map((report) => (
            <Box
              key={report.id}
              className="card"
              sx={{
                width: "200px",
                height: "80px",
                background: "linear-gradient(135deg,rgb(77, 85, 189), #2575fc)",
                padding: "15px",
                borderRadius: 1,
                boxShadow: 5,
              }}
            >
              <Typography
                variant="h4"
                style={{
                  color: "white",
                  fontSize: "1.6rem",
                  letterSpacing: "1px",
                }}
              >
                {report.title}
              </Typography>

              <Typography
                variant="h4"
                style={{
                  color: "white",
                  fontSize: "1.0rem",
                  opacity: "50%",
                  letterSpacing: "1px",
                }}
              >
                {report.value}
              </Typography>
            </Box>
          ))}
        </div>
      )}

      {Data?.nodes?.length === 0 && Data?.reports?.length === 0 && (
        <Typography variant="h6" color="secondary">
          Nothing found
        </Typography>
      )}
    </>
  );
};
