import { Box, IconButton, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Checkbox from "@mui/material/Checkbox";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState, useEffect } from "react";
import { get_nodes_templates } from "../services/Get-Nodes-Templates";
import { useAuthContext } from "../hooks/UseAuthContext";
import CheckIcon from "@mui/icons-material/Check";
import { post_nodes } from "../services/Post-Nodes";
import AddIcon from "@mui/icons-material/Add";
import { post_node_template } from "../services/Post-Node-Template";
import { toast, ToastContainer } from "react-toastify";
import { Bounce } from "react-toastify";

interface SubNode {
  description: string;
  excluded: string;
  node_id: number;
  parent: number | null;
  status: string;
  time: string;
  title: string;
}

interface NodeSettingsProps {
  closeSettings: () => void;
  subNodes: SubNode[];
  parent: any;
}

interface Node_Templates {
  id: number;
  name: string;
}

export const NodeSettingsComponent = ({
  closeSettings,
  subNodes,
  parent,
}: NodeSettingsProps) => {
  const parent_to_number = parseInt(parent);
  const [NodeTemplates, setNodeTemplates] = useState<Node_Templates[]>([]);
  const [nodesList, setNodesList] = useState<number[]>([]);
  const [TemplatesList, setTemplatesList] = useState<string[]>([]);
  const [CustomTemplateList, setCustomTemplateList] = useState<string>("");
  const [DisplayTemplates, setDisplayTemplates] = useState<boolean>(false);
  const [TemplateFormData, setTemplateFormData] = useState<string>("");
  const { user } = useAuthContext();
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  function insert_node(node_id: number, isChecked: boolean): void {
    setNodesList((prevNodes) =>
      isChecked
        ? [...prevNodes, node_id]
        : prevNodes.filter((id) => id !== node_id)
    );
  }

  function insert_template(template_name: string, isChecked: boolean): void {
    setTemplatesList((prevTemplates) =>
      isChecked
        ? [...prevTemplates, template_name]
        : prevTemplates.filter((id) => id !== template_name)
    );
  }

  const fetch_nodes_templates = async () => {
    try {
      const response = await get_nodes_templates(user.token);
      setNodeTemplates(response.node_templates);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const handle_submit = async () => {
    try {
      const CustomTemplatesExtracted = CustomTemplateList.split(",").map(
        (item) => item.trim()
      );
      const total_templates = [
        ...TemplatesList,
        ...CustomTemplatesExtracted.filter(Boolean), // * removes empty or falsy values (like "", null, undefined, false, 0, or NaN) from an array.
      ];

      for (const node of nodesList) {
        for (const total_template of total_templates) {
          await post_nodes(total_template, total_template, node, user.token);
        }
      }

      setNodesList([]);
      setTemplatesList([]);
      setCustomTemplateList("");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const handle_new_template = async () => {
    try {
      const TemplateFormDataExtracted = TemplateFormData.split(",").map(
        (item) => item.trim()
      );

      const total_templates = [...TemplateFormDataExtracted.filter(Boolean)];

      console.log(total_templates);

      for (const template of total_templates) {
        await post_node_template(template, user.token);
      }

      setDisplayTemplates(false);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetch_nodes_templates();
  }, [NodeTemplates]);

  return (
    <div>
      <Box
        sx={{
          backgroundColor: "white",
          width: "700px",
          height: "fit-content",
          margin: "20px auto",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          padding: "20px",
          borderRadius: "16px",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          position: "relative",
          "&:hover": {
            transform: "translateY(-8px)",
            boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.15)",
          },
        }}
      >
        <Box
          sx={{ display: "flex", justifyContent: "end", alignItems: "center" }}
        >
          <Typography
            variant="h4"
            style={{
              color: "#4361ee",
              fontSize: "1.5rem",
              margin: "auto",
              letterSpacing: "1px",
            }}
          >
            Control Panel
          </Typography>
          <IconButton
            onClick={closeSettings}
            sx={{
              backgroundColor: "#4361ee",
              "&:hover": {
                backgroundColor: "#4361ee",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
              },
            }}
          >
            <CloseIcon sx={{ color: "white" }} />
          </IconButton>
        </Box>

        <Typography
          variant="h4"
          style={{
            color: "#4361ee",
            fontSize: "1.0rem",
            margin: "auto",
            letterSpacing: "1px",
          }}
        >
          Select nodes
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            margin: "15px",
            overflow: "hidden",
            flexWrap: "wrap",
          }}
        >
          {subNodes.map((node) => (
            <Box
              key={node.node_id}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Typography
                variant="h4"
                style={{
                  color: "#333333",
                  fontSize: "1.5rem",
                  letterSpacing: "1px",
                }}
              >
                {node.title}
              </Typography>
              <Checkbox
                {...label}
                checked={nodesList.includes(node.node_id)}
                onChange={(e) => insert_node(node.node_id, e.target.checked)}
              />
            </Box>
          ))}

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <ExpandMoreIcon />
            <Checkbox
              {...label}
              checked={nodesList.includes(parent_to_number)}
              onChange={(e) => insert_node(parent_to_number, e.target.checked)}
            />
          </Box>
        </Box>
        {DisplayTemplates ? (
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography
                variant="h4"
                style={{
                  color: "#4361ee",
                  fontSize: "1.0rem",
                  letterSpacing: "1px",
                }}
              >
                Confirm templates
              </Typography>

              <IconButton
                onClick={handle_new_template}
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
                <CheckIcon sx={{ color: "#4361ee" }} />
              </IconButton>
            </Box>
            <TextField
              value={TemplateFormData}
              onChange={(event) => setTemplateFormData(event.target.value)}
              placeholder="Server Uptime, Firewall Monitoring, SSL Certificate Expiry"
              sx={{ width: "100%", marginTop: "15px", marginBottom: "15px" }}
            />
          </Box>
        ) : (
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography
                variant="h4"
                style={{
                  color: "#4361ee",
                  fontSize: "1.0rem",
                  letterSpacing: "1px",
                }}
              >
                Insert templates
              </Typography>

              <IconButton
                onClick={() => setDisplayTemplates(true)}
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
                <AddIcon sx={{ color: "#4361ee" }} />
              </IconButton>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                margin: "15px",
                overflow: "hidden",
                flexWrap: "wrap",
              }}
            >
              {NodeTemplates.map((node_template) => (
                <Box
                  sx={{ display: "flex", alignItems: "center" }}
                  key={node_template.id}
                >
                  <Typography
                    variant="h4"
                    style={{
                      color: "#333333",
                      fontSize: "1.5rem",
                      letterSpacing: "1px",
                    }}
                  >
                    {node_template.name}
                  </Typography>
                  <Checkbox
                    {...label}
                    checked={TemplatesList.includes(node_template.name)}
                    onChange={(e) =>
                      insert_template(node_template.name, e.target.checked)
                    }
                  />
                </Box>
              ))}
            </Box>
          </Box>
        )}

        <Typography
          variant="h4"
          style={{
            color: "#4361ee",
            fontSize: "1.0rem",
            margin: "auto",
            letterSpacing: "1px",
          }}
        >
          Custom templates
        </Typography>

        <TextField
          value={CustomTemplateList}
          onChange={(event) => setCustomTemplateList(event.target.value)}
          placeholder="status code, kubernetes, storage, utilization"
          sx={{ width: "100%", marginTop: "15px" }}
        />

        <IconButton
          onClick={handle_submit}
          sx={{
            position: "absolute",
            bottom: "-15px",
            left: "47%",
            backgroundColor: "#4361ee",
            transition: "transform 0.3s ease, box-shadow 1s ease",
            "&:hover": {
              backgroundColor: "#4361ee",
              transform: "scale(1.05)",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
            },
          }}
        >
          <CheckIcon sx={{ color: "white" }} />
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
