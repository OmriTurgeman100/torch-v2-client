import { useState, useEffect } from "react";
import { fetch_root_nodes } from "../services/Get-Root-Nodes";
import { useAuthContext } from "../Context/UseAuthContext";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { node_colors } from "../utils/NodeColors";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import { delete_node } from "../services/Delete-Node";
import { toast } from "react-toastify";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer } from "react-toastify";
import { Bounce } from "react-toastify";

interface RootNode {
  node_id: number;
  parent: number | null;
  title: string;
  description: string;
  status: string;
  excluded: "true" | "false";
  time: string;
}

export const Root = () => {
  const { user } = useAuthContext();
  const [RootNodes, setRootNodes] = useState<RootNode[]>([]);
  const navigate = useNavigate();

  const data = async () => {
    try {
      const response = await fetch_root_nodes(user.token);
      setRootNodes(response.data);
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

  useEffect(() => {
    data();

    const intervalId = setInterval(data, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [user.token]);

  return (
    <div>
      <div className="grid-container">
        {RootNodes.map((node) => (
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
              onClick={() => handle_delete_node(node.node_id)}
              sx={{ left: "190px", bottom: "70px", position: "absolute" }}
            >
              <DeleteIcon sx={{ color: "white", opacity: "50%" }} />
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
          Rules
        </Button>
        <Button onClick={() => navigate("/submit/nodes/root")}>Nodes</Button>
        <Button loading loadingPosition="start" startIcon={<SaveIcon />}>
          Reports
        </Button>
      </ButtonGroup>

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
