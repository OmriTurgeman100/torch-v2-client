import { useState, useEffect } from "react";
import { fetch_root_nodes } from "../services/Get-Root-Nodes";
import { useAuthContext } from "../Context/UseAuthContext";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";


interface RootNode {
  node_id: number;
  parent: number | null;
  title: string;
  description: string;
  status: string;
  excluded: "true" | "false";
  time: string;
}

export const Root = () => {
  const { user } = useAuthContext();
  const [RootNodes, setRootNodes] = useState<RootNode[]>([]);

  const data = async () => {
    try {
      const response = await fetch_root_nodes(user.token);
      setRootNodes(response.data.data);
    } catch (error) {
      console.error("Error fetching root nodes:", error);
    }
  };

  useEffect(() => {
    data();
  }, [user.token]);

  return (
<Box>
  <Grid container spacing={2}>
    {RootNodes.map((node) => (

        <Box>
          <h1>{node.title}</h1>
          <h2>{node.status}</h2>
        </Box>
     
    ))}
  </Grid>
</Box>
  );
};
