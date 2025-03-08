import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import torchLogo_light from "../assets/torch-light.svg";
import torchLogo_dark from "../assets/Torch-dark.svg";
import { useAuthContext } from "../hooks/UseAuthContext";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import { fetch_user_photo } from "../services/Get-User-Photo";
import { useThemeContext } from "../hooks/useThemeContext";
import { ThemeColors } from "../utils/ThemeColors";
import moment from "moment";
import Switch from "@mui/material/Switch";

export const Navbar = () => {
  const { user, dispatch } = useAuthContext();
  const { Theme, setTheme, Change_Theme } = useThemeContext();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [time, setTime] = useState<string>(moment().format("HH:mm:ss"));
  const navigate = useNavigate();
  const settings = ["Profile", "Account", "Home", "Logout"];
  const label = { inputProps: { "aria-label": "Switch demo" } };

  let decoded: any = null;
  let username: any = null;

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  if (user && user.token) {
    decoded = jwtDecode(user.token);
    username = decoded.user_name;
  }

  const fetchProfilePhoto = async (): Promise<void> => {
    if (user && user.token) {
      try {
        decoded = jwtDecode(user.token);
        username = decoded.user_name;

        const data: string = await fetch_user_photo(user.token);

        setProfilePhoto(data);
      } catch (error) {
        console.error("Failed to fetch profile photo:", error);
      }
    }
  };

  useEffect(() => {
    fetchProfilePhoto();

    const intervalId = setInterval(() => {
      setTime(moment().format("HH:mm:ss"));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [user]);

  const handle_logout = (): void => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  const handleSettingClick = (setting: string) => {
    switch (setting) {
      case "Profile":
        navigate("/me");
        break;
      case "Account":
        navigate("/account");
        break;
      case "Home":
        navigate("/");
        break;
      case "Logout":
        handle_logout();
        break;
      default:
        break;
    }
    handleCloseUserMenu();
  };

  return (
    <div className="root-layout">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
          padding: "15px",
          height: "40px",
          backgroundColor: ThemeColors(Theme),
          justifyContent: "flex-end",
          boxShadow: 1,
        }}
      >
        {Theme === "light" ? (
          <img
            src={torchLogo_light}
            alt="Torch logo"
            style={{ height: "40px", width: "30", marginRight: "auto" }}
          />
        ) : (
          <img
            src={torchLogo_dark}
            alt="Torch logo"
            style={{ height: "40px", width: "30", marginRight: "auto" }}
          />
        )}

        {!user && (
          <>
            <NavLink className="login_link" to="/login">
              login
            </NavLink>
            <NavLink className="register_link" to="/register">
              register
            </NavLink>
          </>
        )}

        <Typography
          variant="h6"
          style={{
            color: "#333333",
            left: "50%",
            fontSize: "1.5rem",
            letterSpacing: "1px",
            position: "absolute",
          }}
        >
          {time}
        </Typography>

        {user && (
          <>
            <Typography
              variant="h6"
              style={{
                color: "#333333",
                textAlign: "center",
                fontSize: "1.3rem",
                letterSpacing: "1px",
              }}
            >
              Welcome, {username}
            </Typography>

            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenUserMenu}
              color="inherit"
            >
              <Avatar alt="Profile" src={profilePhoto || undefined} />
            </IconButton>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => handleSettingClick(setting)}
                >
                  <Typography sx={{ textAlign: "center" }}>
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </>
        )}
      </Box>

      <main>
        <Outlet />
      </main>

      <Switch
        onChange={() => Change_Theme()}
        sx={{ position: "fixed", bottom: 50, right: 70 }}
        {...label}
        defaultChecked
      />
    </div>
  );
};
