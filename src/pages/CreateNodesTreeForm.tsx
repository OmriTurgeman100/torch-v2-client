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
import { useAuthContext } from "../Context/UseAuthContext";
import { useParams } from "react-router-dom";
import { post_nodes } from "../services/Post-Nodes";

export const CreateNodesTreeForm = () => {
  const { user } = useAuthContext();
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    try {
      const form_title: string = data.title;
      const form_description: string = data.description;

      await post_nodes(form_title, form_description, id, user.token);

      toast.success("Successful", {
        style: {
          backgroundColor: "#0047AB",
          color: "white",
        },
      });

      reset();
    } catch (error) {
      toast.error("Failed");
      console.error("Form submit has failed:", error);
    }
  };

  useEffect(() => {
    if (errors.title) {
      toast.error(errors.title.message as string);
    }
    if (errors.description) {
      toast.error(errors.description.message as string);
    }
  }, [errors]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            background: "linear-gradient(135deg, #1E3A8A, #3B82F6)",
            width: "500px",
            height: "255px",
            margin: "15px",
            boxShadow: 5,
            transition: "transform 1s ease, box-shadow 1s ease",
            "&:hover": {
              transform: "translateY(-5px)",
              boxShadow: 10,
            },
          }}
        >
          <Box
            sx={{
              background: "linear-gradient(135deg,rgb(78, 169, 255), #3B82F6)",
              width: "100%",
              height: "20%",
            }}
          >
            <img
              src={formsvg}
              alt="Torch logo"
              style={{
                height: "35px",
                width: "30",
                marginLeft: "225px",
                marginTop: "7px",
                alignItems: "center",
              }}
            />
          </Box>
          <Box
            sx={{
              backgroundColor: "white",
              width: "100%",
              height: "80%",
              borderTopLeftRadius: 5,
              borderTopRightRadius: 5,
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              alignItems: "center",
            }}
          >
            <TextField
              sx={{
                marginTop: "10px",
                width: "90%",
              }}
              label="title"
              variant="outlined"
              {...register("title", {
                required: "title is required",
                minLength: {
                  value: 5,
                  message: "Name must be at least 5 characters",
                },
              })}
              error={!!errors.title}
            />

            <TextField
              sx={{
                marginTop: "10px",
                width: "90%",
              }}
              label="description"
              variant="outlined"
              {...register("description", {
                required: "description is required",
                minLength: {
                  value: 5,
                  message: "Desc must be at least 5 characters",
                },
              })}
              error={!!errors.description}
            />

            <Button
              type="submit"
              variant="contained"
              sx={{
                marginTop: "15px",
                width: "50%",
                fontWeight: "Bold",
                textTransform: "none",
                borderRadius: 5,
                boxShadow: 5,
              }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </form>

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
