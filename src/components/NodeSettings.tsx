import { Box, IconButton, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Checkbox from "@mui/material/Checkbox";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState, useEffect } from "react";
import { get_nodes_templates } from "../services/Get-Nodes-Templates";
import { useAuthContext } from "../Context/UseAuthContext";

interface SubNode {
  description: string;
  excluded: string;
  node_id: number;
  parent: number | null;
  status: string;
  time: string;
  title: string;
}

interface NodeSettingsProps {
  closeSettings: () => void;
  subNodes: SubNode[];
  parent: any;
}

interface Node_Templates {
  id: number;
  name: string;
}

export const NodeSettingsComponent = ({
  closeSettings,
  subNodes,
  parent,
}: NodeSettingsProps) => {
  const parent_to_number = parseInt(parent);
  const [nodesList, setNodesList] = useState<number[]>([]);
  const [NodeTemplates, setNodeTemplates] = useState<Node_Templates[]>([]);
  const { user } = useAuthContext();
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  function insert_node(node_id: number, isChecked: boolean): void {
    if (isChecked) {
      if (!nodesList.includes(node_id)) {
        setNodesList((prevNodes) => [...prevNodes, node_id]);
      }
    } else {
      setNodesList((prevNodes) => prevNodes.filter((id) => id !== node_id));
    }
  }

  const fetch_nodes_templates = async () => {
    try {
      const response = await get_nodes_templates(user.token);

      setNodeTemplates(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetch_nodes_templates();
  }, [nodesList]);

  return (
    <Box
      sx={{
        backgroundColor: "white",
        width: "700px",
        height: "500px",
        margin: "20px auto",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        padding: "20px",
        borderRadius: "16px",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.15)",
        },
      }}
    >
      <Box
        sx={{ display: "flex", justifyContent: "end", alignItems: "center" }}
      >
        <Typography
          variant="h4"
          style={{
            color: "#4361ee",
            fontSize: "1.5rem",
            margin: "auto",
            letterSpacing: "1px",
          }}
        >
          Control Panel
        </Typography>
        <IconButton onClick={closeSettings} sx={{ backgroundColor: "#4361ee" }}>
          <CloseIcon sx={{ color: "white" }} />
        </IconButton>
      </Box>

      <Box>
        <Typography
          variant="h4"
          style={{
            color: "#4361ee",
            fontSize: "1.0rem",
            margin: "auto",
            letterSpacing: "1px",
          }}
        >
          Select nodes
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          margin: "15px",
          overflow: "hidden",
          flexWrap: "wrap",
        }}
      >
        {subNodes.map((node) => (
          <Box
            key={node.node_id}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Typography
              variant="h4"
              style={{
                color: "#333333",
                fontSize: "1.5rem",
                fontWeight: "bold",
                letterSpacing: "1px",
              }}
            >
              {node.title}
            </Typography>

            <Checkbox
              {...label}
              onChange={(e) => insert_node(node.node_id, e.target.checked)}
            />
          </Box>
        ))}

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <ExpandMoreIcon />
          <Checkbox
            {...label}
            onChange={(e) => insert_node(parent_to_number, e.target.checked)}
          />
        </Box>
      </Box>
      <Box>
        <Typography
          variant="h4"
          style={{
            color: "#4361ee",
            fontSize: "1.0rem",
            margin: "auto",
            letterSpacing: "1px",
          }}
        >
          Select templates
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          margin: "15px",
          overflow: "hidden",
          flexWrap: "wrap",
        }}
      >
        <h1>1</h1>
        <h1>2</h1>
        <h1>3</h1>
      </Box>

      <Typography
        variant="h4"
        style={{
          color: "#4361ee",
          fontSize: "1.0rem",
          margin: "auto",
          letterSpacing: "1px",
        }}
      >
        Custom templates
      </Typography>

      <TextField
        placeholder="node 1, node 2, node 3"
        sx={{ width: "100%", marginTop: "15px" }}
      />
    </Box>
  );
};
