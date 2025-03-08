import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useAuthContext } from "../hooks/useAuthContext";
import { useParams } from "react-router-dom";
import { fetch_report_menu } from "../services/Get-Reports-Menu";
import { post_report_from_menu } from "../services/Post-Menu-Report";
import { ToastContainer } from "react-toastify";
import { Bounce } from "react-toastify";
import { toast } from "react-toastify";
import { tree_node_report_colors } from "../utils/TreeNodeReportColors";
import { get_active_node_path } from "../services/Get-Active-Node-Path";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import HomeIcon from "@mui/icons-material/Home";
import CircleIcon from "@mui/icons-material/Circle";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface Report {
  report_id: string;
  title: string;
  description: string;
}

interface path {
  node_id: number;
  parent: number;
  title: string;
  status: string;
}

export const ReportsMenu = () => {
  const { user } = useAuthContext();
  const [reports, setReports] = useState<Report[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [path, setPath] = useState<path[]>([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetch_reports = async () => {
    const response = await fetch_report_menu(user.token);
    setReports(response.data.reports);
  };

  const get_selected_node_path = async () => {
    try {
      const response = await get_active_node_path(user.token, id);

      setPath(response.data);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetch_reports();
    get_selected_node_path();
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
      await post_report_from_menu(
        user.token,
        id,
        report_id,
        title,
        description
      );

      toast.success("Request Was Successful", {
        style: {
          backgroundColor: "#0047AB",
          color: "white",
        },
      });
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          margin: "15px",
          padding: "5px",
          backgroundColor: "#f8f9fa",
          width: "fit-content",
          borderRadius: 5,
        }}
      >
        <IconButton onClick={() => navigate("/")}>
          <HomeIcon sx={{ color: "#4361ee" }} />
          <ArrowRightIcon sx={{ color: "#4361ee" }} />
        </IconButton>

        {path.map((node, index) => (
          <Box
            key={node.node_id}
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <Link to={`/${node.node_id}`}>
              <Typography sx={{ color: "#333333" }} variant="h6">
                {node.title}
              </Typography>
            </Link>

            <CircleIcon sx={{ color: tree_node_report_colors(node.status) }} />

            {index < path.length - 1 && (
              <ArrowRightIcon sx={{ color: "#4361ee" }} />
            )}
          </Box>
        ))}
      </Box>
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
                transition: "transform 1s ease, box-shadow 1s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: 10,
                },
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
