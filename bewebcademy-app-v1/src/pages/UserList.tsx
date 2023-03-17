import { useEffect, useState } from "react"
import { getUsers } from '../services/keycloak.service'
import User from '../models/user'
import Header from "../components/layout/Header"
import { DataGrid, GridColDef, } from '@mui/x-data-grid';
import { Grid, Typography } from "@mui/material"

export default function UserList(props: any): any {

    const [users, setUsers] = useState<User[]>([])

    const columns: GridColDef[] = [
      { field: 'username', headerName: 'Pseudo', width: 150 },
      { field: 'firstName', headerName: 'Prenom', width: 150 },
      { field: 'lastName', headerName: 'Nom', width: 150 },
      { field: 'email', headerName: 'E-mail', width: 300 }
    ];

  
    useEffect(() => {
      getUsers().then((user: User[]) => {
        setUsers(user)
      }
      )
    }, [])
    
return(
  <div>
    <Header />
    <Grid container display="flex" justifyContent="center" alignItems="center" height={"100%"} mt={"5%"}>
    <Grid item xs={8}>
        <Typography variant="h3" >Utilisateurs ({users.length}) </Typography>
        </Grid>
      <Grid item xs={8}>
      <div style={{ height: 525,}}>
      <DataGrid
        rows={users}
        columns={columns}
        pageSize={8}
        rowsPerPageOptions={[8]}
      />
    </div>
    </Grid>
    </Grid>
  </div>
)
}