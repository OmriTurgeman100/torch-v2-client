import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetch_nodes_report } from "../services/Get-Nodes-Reports";
import { useAuthContext } from "../Context/UseAuthContext";
import { Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { node_colors } from "../utils/NodeColors";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const get_reports_nodes = async () => {
    const response = await fetch_nodes_report(user.token, id);
    setData(response.data);
  };

  useEffect(() => {
    get_reports_nodes();

    const intervalId = setInterval(get_reports_nodes, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [id]);

  return (
    <>
      {Data?.nodes && Data.nodes.length > 0 && (
        <div>
          <div className="grid-container">
            {Data.nodes.map((node) => (
              <Link to={`/${node.node_id}`} key={node.node_id}>
                <Box
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
          <ButtonGroup
            variant="contained"
            aria-label="Loading button group"
            sx={{ position: "absolute", bottom: 10, right: 10 }}
          >
            <Button onClick={() => navigate(`/submit/node/rules/${id}`)}>
              Rules
            </Button>
            <Button onClick={() => navigate(`/submit/nodes/tree/${id}`)}>
              Nodes
            </Button>
            <Button loading loadingPosition="start" startIcon={<SaveIcon />}>
              Reports
            </Button>
          </ButtonGroup>
        </div>
      )}
      {Data?.reports && Data.reports.length > 0 && (
        <div>
          <div className="grid-container">
            {Data.reports.map((report) => (
              <Link to={`/report/rules/${report.parent}`}>
                <Box
                  key={report.id}
                  className="card"
                  sx={{
                    width: "200px",
                    height: "80px",
                    background:
                      "linear-gradient(135deg,rgb(77, 85, 189), #2575fc)",
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
              </Link>
            ))}
          </div>
          <ButtonGroup
            variant="contained"
            aria-label="Loading button group"
            sx={{ position: "absolute", bottom: 10, right: 10 }}
          >
            <Button loading loadingPosition="start" startIcon={<SaveIcon />}>
              Nodes
            </Button>
            <Button onClick={() => navigate(`/submit/node/rules/${id}`)}>
              Rules
            </Button>

            <Button loading loadingPosition="start" startIcon={<SaveIcon />}>
              Reports
            </Button>
          </ButtonGroup>
        </div>
      )}

      {Data?.nodes?.length === 0 && Data?.reports?.length === 0 && (
        <ButtonGroup
          variant="contained"
          aria-label="Loading button group"
          sx={{ position: "absolute", bottom: 10, right: 10 }}
        >
          <Button loading loadingPosition="start" startIcon={<SaveIcon />}>
            Rules
          </Button>
          <Button onClick={() => navigate(`/submit/nodes/tree/${id}`)}>
            Nodes
          </Button>
          <Button onClick={() => navigate(`/reports/menu/tree/${id}`)}>
            Reports
          </Button>
        </ButtonGroup>
      )}
    </>
  );
};
