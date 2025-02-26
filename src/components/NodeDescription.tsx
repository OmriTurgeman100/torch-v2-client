import { Typography, Box, TextField } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import { get_node_description } from "../services/Get-Node-Description";
import { useAuthContext } from "../Context/UseAuthContext";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import { post_node_description } from "../services/Post-Node-Description";
import EditIcon from "@mui/icons-material/Edit";
import { ToastContainer } from "react-toastify";
import { Bounce } from "react-toastify";
import { toast } from "react-toastify";
import { update_node_description } from "../services/Update-Node-Description";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Button from "@mui/material/Button";
import { delete_node_description } from "../services/Delete-Node-Description";

interface NodeDescProps {
  handle_close_view_description: () => void;
  node_id: number | null | undefined;
}

interface desc_data {
  id: number;
  parent: number;
  title: string;
  team: string;
  contact: string;
  description: string;
}

export const NodeDescription = ({
  handle_close_view_description,
  node_id,
}: NodeDescProps) => {
  const [descriptionData, setDescriptionData] = useState<desc_data[]>([]);
  const [formData, setFormData] = useState({
    team: "",
    contact: "",
    description: "",
  });
  const { user } = useAuthContext();
  const [EditTeamMode, setEditTeaMode] = useState<Boolean>(false);
  const [EditContactMode, setEditContactMode] = useState<Boolean>(false);
  const [DescriptionEditMode, setDescriptionEditMode] =
    useState<Boolean>(false);

  const [AskDelete, setAskDelete] = useState<Boolean>(false);

  const get_node_desc = async () => {
    try {
      const response = await get_node_description(user.token, node_id);
      setDescriptionData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    get_node_desc();
  }, [
    descriptionData,
    node_id,
    EditTeamMode,
    EditContactMode,
    DescriptionEditMode,
  ]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  async function handle_team_edit(id: number): Promise<void> {
    try {
      let { team } = formData;

      if (team === "") {
        team = "empty";
      }

      await update_node_description(user.token, id, team, null, null);

      setEditTeaMode(false);
    } catch (error) {
      console.error(error);
    }
  }

  async function handle_contact_edit(id: number): Promise<void> {
    try {
      let { contact } = formData;

      if (contact === "") {
        contact = "empty";
      }

      await update_node_description(user.token, id, null, contact, null);

      setEditContactMode(false);
    } catch (error) {
      console.error(error);
    }
  }

  async function handle_description_edit(id: number): Promise<void> {
    try {
      let { description } = formData;

      if (description === "") {
        description = "empty";
      }

      await update_node_description(user.token, id, null, null, description);
      setDescriptionEditMode(false);
    } catch (error) {
      console.error(error);
    }
  }

  const handleSave = async () => {
    try {
      let { team, contact, description } = formData;

      if (team === "") {
        team = "empty";
      }

      if (contact === "") {
        contact = "empty";
      }

      if (description === "") {
        description = "empty";
      }

      await post_node_description(
        user.token,
        node_id,
        team,
        contact,
        description
      );

      toast.success("Description created!", {
        style: {
          backgroundColor: "#0047AB",
          color: "white",
          fontWeight: "bold",
        },
      });
    } catch (error) {
      toast.error("Description failed!", {
        style: {
          backgroundColor: "#0047AB",
          color: "white",
          fontWeight: "bold",
        },
      });
      console.error(error);
    }
  };

  const handle_delete_node_description = async (
    node_description_id: number
  ) => {
    try {
      await delete_node_description(user.token, node_description_id);

      setAskDelete(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {descriptionData.length > 0 ? (
        <Box
          sx={{
            margin: "auto",
            width: "500px",
            height: "fit-content",
            backgroundColor: "white",
            padding: "15px",
            borderRadius: 5,
            boxShadow: 1,
          }}
        >
          {descriptionData.map((node_description) => (
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 1 }}
              key={node_description.id}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                {AskDelete === true ? (
                  <Box
                    sx={{ display: "flex", gap: "10px", alignItems: "center" }}
                  >
                    <Typography
                      variant="h4"
                      style={{
                        color: "black",
                        fontSize: "1.0rem",
                        letterSpacing: "1px",
                      }}
                    >
                      confirm delete ?
                    </Typography>

                    <Button
                      onClick={() =>
                        handle_delete_node_description(node_description.id)
                      }
                      variant="contained"
                      sx={{
                        backgroundColor: "#E11D48",
                        "&:hover": { backgroundColor: "#BE123C" },
                      }}
                    >
                      yes
                    </Button>
                    <Button
                      onClick={() => setAskDelete(false)}
                      variant="contained"
                      sx={{
                        backgroundColor: "#10B981",

                        "&:hover": { backgroundColor: "#059669" },
                      }}
                    >
                      no
                    </Button>
                  </Box>
                ) : (
                  <IconButton onClick={() => setAskDelete(true)}>
                    <DeleteForeverIcon />
                  </IconButton>
                )}

                <Typography
                  variant="h4"
                  style={{
                    color: "black",
                    fontSize: "1.0rem",
                    letterSpacing: "1px",
                  }}
                >
                  {node_description.title}
                </Typography>

                <IconButton onClick={handle_close_view_description}>
                  <CloseIcon />
                </IconButton>
              </Box>

              <Accordion sx={{ backgroundColor: "#e9ecef" }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Typography component="span">Team</Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{ backgroundColor: "#f8f9fa", position: "relative" }}
                >
                  {EditTeamMode === false ? (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        variant="h4"
                        style={{
                          color: "black",
                          fontSize: "1.0rem",
                          letterSpacing: "1px",
                        }}
                      >
                        {node_description.team}
                      </Typography>

                      <IconButton onClick={() => setEditTeaMode(true)}>
                        <EditIcon />
                      </IconButton>
                    </div>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <TextField
                        name="team"
                        value={formData.team}
                        onChange={handleInputChange}
                        variant="outlined"
                        sx={{ marginBottom: 2, width: "90%" }}
                      />

                      <IconButton
                        onClick={() => handle_team_edit(node_description.id)}
                      >
                        <CheckIcon />
                      </IconButton>
                    </div>
                  )}
                </AccordionDetails>
              </Accordion>

              <Accordion sx={{ backgroundColor: "#e9ecef" }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Typography component="span">Contact</Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{ backgroundColor: "#f8f9fa", position: "relative" }}
                >
                  {EditContactMode === false ? (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        variant="h4"
                        style={{
                          color: "black",
                          fontSize: "1.0rem",
                          letterSpacing: "1px",
                        }}
                      >
                        {node_description.contact}
                      </Typography>

                      <IconButton onClick={() => setEditContactMode(true)}>
                        <EditIcon />
                      </IconButton>
                    </div>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <TextField
                        fullWidth
                        name="contact"
                        value={formData.contact}
                        onChange={handleInputChange}
                        variant="outlined"
                        sx={{ marginBottom: 2 }}
                      />

                      <IconButton
                        onClick={() => handle_contact_edit(node_description.id)}
                      >
                        <CheckIcon />
                      </IconButton>
                    </div>
                  )}
                </AccordionDetails>
              </Accordion>

              <Accordion sx={{ backgroundColor: "#e9ecef" }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Typography component="span">Description</Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{ backgroundColor: "#f8f9fa", position: "relative" }}
                >
                  {DescriptionEditMode === false ? (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        variant="h4"
                        style={{
                          color: "black",
                          fontSize: "1.0rem",
                          letterSpacing: "1px",
                        }}
                      >
                        {node_description.description}
                      </Typography>

                      <IconButton onClick={() => setDescriptionEditMode(true)}>
                        <EditIcon />
                      </IconButton>
                    </div>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <TextField
                        fullWidth
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        variant="outlined"
                        multiline
                        rows={4}
                        sx={{ marginBottom: 2 }}
                      />

                      <IconButton
                        onClick={() =>
                          handle_description_edit(node_description.id)
                        }
                      >
                        <CheckIcon />
                      </IconButton>
                    </div>
                  )}
                </AccordionDetails>
              </Accordion>
            </Box>
          ))}
        </Box>
      ) : (
        <Box
          sx={{
            margin: "auto",
            width: "500px",
            height: "fit-content",
            backgroundColor: "white",
            padding: "15px",
            borderRadius: 5,
            boxShadow: 1,
            position: "relative",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Typography
              variant="h4"
              style={{
                color: "black",
                fontSize: "1.0rem",
                letterSpacing: "1px",
                margin: "auto",
              }}
            >
              Insert Description
            </Typography>

            <IconButton onClick={handle_close_view_description}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Team
          </Typography>
          <TextField
            fullWidth
            name="team"
            value={formData.team}
            onChange={handleInputChange}
            variant="outlined"
            sx={{ marginBottom: 2 }}
          />

          <Typography variant="h6">Contact</Typography>
          <TextField
            fullWidth
            name="contact"
            value={formData.contact}
            onChange={handleInputChange}
            variant="outlined"
            sx={{ marginBottom: 2 }}
          />

          <Typography variant="h6">Description</Typography>
          <TextField
            fullWidth
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            variant="outlined"
            multiline
            rows={4}
            sx={{ marginBottom: 2 }}
          />

          <IconButton
            onClick={handleSave}
            sx={{
              backgroundColor: "#4361ee",
              boxShadow: 5,
              position: "absolute",
              bottom: "-25px",
              left: "45%",
              "&:hover": {
                backgroundColor: "#4361ee",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
              },
            }}
          >
            <CheckIcon sx={{ color: "white", fontSize: 35 }} />
          </IconButton>
        </Box>
      )}

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
