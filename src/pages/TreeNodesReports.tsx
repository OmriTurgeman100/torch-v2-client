import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetch_nodes_report } from "../services/Get-Nodes-Reports";
import { useAuthContext } from "../hooks/UseAuthContext";
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
import DeleteIcon from "@mui/icons-material/Delete";
import { delete_node } from "../services/Delete-Node";
import { ToastContainer } from "react-toastify";
import { Bounce } from "react-toastify";
import { toast } from "react-toastify";
import { detach_report } from "../services/Detach-Report";
import DescriptionIcon from "@mui/icons-material/Description";
import { NodeDescription } from "../components/NodeDescription";
import CommentIcon from "@mui/icons-material/Comment";
import { NodeComments } from "../components/NodeComments";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import { ReportGraph } from "../components/ReportGraph";
import AccountTreeIcon from "@mui/icons-material/AccountTree";

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
  const [nodeId, setNodeId] = useState<number | null>();
  const [excluded, setExclude] = useState<boolean | null>(null);
  const [NodeSettings, setNodeSettings] = useState<boolean>(false);
  const [DisplayDesc, setDisplayDesc] = useState<boolean>(false);
  const [DisplayComments, setDisplayComments] = useState<boolean>(false);
  const [DisplayGraph, setDisplayGraph] = useState<boolean>(false);
  const { id } = useParams();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const get_reports_nodes = async () => {
    try {
      const response = await fetch_nodes_report(user.token, id);

      setData(response.data);

      if (response.data.reports.length > 0) {
        setReportId(response.data.reports[0].report_id);
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const set_excluded = async (node_status: string, node_id: number) => {
    try {
      if (node_status === "false") {
        await set_node_excluded("true", node_id, user.token);

        setExclude(true);

        toast.success("Node is excluded!", {
          style: {
            backgroundColor: "#0047AB",
            color: "white",
          },
        });
      } else if (node_status === "true") {
        await set_node_excluded("false", node_id, user.token);
        setExclude(false);

        toast.success("Node is unexcluded!", {
          style: {
            backgroundColor: "#0047AB",
            color: "white",
          },
        });
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const handle_delete_node = async (node_id: number) => {
    try {
      await delete_node(node_id, user.token);

      toast.success("Node has been deleted!", {
        style: {
          backgroundColor: "#0047AB",
          color: "white",
        },
      });
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const handle_detach_report = async (report_id: string) => {
    try {
      await detach_report(report_id, user.token);
      toast.success("Report has been removed!", {
        style: {
          backgroundColor: "#0047AB",
          color: "white",
        },
      });
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  function handle_open_view_description(node_id: number): void {
    try {
      setNodeId(node_id);
      setNodeSettings(false);
      setDisplayComments(false);
      setDisplayDesc(true);
    } catch (error) {
      console.log("Error in handle_open_view_description:", error);
    }
  }

  function handle_close_view_description(): void {
    try {
      setNodeId(null);
      setDisplayDesc(false);
    } catch (error) {
      console.log("Error in handle_close_view_description:", error);
    }
  }

  function handle_display_node_settings(): void {
    try {
      setDisplayDesc(false);
      setDisplayComments(false);
      setNodeSettings(true);
    } catch (error) {
      console.log("Error in handle_display_node_settings:", error);
    }
  }

  function handle_display_comments(node_id: number): void {
    try {
      setNodeId(node_id);
      setDisplayDesc(false);
      setNodeSettings(false);
      setDisplayComments(true);
    } catch (error) {
      console.log("Error in handle_display_comments:", error);
    }
  }

  function handle_close_comments(): void {
    try {
      setNodeId(null);
      setDisplayComments(false);
    } catch (error) {
      console.log("Error in handle_close_comments:", error);
    }
  }

  function handle_close_graph(): void {
    try {
      setDisplayGraph(false);
    } catch (error) {
      console.log("Error in handle_close_graph:", error);
    }
  }

  useEffect(() => {
    get_reports_nodes();
    handle_close_view_description();
    handle_close_comments();
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
                  sx={{ left: "190px", bottom: "0px", position: "absolute" }}
                >
                  {node.excluded == "false" ? (
                    <FlashlightOnIcon sx={{ color: "white" }} />
                  ) : (
                    <FlashlightOffIcon sx={{ color: "white" }} />
                  )}
                </IconButton>

                <IconButton
                  onClick={() => handle_delete_node(node.node_id)}
                  sx={{ left: "190px", bottom: "70px", position: "absolute" }}
                >
                  <DeleteIcon sx={{ color: "white", opacity: "50%" }} />
                </IconButton>

                <IconButton
                  onClick={() => handle_open_view_description(node.node_id)}
                  sx={{ left: "190px", bottom: "35px", position: "absolute" }}
                >
                  <DescriptionIcon sx={{ color: "white", opacity: "50%" }} />
                </IconButton>

                <IconButton
                  onClick={() => handle_display_comments(node.node_id)}
                  sx={{ left: "160px", bottom: "0px", position: "absolute" }}
                >
                  <CommentIcon sx={{ color: "white", opacity: "50%" }} />
                </IconButton>

                <IconButton
                  onClick={() => navigate(`/view/hierarchy/${node.node_id}`)}
                  sx={{ left: "160px", bottom: "35px", position: "absolute" }}
                >
                  <AccountTreeIcon sx={{ color: "white", opacity: "50%" }} />
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
            onClick={handle_display_node_settings}
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
                  position: "relative",
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

                <IconButton
                  onClick={() => handle_detach_report(report.report_id)}
                  sx={{ left: "190px", bottom: "70px", position: "absolute" }}
                >
                  <DeleteIcon sx={{ color: "white", opacity: "50%" }} />
                </IconButton>

                <IconButton
                  onClick={() => setDisplayGraph(true)}
                  sx={{
                    color: "white",
                    left: "190px",
                    bottom: "0px",
                    position: "absolute",
                  }}
                >
                  <AutoGraphIcon />
                </IconButton>
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

      {DisplayDesc && (
        <NodeDescription
          handle_close_view_description={handle_close_view_description}
          node_id={nodeId}
        />
      )}

      {DisplayComments && (
        <NodeComments
          handle_close_comments={handle_close_comments}
          node_id={nodeId}
        />
      )}

      {DisplayGraph && (
        <ReportGraph
          report_id={reportId}
          handle_close_graph={handle_close_graph}
        />
      )}

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
    </>
  );
};
