import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useAuthContext } from "../Context/UseAuthContext";
import { useParams } from "react-router-dom";
import { fetch_report_menu } from "../services/Get-Reports-Menu";
import { post_report_from_menu } from "../services/Post-Menu-Report";
import { ToastContainer } from "react-toastify";
import { Bounce } from "react-toastify";

interface Report {
  report_id: string;
  title: string;
  description: string;
}

export const ReportsMenu = () => {
  const { user } = useAuthContext();
  const [reports, setReports] = useState<Report[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { id } = useParams();

  const fetch_reports = async () => {
    const response = await fetch_report_menu(user.token);
    setReports(response.data.reports);
  };

  useEffect(() => {
    fetch_reports();
  }, [id]);

  const filteredReports = reports.filter((report) =>
    report.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const post_report = async (
    report_id: string,
    title: string,
    description: string
  ) => {
    try {
      const response = await post_report_from_menu(
        user.token,
        id,
        report_id,
        title,
        description
      );
    } catch (error: any) {
      console.error(
        "Error posting report:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div>
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
        <input
          placeholder="Search report"
          className="report-menu-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            overflow: "hidden",
            overflowY: "auto",
          }}
        >
          {filteredReports.map((report) => (
            <Box
              key={report.report_id}
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
                onClick={() =>
                  post_report(
                    report.report_id,
                    report.title,
                    report.description
                  )
                }
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
