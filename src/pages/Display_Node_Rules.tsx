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
  const navigate = useNavigate();

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
          minHeight: "700px",
          height: "fit-content",
          margin: "35px auto",
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: 1,
          boxShadow: 1,
          position: "relative",
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
            <Typography
              variant="h6"
              style={{
                color: "blue",
                fontSize: "1.5rem",
                letterSpacing: "1px",
                marginTop: "15px",
                marginBottom: "1px",
              }}
            >
              If
            </Typography>

            <Box>
              {node_rule.conditions.map((node_rule_condition, index) => (
                <Box>
                  {index > 0 && (
                    <Box
                      sx={{
                        backgroundColor: "#4361ee",
                        width: "fit-content",
                        alignItems: "center",
                        margin: "10px auto",
                        padding: 0.3,
                        borderRadius: 2,
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
                          fontSize: "1rem",
                          letterSpacing: "1px",
                        }}
                      >
                        {node_rule.operator}
                      </Typography>
                    </Box>
                  )}

                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      backgroundColor: "#ced4da",
                      padding: 0.5,
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
                        padding: 0.3,
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
                        {node_rule_condition.title}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        backgroundColor: "#4361ee",
                        padding: 0.3,
                        borderRadius: 5,
                      }}
                    >
                      <Typography
                        variant="h6"
                        style={{
                          color: "white",
                          fontSize: "1.5rem",
                          letterSpacing: "1px",
                        }}
                      >
                        ==
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        backgroundColor: "#f8f9fa",
                        padding: 0.3,
                        borderRadius: 5,
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
                        {node_rule_condition.value}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
            <Box
              sx={{
                background: node_colors(node_rule.action),
                alignItems: "center",
                marginTop: "10px",
                borderRadius: "5px",
                padding: 0.5,
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
                  letterSpacing: "1px",
                }}
              >
                {node_rule.action}
              </Typography>
            </Box>
          </Box>
        ))}

        <IconButton
          onClick={() => navigate(`/submit/node/rules/${id}`)}
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
