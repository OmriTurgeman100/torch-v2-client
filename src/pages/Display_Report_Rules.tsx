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
    <div>
      <h1>{id}</h1>
    </div>
  );
};
