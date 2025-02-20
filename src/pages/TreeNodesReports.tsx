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
import IconButton from "@mui/material/IconButton";
import FlashlightOnIcon from "@mui/icons-material/FlashlightOn";
import FlashlightOffIcon from "@mui/icons-material/FlashlightOff";
import { set_node_excluded } from "../services/Set-Node-Excluded";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import { NodeSettingsComponent } from "../components/NodeSettings";

interface sub_nodes {
  description: string;
  excluded: string;
  node_id: number;
  parent: number | null;
  status: string;
  time: string;
  title: string;
}

interface reports {
  description: string;
  id: number;
  parent: number;
  report_id: string;
  time: string;
  title: string;
  value: number | null;
}

interface data {
  reports?: reports[];
  nodes?: sub_nodes[];
}

export const TreeNodesReports = () => {
  const [Data, setData] = useState<data | null>(null);
  const [reportId, setReportId] = useState<string | null>();
  const [excluded, setExclude] = useState<boolean | null>(null);
  const [NodeSettings, setNodeSettings] = useState<boolean>(false);
  const { id } = useParams();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const get_reports_nodes = async () => {
    const response = await fetch_nodes_report(user.token, id);

    setData(response.data);

    if (response.data.reports.length > 0) {
      setReportId(response.data.reports[0].report_id);
    }
  };

  const set_excluded = async (node_status: string, node_id: number) => {
    try {
      if (node_status === "false") {
        await set_node_excluded("true", node_id, user.token);

        setExclude(true);
      } else if (node_status === "true") {
        await set_node_excluded("false", node_id, user.token);
        setExclude(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    get_reports_nodes();

    const intervalId = setInterval(get_reports_nodes, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [id, excluded]);

  return (
    <>
      {Data?.nodes && Data.nodes.length > 0 && (
        <div>
          <div className="grid-container">
            {Data.nodes.map((node) => (
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
                  position: "relative",
                }}
              >
                <Link to={`/${node.node_id}`} key={node.node_id}>
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
                </Link>
                <IconButton
                  onClick={() => set_excluded(node.excluded, node.node_id)}
                  sx={{ left: "170px" }}
                >
                  {node.excluded == "false" ? (
                    <FlashlightOnIcon sx={{ color: "white" }} />
                  ) : (
                    <FlashlightOffIcon sx={{ color: "white" }} />
                  )}
                </IconButton>
              </Box>
            ))}
          </div>
          <ButtonGroup
            variant="contained"
            aria-label="Loading button group"
            sx={{ position: "absolute", bottom: 10, right: 10 }}
          >
            <Button onClick={() => navigate(`/display/node/rules/${id}`)}>
              Rules
            </Button>
            <Button onClick={() => navigate(`/submit/nodes/tree/${id}`)}>
              Nodes
            </Button>
            <Button loading loadingPosition="start" startIcon={<SaveIcon />}>
              Reports
            </Button>
          </ButtonGroup>

          <IconButton
            onClick={() => setNodeSettings(true)}
            sx={{
              position: "absolute",
              bottom: 70,
              right: 10,
              backgroundColor: "white",
              transition: "transform 0.3s ease, box-shadow 1s ease",
              "&:hover": {
                backgroundColor: "white",
                transform: "translateY(-15px)",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
              },
            }}
          >
            <SettingsSuggestIcon sx={{ color: "#4361ee", fontSize: 30 }} />
          </IconButton>
        </div>
      )}
      {Data?.reports && Data.reports.length > 0 && (
        <div>
          <div className="grid-container">
            {Data.reports.map((report) => (
              <Box
                key={report.report_id}
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
            <Button
              onClick={() =>
                navigate(`/display/report/rules/${id}/${reportId}`)
              }
            >
              Rules
            </Button>

            <Button loading loadingPosition="start" startIcon={<SaveIcon />}>
              Reports
            </Button>
          </ButtonGroup>
        </div>
      )}

      {Data?.nodes?.length === 0 && Data?.reports?.length === 0 && (
        <div>
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
        <IconButton
            onClick={() => setNodeSettings(true)}
            sx={{
              position: "absolute",
              bottom: 70,
              right: 10,
              backgroundColor: "white",
              transition: "transform 0.3s ease, box-shadow 1s ease",
              "&:hover": {
                backgroundColor: "white",
                transform: "translateY(-15px)",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
              },
            }}
          >
            <SettingsSuggestIcon sx={{ color: "#4361ee", fontSize: 30 }} />
          </IconButton>
        
        </div>
        
      )}

      {NodeSettings && Data?.nodes && (
        <NodeSettingsComponent
          closeSettings={() => setNodeSettings(false)}
          subNodes={Data.nodes}
          parent={id}
        />
      )}
    </>
  );
};
