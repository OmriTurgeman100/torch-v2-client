import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import { useAuthContext } from "../Context/UseAuthContext";
import { useParams } from "react-router-dom";
import { fetch_nodes_report } from "../services/Get-Nodes-Reports";
import api from "../services/Http";

interface Sub_Nodes {
  node_id: number;
  parent: number;
  description: string;
  excluded: string;
  status: string;
  time: string;
  title: string;
}

export const Create_Node_Rules = () => {
  const { user } = useAuthContext();
  const { id } = useParams();
  const [Data, setData] = useState<Sub_Nodes[]>([]);
  const [action, setAction] = useState<string>("");
  const [operator, setOperator] = useState<string>("");
  const [values, setValues] = useState<{ [key: number]: string }>({});

  const handleOperatorChange = (event: SelectChangeEvent) => {
    setOperator(event.target.value as string);
  };

  const handleActionChange = (event: SelectChangeEvent) => {
    setAction(event.target.value as string);
  };

  const handleValueChange = (nodeId: number, value: string) => {
    setValues((prevValues) => ({ ...prevValues, [nodeId]: value }));
  };

  const get_node_rules = async () => {
    try {
      const response = await fetch_nodes_report(user.token, id);
      setData(response.data.nodes);
    } catch (error) {
      console.error(error);
    }
  };

  const handle_submit = async () => {
    try {
      const payload = {
        operator,
        conditions: Data.map((node) => ({
          node_id: node.node_id,
          value: values[node.node_id],
          title: node.title,
        })),
        action,
      };

      console.log(`payload is`)
      console.log(payload)

      // await api.post("/your-endpoint", payload, {
      //   headers: {
      //     Authorization: `Bearer ${user.token}`,
      //   },
      // });

      // console.log("Payload sent:", payload);
    } catch (error) {
      console.error("Error sending request:", error);
    }
  };

  useEffect(() => {
    get_node_rules();
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
          padding: "20px",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          position: "relative",
          boxShadow: 5,
        }}
      >
        <Box sx={{ width: "100px", backgroundColor: "#f8f9fa" }}>
          <FormControl fullWidth>
            <InputLabel id="operator-label">symbol</InputLabel>
            <Select
              labelId="operator-label"
              value={operator}
              onChange={handleOperatorChange}
              sx={{ color: "blue", fontWeight: "bold" }}
            >
              <MenuItem value="and">and</MenuItem>
              <MenuItem value="or">or</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {Data.map((node) => (
          <Box key={node.node_id} sx={{ display: "flex", gap: 2, margin: "15px", alignItems: "center" }}>
            <Typography variant="h6" sx={{ color: "#333333", fontSize: "1.5rem", letterSpacing: "1px" }}>
              {node.title}
            </Typography>

            <Typography variant="h6" sx={{ color: "#333333", fontSize: "1.5rem", letterSpacing: "1px" }}>
              ==
            </Typography>

            <Box sx={{ width: "100px" }}>
              <FormControl fullWidth>
                <InputLabel id={`value-label-${node.node_id}`}>value</InputLabel>
                <Select
                  labelId={`value-label-${node.node_id}`}
                  value={values[node.node_id] || ""}
                  onChange={(event) => handleValueChange(node.node_id, event.target.value)}
                >
                  <MenuItem value="up">up</MenuItem>
                  <MenuItem value="critical">critical</MenuItem>
                  <MenuItem value="down">down</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        ))}

        <Box sx={{ width: "90%" }}>
          <FormControl fullWidth>
            <InputLabel id="action-label">action</InputLabel>
            <Select
              labelId="action-label"
              value={action}
              onChange={handleActionChange}
            >
              <MenuItem value="up">up</MenuItem>
              <MenuItem value="critical">critical</MenuItem>
              <MenuItem value="down">down</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <IconButton onClick={handle_submit} sx={{ position: "absolute", bottom: "-25px" }}>
          <CheckIcon sx={{ color: "#4361ee", fontSize: 35 }} />
        </IconButton>
      </Box>
    </div>
  );
};
