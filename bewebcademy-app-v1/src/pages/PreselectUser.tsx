import { useEffect, useState } from "react";
import { getUsers } from "../services/keycloak.service";
import User from "../models/user";
import Header from "../components/layout/Header";
import { DataGrid, GridColDef, GridEventListener } from "@mui/x-data-grid";
import { Box, Button, Grid, Modal, Typography } from "@mui/material";
import {
  addUsersToDraft,
  getBeforeDraftById,
} from "../services/beforeDraft.service";
import BeforeDraft from "../models/beforeDraft";

export default function PreselectUser(props: any): any {
  let id = window.location.href.substring(
    window.location.href.lastIndexOf("/") + 1
  );

  const [users, setUsers] = useState<User[]>([]);
  const [usersSelected, setUsersSelected] = useState<User>();

  const columns: GridColDef[] = [
    { field: "username", headerName: "Pseudo", width: 150 },
    { field: "firstName", headerName: "Prenom", width: 150 },
    { field: "lastName", headerName: "Nom", width: 150 },
    { field: "email", headerName: "E-mail", width: 300 },
  ];

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 650,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  const [modal, setModal] = useState(false);
  const handleModal = () => {
    setModal(!modal);
  };

  const fetchUsers = async () => {
    getBeforeDraftById(id).then((draft: BeforeDraft) => {
      if (draft.pre_select != null) {
        setUsers(draft.pre_select);
      }
    });}

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRowClick: GridEventListener<"rowClick"> = (params) => {
    setUsersSelected(params.row);
    handleModal();
  };

  const selectUser = () => {
    if (usersSelected != null) {
    addUsersToDraft(id, usersSelected) 
    fetchUsers();
    window.location.reload();
    handleModal();
    };
  }
  return (
    <div>
      <Modal
        hideBackdrop
        open={modal}
        onClose={handleModal}
      >
        <Box sx={{ ...style, width: 650 }}>
          <Grid container display="flex" justifyContent="center" alignItems="center" height={"100%"} mt={"5%"}>
            <Grid item xs={12}>
                <Typography variant="h6">
                Voulez vous sélectionner cet utilisateur pour la prochaine draft.
                </Typography>
            </Grid>
            <Grid item xs={12} container>
                <Grid item xs={6} display="flex" justifyContent="center" alignItems="center">
                    <Button aria-describedby={id} variant="contained" onClick={handleModal} sx={{ bgcolor: '#db1144', '&:hover': { bgcolor: '#1d1d1b' } }}>  Annuler </Button>
                </Grid>
                <Grid item xs={6} display="flex" justifyContent="center" alignItems="center">
                    <Button aria-describedby={id} variant="contained" onClick={selectUser} sx={{ bgcolor: '#db1144', '&:hover': { bgcolor: '#1d1d1b' } }}>  Valider </Button>
                </Grid>
            </Grid>
          </Grid>  
        </Box>
      </Modal>
      <Header />
      <Grid
        container
        display="flex"
        justifyContent="center"
        alignItems="center"
        height={"100%"}
        mt={"5%"}
      >
        <Grid item xs={8}>
          <Typography variant="h3">
            Utilisateurs présélectionnés ({users.length}){" "}
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <div style={{ height: 525 }}>
            <DataGrid
              rows={users}
              columns={columns}
              pageSize={8}
              rowsPerPageOptions={[8]}
              onRowClick={handleRowClick}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
