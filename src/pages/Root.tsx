import { useState, useEffect } from "react";
import { fetch_root_nodes } from "../services/Get-Root-Nodes";
import { useAuthContext } from "../Context/UseAuthContext";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

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
      setRootNodes(response.data.data);
    } catch (error) {
      console.error("Error fetching root nodes:", error);
    }
  };

  useEffect(() => {
    data();
  }, [user.token]);

  const color = (status: string) => {
    switch (status) {
      case "expired":
        return "linear-gradient(135deg, #6c757d, #343a40)";
      case "critical":
        return "linear-gradient(135deg, #ff8800 0%, #ffd700 100%)";
      case "down":
        return "linear-gradient(135deg, #ff2600 0%, #e95d3a 100%)";
      case "up":
        return "linear-gradient(135deg,rgb(77, 85, 189), #2575fc)";

      default:
        return "linear-gradient(135deg, #dee2e6, #adb5bd)";
    }
  };

  return (
    <div className="grid-container">
      {RootNodes.map((node) => (
        <Link to={`/${node.node_id}`}>
          <Box
            key={node.node_id}
            className="card"
            sx={{
              width: "200px",
              height: "80px",
              background: color(node.status),
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
  );
};
