import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

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
}

export const NodeSettingsComponent = ({ closeSettings, subNodes }: NodeSettingsProps) => {
  return (
    <Box
      sx={{
        backgroundColor: "white",
        width: "700px",
        height: "500px",
        margin: "20px auto",
        boxShadow: 1,
        padding: "10px",
      }}
    >
      <h1>Hey from Node Settings</h1>
      <IconButton onClick={closeSettings}>
        <CloseIcon />
      </IconButton>
    </Box>
  );
};
