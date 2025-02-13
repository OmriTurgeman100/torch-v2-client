import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import type { FieldValues } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import { Bounce } from "react-toastify";
import { AuthUserLogin } from "../services/Post-Auth-Login";
import { useAuthContext } from "../Context/UseAuthContext";
import { useNavigate } from "react-router-dom";


export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { dispatch } = useAuthContext();

  const navigate = useNavigate();

  const onSubmit = async (data: FieldValues) => {
    try {
      const form_username: string = data.name;

      const form_password: string = data.password;

      const response = await AuthUserLogin(form_username, form_password);

      console.log(typeof response.data.token) // * type is string 

      localStorage.setItem("token", response.data.token);

      dispatch({ type: "LOGIN", payload: { token: response.data.token } });

      

      navigate("/")

      reset();
    } catch (error: any) {
      console.error("Registration failed:", error.message);
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
          Sign In
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
          Sign In
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
