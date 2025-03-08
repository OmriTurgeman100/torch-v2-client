import { Box, Typography } from "@mui/material";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState, useEffect } from "react";
import { get_node_comments } from "../services/Get-Node-Comments";
import { ToastContainer } from "react-toastify";
import { Bounce } from "react-toastify";
import { toast } from "react-toastify";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import TextField from "@mui/material/TextField";
import { post_node_comment } from "../services/Post-Node-Comments";
import CancelIcon from "@mui/icons-material/Cancel";
import { handle_delete_node_comment } from "../services/Delete-Node-Comment";

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
  const [commentText, setCommentText] = useState("");
  const { user } = useAuthContext();

  const fetch_comments_by_filter = async () => {
    try {
      if (OrderBy === "desc") {
        const response = await get_node_comments(user.token, node_id, "desc");

        setNodeComments(response.data);
      }

      if (OrderBy === "asc") {
        const response = await get_node_comments(user.token, node_id, "asc");

        setNodeComments(response.data);
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const handle_submit = async (): Promise<void> => {
    try {
      await post_node_comment(user.token, node_id, commentText);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const handle_delete_icon = async (comment_id: number) => {
    try {
      await handle_delete_node_comment(user.token, comment_id);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (node_id) {
      fetch_comments_by_filter();
    }
  }, [OrderBy, node_id, NodeComments]);

  return (
    <div>
      <Box
        sx={{
          width: "500px",
          height: "500px",
          backgroundColor: "White",
          margin: "auto",
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
          <Box sx={{ display: "flex", marginRight: "auto", width: "90%" }}>
            <TextField
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              sx={{ width: "90%" }}
            />

            <IconButton onClick={handle_submit}>
              <LibraryAddIcon />
            </IconButton>
          </Box>

          <IconButton onClick={() => setOrderBy("asc")}>
            <ArrowUpwardIcon />
          </IconButton>

          <IconButton onClick={() => setOrderBy("desc")}>
            <ArrowDownwardIcon />
          </IconButton>

          <IconButton onClick={handle_close_comments}>
            <CancelIcon />
          </IconButton>
        </Box>
        <Box
          sx={{
            overflow: "scroll",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {NodeComments.map((node_comment) => (
            <Box
              key={node_comment.id}
              sx={{
                display: "flex",
                flexDirection: "column",
                margin: "10px 0",
                padding: "15px",
                backgroundColor: "#f5f5f5",
                borderRadius: "8px",
                boxShadow: 1,
                position: "relative",
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "bold",
                  color: "#333",
                  fontSize: "1rem",
                  marginBottom: "8px",
                }}
              >
                {node_comment.comment}
              </Typography>

              <IconButton
                onClick={() => handle_delete_icon(node_comment.id)}
                sx={{ position: "absolute", right: "0px", top: "0px" }}
              >
                <DeleteIcon />
              </IconButton>

              <Typography
                variant="body2"
                sx={{
                  color: "#757575",
                  fontSize: "0.875rem",
                  textAlign: "right",
                  fontStyle: "italic",
                }}
              >
                {node_comment.time}
              </Typography>
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
