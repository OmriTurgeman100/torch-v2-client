import { useAuthContext } from "../Context/UseAuthContext";
import { fetch_user_details } from "../services/Get-User-Details";
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { fetch_user_photo } from "../services/Get-User-Photo";
import Avatar from "@mui/material/Avatar";
import api from "../services/Http";
import { useDropzone } from "react-dropzone";
import Button from "@mui/material/Button";

interface UserData {
  username: string;
  role: string;
  id: number;
}

export const UserProfile = () => {
  const { user } = useAuthContext();
  const [data, setData] = useState<UserData[]>([]);
  const [createdAt, setCreatedAt] = useState<String | null>();
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [FormImage, SetFormImage] = useState<any>();
  const [fileName, setFileName] = useState<string>("");

  const getData = async () => {
    try {
      const response = await fetch_user_details(user.token);
      setData(response.data.user);

      const uploadedAt: string = response.data.user_created_at[0].uploaded_at;

      const extracted_date: string = uploadedAt.split("T")[0];
      setCreatedAt(extracted_date);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProfilePhoto = async () => {
    if (user && user.token) {
      try {
        const data: string = await fetch_user_photo(user.token);

        console.log(`data is ${data}`);
        setProfilePhoto(data);
      } catch (error) {
        console.error("Failed to fetch profile photo:", error);
      }
    }
  };

  const handleDrop = (acceptedFiles: any[]) => {
    if (acceptedFiles.length > 0) {
      SetFormImage(acceptedFiles[0]);
    }

    setFileName(acceptedFiles[0].path);
  };

  async function send_image_api() {
    try {
      const formData = new FormData();
      formData.append("photo", FormImage);

      await api.patch("/api/v1/users/update-me", formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("There was an error uploading your image.");
    }
  }

  useEffect(() => {
    if (user.token) {
      getData();
      fetchProfilePhoto();
    }
  }, [user.token]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles: File[]) => handleDrop(acceptedFiles),
    multiple: false,
    accept: "image/*" as any,
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "500px",
        width: "500px",
        margin: "50px auto",
        position: "relative",
        backgroundColor: "white",
        overflow: "hidden",
        transition: "transform 1s ease, box-shadow 1s ease",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: 10,
        },
      }}
    >
      <Box
        sx={{
          background: "linear-gradient(to right, #1E3A8A, #3B82F6)",
          width: "100%",
          height: "20%",
          boxShadow: "10px",
        }}
      ></Box>

      <Avatar
        sx={{
          position: "absolute",
          top: "65px",
          backgroundColor: "white",
          left: "215px",
          width: "70px",
          height: "70px",
        }}
        alt="Profile"
        src={profilePhoto || undefined}
      />

      <Box sx={{ padding: "15px", alignItems: "center" }}>
        {data.map((user) => (
          <div key={user.id}>
            <Typography
              variant="h6"
              style={{
                color: "#333333",
                textAlign: "center",
                fontSize: "1.3rem",
                letterSpacing: "1px",
                marginTop: "26px",
                fontWeight: "bold",
              }}
            >
              {user.username}
            </Typography>

            <Typography
              variant="h6"
              style={{
                color: "#333333",
                textAlign: "center",
                fontSize: "1.3rem",
                letterSpacing: "1px",
              }}
            >
              role: {user.role}
            </Typography>

            <Typography
              variant="h6"
              style={{
                color: "#333333",
                textAlign: "center",
                fontSize: "1.3rem",
                letterSpacing: "1px",
              }}
            >
              id: {user.id}
            </Typography>

            <Typography
              variant="h6"
              style={{
                color: "#333333",
                textAlign: "center",
                fontSize: "1.3rem",
                letterSpacing: "1px",
              }}
            >
              created_at: {createdAt}
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "15px",
                gap: "25px",
              }}
            >
              <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} style={{ display: "none" }} />
                <Typography variant="h6">
                  Drag & Drop your photo here
                </Typography>
              </div>

              <Typography
                sx={{ fontSize: "17px", position: "absolute", bottom: "0px" }}
                variant="h6"
              >
                {fileName}
              </Typography>

              <Button onClick={send_image_api} variant="contained">
                Upload
              </Button>
            </Box>
          </div>
        ))}
      </Box>

      <Box
        sx={{
          backgroundColor: "white",
          width: "100%",
          flexGrow: 1,
          boxShadow: "20px",
        }}
      ></Box>
    </Box>
  );
};
