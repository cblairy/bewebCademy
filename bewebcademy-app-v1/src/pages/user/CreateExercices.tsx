import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import Editor from "../../components/layout/MonacoEditor";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import "../../theme/_variables_bewebcademy.scss";
import { Button, Grid, TextareaAutosize } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

import { createExercice } from "../../services/exercice.service"
import { getBadgeById, getBadges } from "../../services/badge.service"
import Badge from "../../models/badge";
import Exercice from "../../models/exercice"

const CreateExercice = () => {
  const [exercices, setExercices] = useState<Exercice[]>([]);
  const [srcDoc, setSrcDoc] = useState("");
  const [html, sethtml] = useState("");
  const [css, setcss] = useState("");
  const [javascript, setjavascript] = useState("");
  const [index, setIndex] = useState(0);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [message, setMessage] = useState("");
  const open = Boolean(anchorEl);
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
  const [badgeSelect, setBadgeSelect] = useState<any>([])

  useEffect(() => {
    const fetchBadges = async () => {
      const badges: any = await getBadges().then(result => { return result })
      setBadgeSelect(badges)
    }
    fetchBadges()
  }, [])

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
          <html>
            <body>
                ${html}
            </body>
            <style>
                ${css}
            </style>
            <script>
                ${javascript}
            </script>
          </html>
        `);
    }, 250);

    return () => clearTimeout(timeout);
  }, [html, css, javascript]);

  //replace code \n and ; and space and replace " by '
  const replaceCode = (code: string) => {
    return code
      .replace(/(\r\n|\n|\r)/gm, "")
      .replace(/;/g, "")
      .replace(/ /g, "")
      .replace(/"/g, "'");
  };


  const onSubmit = async (data: any) => {
    let result = replaceCode(srcDoc);
    data.result = result;
    console.log(data);
    const badge = await getBadgeById(data.badges)
    data.badges = badge
    await createExercice(data)
    sethtml("")
    setcss("")
    setjavascript("")
    reset()
  };

  const style = {
    width: "14vw",
    height: "4vh",
    border: "2px solid #1d1d1b",
    borderRadius: "5px",
    outline: "none",
    fontSize: "1rem",
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} >
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={2}>
          <Grid container spacing={2} m={"0.1vh"}>
            <Grid item xs={12}>
              <label>Nom de l'exercice</label>
            </Grid>
            <Grid item xs={12}>
              <input {...register("name", { required: true })} style={style} />
            </Grid>
            <Grid item xs={12}>
              {errors.name && <span style={{ color: 'red' }}>Nom requis</span>}
            </Grid>
            <Grid item xs={12}>
              <label>Badge</label>
            </Grid>
            <Grid item xs={12}>
              <select {...register("badges", { required: true })} style={style}>
                <option value=""></option>
                {badgeSelect.map((badge: Badge, index: number) => (

                  <option value={badge._id} key={index}>{badge.name}</option>
                ))}


              </select>
            </Grid>
            <Grid item xs={12}>
              {errors.badges && <span style={{ color: 'red' }}>Badge requis</span>}
            </Grid>
            <Grid item xs={12}>
              <label>Énoncé de l'exercice</label>
            </Grid>
            <Grid item xs={12}>
              <TextareaAutosize {...register("statement", { required: true })} style={style} />
            </Grid>
            <Grid item xs={12}>
              {errors.statement && <span style={{ color: 'red' }}>Énoncé requis</span>}
            </Grid>
            <Grid item xs={12}>
              <label>Lien d'une documentation</label>
            </Grid>
            <Grid item xs={12}>
              <input {...register("help", { required: true })} style={style} />
            </Grid>
            <Grid item xs={12}>
              {errors.help && <span style={{ color: 'red' }}>Lien requis</span>}
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" sx={{ bgcolor: '#db1144', '&:hover': { bgcolor: '#1d1d1b' }, alignSelf: "end" }}>  Valider </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs>
          <Grid container rowSpacing={0}>
            <Grid item xs={6} borderRight={'1px solid grey'} borderBottom={'1px solid grey'}>
              <Editor
                language="html"
                displayName="html"
                help={exercices[index] === undefined ? '' : exercices[index].help}
                value={html}
                onChange={sethtml}
              />
            </Grid>
            <Grid item xs={6} borderLeft={'1px solid grey'} borderBottom={'1px solid grey'}>
              <Editor
                language="css"
                displayName="css"
                help={exercices[index] === undefined ? '' : exercices[index].help}
                value={css}
                onChange={setcss}
              />
            </Grid>
            <Grid item xs={6} borderRight={'1px solid grey'} borderTop={'1px solid grey'}>
              <Editor
                language="javascript"
                displayName="javascript"
                help={exercices[index] === undefined ? '' : exercices[index].help}
                value={javascript}
                onChange={setjavascript}
              />
            </Grid>
            <Grid item xs={6} borderLeft={'1px solid grey'} borderTop={'1px solid grey'}>
              <iframe
                srcDoc={srcDoc}
                title="output"
                sandbox="allow-scripts"
                frameBorder="0"
                width="100%"
                height="100%"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Footer />
        </Grid>
      </Grid>
    </form>
  );
};

export default CreateExercice;
