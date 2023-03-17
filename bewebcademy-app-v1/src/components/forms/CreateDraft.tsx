import * as React from "react";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import {
  Button,
  Container,
  createTheme,
  Grid,
  Modal,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { createBeforeDraft } from "../../services/beforeDraft.service";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

export default function CreateDraft() {
  const [start, setStart] = useState<Dayjs | null>(null);
  const [end, setEnd] = useState<Dayjs | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data: any) => {
    data.start_date = start;
    data.end_date = end;
    await createBeforeDraft(data);
    reset();
    handleModal();
  };

  const [open, setOpen] = useState(false);
  const handleModal = () => setOpen(!open);

  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <Button
          onClick={handleModal}
          variant="contained"
          sx={{ bgcolor: "#db1144", "&:hover": { bgcolor: "#1d1d1b" } }}
        >
          Créer une nouvelle draft
        </Button>
        <Modal
          open={open}
          onClose={handleModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "absolute" as "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "50vw",
              bgcolor: "background.paper",
              borderRadius: "15px",
              boxShadow: 24,
              p: 4,
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack spacing={3}>
                <fieldset
                  style={{
                    borderRadius: "15px",
                    margin: "25px",
                    width: "50vw",
                  }}
                >
                  <legend style={{ marginLeft: "25px" }}>
                    Créer une nouvelle draft
                  </legend>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{ margin: "10px" }}>
                      <Grid
                        container
                        spacing={1}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Grid item xs={12} sm={3}>
                          <TextField
                            {...register("name", { required: true })}
                            id="outlined-basic"
                            color="error"
                            label="Nom"
                            variant="outlined"
                            sx={{ input: { borderRadius: "4px" } }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <DesktopDatePicker
                            label="Date de debut"
                            inputFormat="DD/MM/YYYY"
                            value={start}
                            onChange={(newValue) => {
                              setStart(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} color="error" />}
                          />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <DesktopDatePicker
                            label="Date de fin"
                            inputFormat="DD/MM/YYYY"
                            value={end}
                            minDate={start}
                            onChange={(newValue) => {
                              setEnd(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} color="error" />}
                          />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <Button
                            type="submit"
                            variant="contained"
                            sx={{
                              bgcolor: "#db1144",
                              "&:hover": { bgcolor: "#1d1d1b" },
                            }}
                          >
                            Enregistrer
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                  </form>
                </fieldset>
              </Stack>
            </LocalizationProvider>
          </Box>
        </Modal>
      </Container>
    </ThemeProvider>
  );
}
