import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { Bounce } from "react-toastify";
import { useAuthContext } from "../Context/UseAuthContext";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import { post_report_rules } from "../services/Post-Report-Rules";
// import { useNavigate } from "react-router-dom";

export const Create_Report_Rules = () => {
  const { user } = useAuthContext();
  const { id, report_id } = useParams();
  const [operator, setOperator] = useState<string>();
  const [value, setValue] = useState<any>();
  const [action, setAction] = useState<string>();
  // const navigate = useNavigate();

  const handleOperatorChange = (event: SelectChangeEvent) => {
    setOperator(event.target.value as string);
  };

  const handleActionChange = (event: SelectChangeEvent) => {
    setAction(event.target.value as string);
  };

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handle_submit = async () => {
    try {
      const parsed_value = parseInt(value);

      if (isNaN(parsed_value)) {
        toast.error("Value must be a number");
      } else if (parsed_value.toString().length > 3) {
        toast.error("Value is more than 3 characters");
      } else if (
        operator === undefined ||
        value === undefined ||
        action === undefined
      ) {
        toast.error("Please mark everything");
      } else {
        await post_report_rules(
          operator,
          parsed_value,
          action,
          id,
          report_id,
          user.token
        );

        toast.success("Rule created successfully!", {
          style: {
            backgroundColor: "#0047AB",
            color: "white",
            fontWeight: "bold",
          },
        });

        // await new Promise((resolve) => setTimeout(resolve, 2000));

        // navigate(`/display/report/rules/${id}/${report_id}`);
      }
    } catch (error) {
      toast.error("Failed");
    }
  };

  return (
    <div>
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
          position: "relative",
          gap: 1,
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            margin: "15px",
            padding: "10px",
          }}
        >
          <Typography
            variant="h6"
            style={{
              color: "blue",
              fontSize: "1.5rem",
              letterSpacing: "1px",
            }}
          >
            If
          </Typography>
          <Typography
            variant="h6"
            style={{
              color: "#333333",
              fontSize: "1.5rem",
              letterSpacing: "1px",
              fontWeight: "bold",
            }}
          >
            {report_id}
          </Typography>

          <Box sx={{ width: "100px", backgroundColor: "#f8f9fa" }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">symbol</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={operator}
                label="symbol"
                onChange={handleOperatorChange}
                sx={{ color: "blue", fontWeight: "bold" }}
              >
                <MenuItem value=">">{">"}</MenuItem>
                <MenuItem value="<">{"<"}</MenuItem>
                <MenuItem value="==">{"=="}</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <TextField
            sx={{
              width: "100px",
              backgroundColor: "#f8f9fa",
              "& input": { fontWeight: "bold" },
            }}
            id="outlined-basic"
            label="Value"
            variant="outlined"
            value={value}
            onChange={handleValueChange}
          />
        </Box>
        <Box sx={{ width: "90%" }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">action</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={action}
              label="action"
              onChange={handleActionChange}
            >
              <MenuItem value="up">up</MenuItem>
              <MenuItem value="critical">critical</MenuItem>
              <MenuItem value="down">down</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <IconButton
          onClick={handle_submit}
          sx={{ position: "absolute", bottom: "-25px" }}
        >
          <CheckIcon sx={{ color: "#4361ee", fontSize: 35 }} />
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
