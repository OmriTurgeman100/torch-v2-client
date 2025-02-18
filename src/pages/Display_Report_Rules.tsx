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
import api from "../services/Http";
import { useAuthContext } from "../Context/UseAuthContext";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import { fetch_rules } from "../services/Get-Rules";
import { node_colors } from "../utils/NodeColors";

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
  const { id } = useParams();

  const [reportRules, setReportRules] = useState<Report_Rules[]>([]);

  const fetch_report_rules = async () => {
    const response = await fetch_rules(user.token, id);

    setReportRules(response.data);
  };

  useEffect(() => {
    fetch_report_rules();
  }, [id]);

  return (
    <Box
      sx={{
        backgroundColor: "white",
        width: "500px",
        height: "500px",
        margin: "35px auto",
        padding: "10px",
        borderRadius: 1,
        boxShadow: 1,
        display: "flex",
        flexDirection: "column",
        gap: 3,
        alignItems: "center",
      }}
    >
      {reportRules.map((report) => (
        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
              alignItems: "center",
              marginTop: "15px",
              backgroundColor: "#e9ecef",
              padding: "10px",
              borderRadius: 5,
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

          
          <Typography
            variant="h6"
            style={{
              color: "#333333",
              fontSize: "1.5rem",
              textAlign: "center",
              letterSpacing: "1px",
              marginTop: "10px",
              backgroundColor: "black",
              display: "inline"

            }}
          >
            {report.action}
          </Typography>

      
        </Box>
      ))}
    </Box>
  );
};
