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

interface node_conditions {
  value: string;
  node_id: number;
  title: string;
}

interface node_rules {
  rule_id: number;
  parent_node_id: number;
  operator: string;
  conditions: node_conditions[];
  action: string;
  time: string;
}

export const Display_Node_Rules = () => {
  const { user } = useAuthContext();
  const { id } = useParams();
  const [NodeRules, setNodeRules] = useState<node_rules[]>([]);

  const get_rules = async () => {
    try {
      const response = await fetch_rules(user.token, id);

      setNodeRules(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    get_rules();
  }, []);

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
        }}
      >
        {NodeRules.map((node_rule) => (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box sx={{ backgroundColor: "#4361ee", padding: 0.5, borderRadius: 5, boxShadow: 1 }}>
              <Typography
                variant="h6"
                style={{
                  color: "white",
                  fontSize: "1.5rem",
                  letterSpacing: "1px",
                }}
              >
                {node_rule.operator}
              </Typography>
            </Box>
            <Box>
              {node_rule.conditions.map((node_rule_condition) => (
                <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
                  <Typography
                    variant="h6"
                    style={{
                      color: "#333333",
                      fontSize: "1.5rem",
                      letterSpacing: "1px",
                    }}
                  >
                    {node_rule_condition.title}
                  </Typography>
                  <Typography
                    variant="h6"
                    style={{
                      color: "#333333",
                      fontSize: "1.5rem",
                      letterSpacing: "1px",
                    }}
                  >
                    {node_rule.operator}
                  </Typography>
                  <Typography
                    variant="h6"
                    style={{
                      color: "#333333",
                      fontSize: "1.5rem",
                      letterSpacing: "1px",
                    }}
                  >
                    {node_rule_condition.value}
                  </Typography>
                </Box>
              ))}
            </Box>
            <Typography
              variant="h6"
              style={{
                color: "#333333",
                fontSize: "1.5rem",
                letterSpacing: "1px",
              }}
              sx={{ marginTop: 2, marginBottom: 2 }}
            >
              action: {node_rule.action}
            </Typography>
          </Box>
        ))}
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
