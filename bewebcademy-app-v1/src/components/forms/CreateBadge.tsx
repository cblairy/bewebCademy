import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import {
  Button,
  Box,
  Modal,
  createTheme,
  ThemeProvider,
  Container,
} from "@mui/material";
import { createBadge } from "../../services/badge.service";
import { useEffect, useState } from "react";
import Language from "../../models/language";
import { getLanguages } from "../../services/language.service";
import Autocomplete from "@mui/material/Autocomplete";
import CssBaseline from "@mui/material/CssBaseline";

const style = {
  m: "25px",
  borderColor: "#db1144",
  color: "#db1144",
  outlineColor: "#db1144",
};

const CreateBadgeForm = () => {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [selectLanguages, setSelectLanguage] = useState<Language[]>([]);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    const fetchLanguage = async () => {
      const data = await getLanguages().then((result: any) => {
        return result;
      });
      setLanguages(data);
    };
    fetchLanguage().catch(console.error);
  }, []);

  const onSubmit = async (data: any) => {
    data.language = selectLanguages;
    createBadge(data);
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

        <Button onClick={handleModal} variant="contained" sx={{ bgcolor: '#db1144', '&:hover': { bgcolor: '#1d1d1b' }}}>Créer un nouveau badge</Button>
        <Modal
          open={open}
          onClose={handleModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
          sx={{
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
              style={{ borderRadius: "15px", width: "50vw", height: "30vh" }}
            >
              <legend style={{ marginLeft: "25px" }}>Créer un nouveau badge</legend>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <TextField
                    sx={style}
                    {...register("name", { required: true })}
                    label="Nom du badge"
                    variant="outlined"
                    placeholder="Nom du badge"
                  />
                  <TextField
                    sx={style}
                    {...register("image", { required: true })}
                    label="url image badge"
                    variant="outlined"
                    placeholder="url image badge"
                  />
                </Box>
                <Autocomplete
                  multiple
                  onChange={(e, data: Language[]) => {
                    setSelectLanguage(data);
                  }}
                  sx={{ maxWidth: "30vw", m: "auto" }}
                  id="tags-outlined"
                  options={languages}
                  getOptionLabel={(option: Language) => option.name}
                  //filterSelectedOptions
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      label="langages"
                      placeholder="Language"
                    />
                  )}
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
                  Enregistrer
                </Button>
              </form>
            </fieldset>
          </Box>
        </Modal>
      </Container>
    </ThemeProvider>
  );
};

export default CreateBadgeForm;
