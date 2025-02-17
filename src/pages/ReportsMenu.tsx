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

interface report {
  report_id: string;
  title: string;
  description: string;
}

export const ReportsMenu = () => {
  const { user } = useAuthContext();

  const [reports, setReports] = useState<report[]>([]);
  const { id } = useParams();

  return (
    <div>
      <h1>{id}</h1>
    </div>
  );
};
