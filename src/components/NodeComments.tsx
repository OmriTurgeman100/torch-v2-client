import { Box, Typography } from "@mui/material";
import { useAuthContext } from "../Context/UseAuthContext";
import { useState, useEffect } from "react";
import { get_node_comments } from "../services/Get-Node-Comments";
import { ToastContainer } from "react-toastify";
import { Bounce } from "react-toastify";
import { toast } from "react-toastify";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

interface NodeCommentsProps {
  handle_close_comments: () => void;
  node_id: number | null | undefined;
}

interface NodeComments {
  id: number;
  parent: number;
  comment: string;
  time: string;
}

export const NodeComments = ({
  handle_close_comments,
  node_id,
}: NodeCommentsProps) => {
  const [NodeComments, setNodeComments] = useState<NodeComments[]>([]);
  const [OrderBy, setOrderBy] = useState<string>("desc");
  const { user } = useAuthContext();

  const fetch_comments_by_filter = async () => {
    try {
      if (OrderBy === "desc") {
        const response = await get_node_comments(user.token, node_id, "desc");

        console.log(response);

        setNodeComments(response.data);

        // console.log(NodeComments)
      }

      if (OrderBy === "asc") {
        const response = await get_node_comments(user.token, node_id, "asc");

        setNodeComments(response.data);

        // console.log(NodeComments)
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetch_comments_by_filter();
  }, [OrderBy]);

  return (
    <div>
      <Box
        sx={{
          width: "500px",
          height: "500px",
          backgroundColor: "White",
          margin: "auto",
          overflow: "scroll",
          padding: "20px",
          boxShadow: 1,
          borderRadius: 5,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <IconButton onClick={() => setOrderBy("asc")}>
            <ArrowUpwardIcon />
          </IconButton>

          <IconButton onClick={() => setOrderBy("desc")}>
            <ArrowDownwardIcon />
          </IconButton>

          <IconButton onClick={handle_close_comments}>
            <DeleteIcon />
          </IconButton>
        </Box>

        <Box>
          {NodeComments.map((node_comment) => (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                margin: 2,

                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Typography
                  variant="h4"
                  style={{
                    color: "black",
                    fontSize: "1.5rem",
                    letterSpacing: "1px",
                  }}
                >
                  {node_comment.comment}
                </Typography>

                <Typography
                  variant="h4"
                  style={{
                    color: "black",
                    fontSize: "1.5rem",
                    letterSpacing: "1px",
                  }}
                >
                  {node_comment.time}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
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
