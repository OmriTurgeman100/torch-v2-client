import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetch_root_nodes } from "../services/Get-Root-Nodes";
import { useAuthContext } from "../Context/UseAuthContext";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

type sub_nodes = {
  description: string;
  excluded: string;
  node_id: number;
  parent: number | null;
  status: string;
  time: string;
  title: string;
};

type reports = {
  description: string;
  id: number;
  parent: number;
  report_id: string;
  time: string;
  title: string;
  value: number | null;
};

type data = {
  reports?: reports[];
  nodes?: sub_nodes[];
};

export const TreeNodesReports = () => {
  const [nodesData, setNodesData] = useState<data | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  console.log(id);
  return (
    <div>
      <h1>{id}</h1>
    </div>
  );
};
