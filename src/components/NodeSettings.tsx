import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export const NodeSettingsComponent = ({
  closeSettings,
}: {
  closeSettings: () => void;
}) => {
  return (
    <Box sx={{backgroundColor: "white", width: "700px", height: "500px", margin: "20px auto", boxShadow: 1, padding: "10px",}}>
      <h1>Hey from Node Settings</h1>
      <IconButton onClick={closeSettings}>
        <CloseIcon />
      </IconButton>
    </Box>
  );
};
