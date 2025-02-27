import { useState, useEffect } from "react";
import { get_graph_data_report } from "../services/Get-Report-Graph";
import { toast, ToastContainer } from "react-toastify";
import { Bounce } from "react-toastify";
import { useAuthContext } from "../Context/UseAuthContext";
import { Box, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { ModernChart } from "./ModernChart";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import { useNavigate } from "react-router-dom";

interface ReportProps {
  report_id: string | null | undefined;
  handle_close_graph: () => void;
}

interface TimeSeries {
  value: number;
  time: string;
}

export const ReportGraph = ({ report_id, handle_close_graph }: ReportProps) => {
  const { user } = useAuthContext();
  const [Time, setTime] = useState<string>("1 days");
  const [Data, setData] = useState<TimeSeries[]>([]);
  const navigate = useNavigate();

  const handleChange = (event: SelectChangeEvent) => {
    setTime(event.target.value as string);
  };

  const fetch_report_graph = async () => {
    try {
      const response = await get_graph_data_report(user.token, report_id, Time);

      setData(response.time_series_data);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetch_report_graph();
  }, [Time]);

  return (
    <div>
      <Box
        sx={{
          backgroundColor: "white",
          height: "fit-content",
          width: "50%",
          padding: "20px",
          margin: "auto",
          boxShadow: 1,
          borderRadius: 5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "20px",
            alignItems: "center",
            marginBottom: "25px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              margin: "auto",
              gap: 1,
            }}
          >
            <Typography
              variant="h4"
              style={{
                color: "#333333",
                fontSize: "1.4rem",
                letterSpacing: "1px",
                fontWeight: "bold",
              }}
            >
              Report TimeSeries Graph
            </Typography>

            <IconButton
              onClick={() => navigate(`/view/graph/${report_id}`)}
              sx={{
                backgroundColor: "#e9ecef",
                transition: "transform 0.3s ease, box-shadow 1s ease",
                "&:hover": {
                  backgroundColor: "#e9ecef",
                  transform: "scale(1.05)",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
                },
              }}
            >
              <FullscreenIcon sx={{ color: "#4361ee" }} />
            </IconButton>
          </Box>

          <FormControl sx={{ minWidth: "100px", width: "fit-content" }}>
            <InputLabel id="demo-simple-select-label">Time</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={Time}
              label="Time"
              onChange={handleChange}
            >
              <MenuItem value={"24 hours"}>24 hours</MenuItem>
              <MenuItem value={"3 days"}>3 days</MenuItem>
              <MenuItem value={"7 days"}>7 days</MenuItem>
            </Select>
          </FormControl>

          <IconButton
            sx={{
              backgroundColor: "#4361ee",
              transition: "transform 0.3s ease, box-shadow 1s ease",
              "&:hover": {
                backgroundColor: "#4361ee",
                transform: "scale(1.05)",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
              },
            }}
            onClick={handle_close_graph}
          >
            <CloseIcon sx={{ color: "white" }} />
          </IconButton>
        </Box>

        <ModernChart Data={Data} height={300} />
      </Box>

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
