import { Box } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { Bounce } from "react-toastify";
import { useAuthContext } from "../Context/UseAuthContext";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import { fetch_rules } from "../services/Get-Rules";
import { node_colors } from "../utils/NodeColors";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useNavigate } from "react-router-dom";

interface Report_Conditions {
  report_id: string;
  threshold: string;
}

interface Report_Rules {
  rule_id: number;
  parent_node_id: number;
  operator: string;
  conditions: Report_Conditions[];
  action: string;
  time: string;
}

export const Display_Report_Rules = () => {
  const { user } = useAuthContext();
  const { id, report_id } = useParams();
  const navigate = useNavigate();

  const [reportRules, setReportRules] = useState<Report_Rules[]>([]);

  const fetch_report_rules = async () => {
    try {
      const response = await fetch_rules(user.token, id);

      setReportRules(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetch_report_rules();
  }, [id]);

  return (
    <div>
      <Box
        sx={{
          backgroundColor: "white",
          width: "500px",
          minHeight: "500px",
          height: "fit-content",
          margin: "35px auto",
          padding: "10px",
          borderRadius: 1,
          boxShadow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          gap: 1,
        }}
      >
        {reportRules.map((report) => (
          <Box key={report.rule_id}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 2,
                alignItems: "center",

                backgroundColor: "#e9ecef",
                padding: "10px",
                borderRadius: 5,
                transition: "transform 1s ease, box-shadow 1s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: 10,
                },
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#f8f9fa",
                  padding: 1,
                  borderRadius: 5,
                  boxShadow: 1,
                }}
              >
                <Typography
                  variant="h6"
                  style={{
                    color: "#333333",
                    fontSize: "1.5rem",
                    letterSpacing: "1px",
                  }}
                >
                  {report.conditions[0].report_id}
                </Typography>
              </Box>
              <Box
                sx={{
                  backgroundColor: "#4361ee",
                  height: "fit-content",
                  padding: 0.5,
                  borderRadius: 5,
                  boxShadow: 5,
                }}
              >
                <Typography
                  variant="h6"
                  style={{
                    color: "white",
                    fontSize: "1.0rem",
                    fontWeight: "bold",
                    letterSpacing: "1px",
                  }}
                >
                  {report.operator}
                </Typography>
              </Box>

              <Box
                sx={{
                  backgroundColor: "#f8f9fa",
                  padding: 1,
                  borderRadius: 5,
                  boxShadow: 1,
                }}
              >
                <Typography
                  variant="h6"
                  style={{
                    color: "#333333",
                    fontSize: "1.5rem",
                    letterSpacing: "1px",
                  }}
                >
                  {report.conditions[0].threshold}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                background: node_colors(report.action),
                width: "fit-content",
                margin: "auto",
                marginTop: 2,
                marginBottom: 2,
                padding: "3px",
                borderRadius: 5,
                boxShadow: 5,
                transition: "transform 1s ease, box-shadow 1s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: 10,
                },
              }}
            >
              <Typography
                variant="h6"
                style={{
                  color: "white",
                  fontSize: "1.5rem",
                  opacity: "50%",
                  textAlign: "center",
                  fontWeight: "bold",
                  letterSpacing: "1px",
                }}
              >
                {report.action}
              </Typography>
            </Box>
          </Box>
        ))}

        <IconButton
          onClick={() => navigate(`/submit/report/rules/${id}/${report_id}`)}
          sx={{ position: "absolute", bottom: "-25px" }}
        >
          <AddCircleIcon sx={{ color: "#4361ee", fontSize: 35 }} />
        </IconButton>
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
