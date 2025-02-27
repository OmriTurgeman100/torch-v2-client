import React from 'react'
import { useState, useEffect } from "react";
import { get_graph_data_report } from "../services/Get-Report-Graph";
import { toast, ToastContainer } from "react-toastify";
import { Bounce } from "react-toastify";
import { useAuthContext } from "../Context/UseAuthContext";
import { Box, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';


interface ReportProps {
    report_id: string | null | undefined;
    handle_close_graph: () => void;
  }
  
  interface TimeSeries {
    value: number;
    time: string;
  }

export const GraphView = () => {
      const { user } = useAuthContext();
      const [Time, setTime] = useState<string>("1 days");
      const [Data, setData] = useState<TimeSeries[]>([]);
  return (
    <div>GraphView</div>
  )
}
