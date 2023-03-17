import { useEffect, useState } from "react";
import { getUsers } from "../services/keycloak.service";
import Header from "../components/layout/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Grid, Typography } from "@mui/material";
import Language from "../models/language";
import { getLanguages } from "../services/language.service";
import Footer from "../components/layout/Footer";
import CreateLanguageForm from "../components/forms/CreateLanguage";

export default function LanguageList(props: any): any {
  const [languages, setLanguages] = useState<Language[]>([]);

  const columns: GridColDef[] = [
    { field: "name", headerName: "Nom afficher", width: 150 },
    { field: "monaco", headerName: "Nom monaco", width: 150 },
  ];

  useEffect(() => {
    getLanguages().then((language: Language[]) => {
      setLanguages(language);
    });
  }, []);
  console.log(languages);

  return (
    <div>
      <Header />
      <Grid
        container
        display="flex"
        justifyContent="center"
        height={"100%"}
        mt={"5%"}
      >
        <Grid item xs={8}>
          <Typography variant="h3">langages ({languages.length}) </Typography>
        </Grid>
        <Grid item xs={8}>
          <div style={{ height: 525 }}>
            <DataGrid
              rows={languages}
              columns={columns}
              pageSize={8}
              getRowId={(row: any) => row.name + row.monaco}
              rowsPerPageOptions={[8]}
            />
          </div>
        </Grid>
        <Grid item xs={12} mt={'20px'}>
          <div>
            <CreateLanguageForm />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
