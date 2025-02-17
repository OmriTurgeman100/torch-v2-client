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
    } catch (error) {
      console.error("Error fetching root nodes:", error);
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
        <Button loading loadingPosition="start" startIcon={<SaveIcon />}>
          Rules
        </Button>
        <Button onClick={() => navigate(`/submit/nodes/${null}`)}>Nodes</Button>
        <Button loading loadingPosition="start" startIcon={<SaveIcon />}>
          Reports
        </Button>
      </ButtonGroup>
    </div>
  );
};
