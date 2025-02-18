import { Box } from "@mui/material";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import type { FieldValues } from "react-hook-form";
import formsvg from "../assets/form.svg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { Bounce } from "react-toastify";
import api from "../services/Http";
import { useAuthContext } from "../Context/UseAuthContext";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";

export const Create_Report_Rules = () => {
  const { user } = useAuthContext();
  const { id } = useParams();

  return (
    <div>
      <Box>
        <h1>{id}</h1>
      </Box>
    </div>
  );
};
