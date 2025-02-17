import { Box } from "@mui/material";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import type { FieldValues } from "react-hook-form";
import formsvg from "../assets/form.svg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { Bounce } from "react-toastify";
import { useAuthContext } from "../Context/UseAuthContext";
import { useParams } from "react-router-dom";
import { fetch_report_menu } from "../services/Get-Reports-Menu";
import AddIcon from "@mui/icons-material/Add";
import { Typography } from "@mui/material";

interface report {
  report_id: string;
  title: string;
  description: string;
}

export const ReportsMenu = () => {
  const { user } = useAuthContext();

  const [reports, setReports] = useState<report[]>([]);
  const { id } = useParams();

  const fetch_reports = async () => {
    const response = await fetch_report_menu(user.token);

    console.log(response.data.reports);

    setReports(response.data.reports);
  };

  useEffect(() => {
    fetch_reports();
  }, [id]);

  return (
    <Box
      sx={{
        backgroundColor: "white",
        width: "500px",
        height: "500px",
        margin: "40px auto",
        borderRadius: "12px",
        boxShadow: "4px 4px 12px rgba(0, 0, 0, 0.1)",
        padding: "20px",
        border: "1px solid #ddd",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <input placeholder="search report" className="report-menu-input" />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          overflow: "hidden",
          overflowY: "auto",
        }}
      >
        {reports.map((report) => (
          <Box
            sx={{
              backgroundColor: "#e9ecef",
              width: "96%",
              padding: "5px",
              display: "flex",
              flexDirection: "row",
              borderRadius: 3,
              boxShadow: 0,
              alignItems: "center",
              gap: 2,
            }}
          >
            <Button
              variant="contained"
              href="#outlined-buttons"
              sx={{
                minWidth: "40px",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
              }}
            >
              <AddIcon fontSize="small" />
            </Button>

            <Typography
              variant="h6"
              style={{
                color: "#333333",
                textAlign: "center",
                fontSize: "1.3rem",
                letterSpacing: "1px",
              }}
            >
              {report.report_id}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
