import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import type { FieldValues } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import { Bounce } from "react-toastify";
import { AuthUserRegister } from "../services/Post-Auth-Register";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data: FieldValues) => {
    try {
      const form_username: string = data.name;

      const form_password: string = data.password;

      await AuthUserRegister(form_username, form_password);

      toast.success("Registration Successful", {
        style: {
          backgroundColor: "#0047AB",
          color: "white",
        },
      });

      await new Promise((resolve) => setTimeout(resolve, 2000));

      navigate("/login");

      reset();
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          display: "flex",
          margin: "250px auto",
          backgroundColor: "white",
          width: "500px",
          height: "fit-content",
          boxShadow: "3",
          flexDirection: "column",
          gap: "25px",
          padding: "20px",
          borderRadius: "5px",
          color: "primary.main",
          transition: "transform 1s ease, box-shadow 1s ease",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: 10,
          },
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            borderBottom: 1,
            borderColor: "grey.500",
            fontWeight: "bold",
          }}
          variant="h6"
        >
          Sign Up
        </Typography>

        <TextField // * Name
          label="Name"
          variant="outlined"
          {...register("name", {
            required: "Name is required",
            minLength: {
              value: 5,
              message: "Name must be at least 5 characters",
            },
          })}
          error={!!errors.name}
          helperText={(errors.name?.message as string) || ""}
        />

        <TextField // * Password
          label="Password"
          variant="outlined"
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 5,
              message: "Name must be at least 5 characters",
            },
          })}
          error={!!errors.password}
          helperText={(errors.name?.message as string) || ""}
        />

        <Button type="submit" variant="contained">
          Sign UP
        </Button>
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
    </form>
  );
};
