import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import User from '../../models/user';
import { updateUser } from "../../services/keycloak.service"
import { useForm } from "react-hook-form";

const theme = createTheme();

const FormUpdate = () => {

  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();

  const newUser: User = JSON.parse(localStorage.getItem("user") || "")
  console.log(newUser);

  const [open, setOpen] = React.useState(false);
  const handleModal = () => setOpen(!open);

  const style = {
    height: "4vh",
    border: "2px solid #808080",
    borderRadius: "5px",
    outline: "none",
    fontSize: "1rem"
  };

  const onSubmit = async (data: any) => {

    let updatedUser: User = data ;
    updatedUser.id = newUser.id
    updateUser(newUser.id, updatedUser)
    localStorage.setItem("user", JSON.stringify(updatedUser))
    handleModal()
  }

  return (


    <ThemeProvider theme={theme}>
      <p>{newUser.username}</p>
      <p>{newUser.firstName}</p>
      <p>{newUser.lastName}</p>
      <p>{newUser.email}</p>
      <Container component="main" maxWidth="xs" >
        <CssBaseline />

        <Button onClick={handleModal}>Modifier mes informations</Button>
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
              width: 400,
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
            }}
          >

            <Typography component="h1" variant="h5" mb={3}>
              Modification
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)} >
            <Grid>
              <Grid container spacing={2}>
                <Grid justifyContent="center" alignItems="center">
                <Grid item xs={12}>
                  <Grid>
                    <label>pseudo</label>
                  </Grid>
                    <input {...register("username", { required: true })} style={style} defaultValue={newUser.username}/>
                </Grid>
                <Grid item xs={12}>
                  <Grid mt={1}>
                    <label>nom de famille</label>
                  </Grid>
                  <input {...register("firstName", { required: true })} style={style} defaultValue={newUser.firstName}/>
                </Grid>
                <Grid item xs={12}>
                <Grid mt={1}>
                  <label>prénom</label>
                </Grid>
                <input {...register("lastName", { required: true })} style={style} defaultValue={newUser.lastName}/>
                </Grid>
                <Grid item xs={12}>
                  <Grid mt={1}>
                    <label>email</label>
                  </Grid>
                  <input {...register("email", { required: true })} style={style} defaultValue={newUser.email}/>
                </Grid>
                </Grid>
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{ background: "#db1144" }}
                sx={{ mt: 3, mb: 2 }}
              >
                Valider
              </Button>
            </Grid>
            </form>
          </Box>
        </Modal>
      </Container>
    </ThemeProvider>
  );
}

export default FormUpdate;