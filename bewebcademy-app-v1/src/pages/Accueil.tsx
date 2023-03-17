import { Box, Grid, Button } from "@mui/material";
import Footer from "../components/layout/Footer";
import React, { useEffect, useState } from "react";
import { useKeycloak } from "@react-keycloak/web";
import { createSession, getSessionByUserId } from "../services/session.service";
import User from "../models/user";
import { checkDreaftOpen } from "../services/beforeDraft.service";

const Accueil = () => {

  //boolean to check if draft open or not
  const [draftOpen, setDraftOpen] = useState(false);

  checkDreaftOpen().then((res) => {
    if (res.tatus === 201) {
      localStorage.setItem("draft", JSON.stringify(res))
      setDraftOpen(true);
    }
    console.log("draftOpen", draftOpen);
  });

  const { keycloak, initialized } = useKeycloak();

  const checkSession = async () => {
    if (keycloak.authenticated) {
      let user: User = {
        id: keycloak.tokenParsed?.sub || "",
        username: keycloak.tokenParsed?.preferred_username || "",
        firstName: keycloak.tokenParsed?.family_name || "",
        lastName: keycloak.tokenParsed?.given_name || "",
        email: keycloak.tokenParsed?.email || ""
      }

      localStorage.setItem("user", JSON.stringify(user))
      
      const session = await getSessionByUserId(user.id);
      if (session) {
        console.log("Session existante");
        localStorage.setItem("session", JSON.stringify(session));
        if (keycloak.hasRealmRole("formateur")) {
          localStorage.setItem("role", "formateur")
          window.location.href = "/admin";
        } else {
          localStorage.setItem("role", "user")
          window.location.href = "/profil";
        }
      } else {
        console.log("Session non existante");
        const newSession = await createSession(user);
        localStorage.setItem("session", JSON.stringify(newSession));
        console.log(newSession);
        if (keycloak.hasRealmRole("formateur")) {
          localStorage.setItem("role", "formateur")
          window.location.href = "/admin";
        } else {
          localStorage.setItem("role", "user")
          window.location.href = "/profil";
        }
      }
    }
  }

  const login = () => {
    keycloak.login();
  }

  useEffect(() => {
    if (initialized) {
      checkSession();
    }
  }, [initialized]);


  return (
    <div>
      <Box sx={{ width: '100%', typography: 'body1', height: '97vh' }}>
        {!draftOpen
          ?
          (
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} height="100%">
              <Grid item xs={6} display="flex" justifyContent="center" alignItems="center">
                <img src="https://i.ibb.co/7ND1qzz/gcm-Rp-J7-400x400-removebg-preview.png" />
              </Grid>
              <Grid item xs={6} display="flex" justifyContent="center" alignItems="center">
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                  <Grid>
                    <h1 style={{ margin: "50px" }}>Une période de préparation pour une draft est en cours. Vous pouvez participer pour avoir une chance d'être sélectionné. Il vous faut juste réaliser les exercices et obtenir des badges.</h1>
                  </Grid>
                  <Grid>
                    <Button style={{ margin: "50px" }} onClick={login} variant="contained" sx={{ bgcolor: '#db1144', '&:hover': { bgcolor: '#1d1d1b' } }}>  Participez a la draft. </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ) :
          (
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} height="100%">
              <Grid item xs={6} display="flex" justifyContent="center" alignItems="center">
                <img src="https://i.ibb.co/7ND1qzz/gcm-Rp-J7-400x400-removebg-preview.png" />
              </Grid>
              <Grid item xs={6} display="flex" justifyContent="center" alignItems="center">
                <h1 style={{ margin: "100px" }}>Il n'y a pas de période de draft en cours, revenez plus tard.</h1>
              </Grid>
            </Grid>
          )}
      </Box>
      <Footer />
    </div>
  );
}

export default Accueil;
