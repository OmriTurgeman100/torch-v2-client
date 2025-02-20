import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export const NodeSettingsComponent = ({
  closeSettings,
}: {
  closeSettings: () => void;
}) => {
  return (
    <Box>
      <h1>Hey from Node Settings</h1>
      <IconButton onClick={closeSettings}>
        <CloseIcon />
      </IconButton>
    </Box>
  );
};
