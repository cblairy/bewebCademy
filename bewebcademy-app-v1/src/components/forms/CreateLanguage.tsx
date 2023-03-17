import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { Button, Box, createTheme, ThemeProvider, Container, Modal } from "@mui/material";
import { createLanguage } from "../../services/language.service";
import CssBaseline from "@mui/material/CssBaseline";
import { useState } from "react";

const style = {
  m: "25px",
  borderColor: "#db1144",
  color: "#db1144",
  outlineColor: "#db1144",
};
const CreateLanguageForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data: any) => {
    await createLanguage(data);
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
          Créer un nouveau langage
        </Button>
        <Modal
          open={open}
          onClose={handleModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: "50vw",
            bgcolor: 'background.paper',
            borderRadius: "15px",
            boxShadow: 24,
            p: 4,
          }}>
            <fieldset
              style={{ borderRadius: "15px", margin: "25px", width: "50vw" }}
            >
              <legend style={{ marginLeft: "25px" }}>
              Créer un nouveau langage
              </legend>
              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  color="secondary"
                  sx={style}
                  {...register("name", { required: true })}
                  label="langage"
                  variant="outlined"
                  placeholder="langage"
                />
                <TextField
                  color="secondary"
                  sx={style}
                  {...register("monaco", { required: true })}
                  label="monaco"
                  variant="outlined"
                  placeholder="monaco name"
                />
                <Button
                  sx={{
                    m: "25px",
                    borderColor: "#db1144",
                    color: "#db1144",
                    outlineColor: "#db1144",
                    "&:hover": {
                      bgcolor: "#db114440",
                      borderColor: "#db1144",
                    },
                  }}
                  type="submit"
                  variant="outlined"
                >
                  {" "}
                  Enregistrer{" "}
                </Button>
              </form>
            </fieldset>
          </Box>
        </Modal>
      </Container>
    </ThemeProvider>
  );
};

export default CreateLanguageForm;
