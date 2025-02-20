import { Box, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Checkbox from "@mui/material/Checkbox";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState, useEffect } from "react";

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
  parent: string | undefined;
}

export const NodeSettingsComponent = ({
  closeSettings,
  subNodes,
  parent,
}: NodeSettingsProps) => {
  const [nodesList, setNodesList] = useState<number[]>([]);
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  useEffect(() => {
    console.log(nodesList);
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
            <Checkbox {...label} />
          </Box>
        ))}

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <ExpandMoreIcon />
          <Checkbox {...label} />
        </Box>
      </Box>
    </Box>
  );
};
