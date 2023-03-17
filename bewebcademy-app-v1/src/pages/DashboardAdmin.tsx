import CreateBadgeForm from "../components/forms/CreateBadge";
import CreateLanguageForm from "../components/forms/CreateLanguage";
import Header from "../components/layout/Header";
import NavBar from "../components/layout/NavBar";
import { Box, Button, Grid, Typography } from "@mui/material";
import Footer from "../components/layout/Footer";
import { Link } from "react-router-dom";
import ListDraft from "../components/layout/ListDraft";
import CreateDraft from "../components/forms/CreateDraft";

const dashBoardAdmin = () => {
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
          <Typography variant="h3">Draft </Typography>
        </Grid>
        <Grid item xs={8}>
          <ListDraft />
        </Grid>
        <Grid item xs={12} mt={"20px"}>
          <div>
          <CreateDraft/>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default dashBoardAdmin;
