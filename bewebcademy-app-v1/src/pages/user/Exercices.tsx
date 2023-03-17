import React, { useEffect, useState } from "react";
import Editor from "../../components/layout/MonacoEditor";
import { getExerciceByBadgeId } from "../../services/exercice.service";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import "../../theme/_variables_bewebcademy.scss";
import ExerciceInterface from "../../models/exercice";
import { Button, Grid, Popover, Typography } from "@mui/material";
import { updateSession } from "../../services/session.service";
import Session from "../../models/session";
import Badge from "../../models/badge";
import { getBadgeById, getBadges } from "../../services/badge.service";
import { addUsersToPreselect } from "../../services/beforeDraft.service";
import BeforeDraft from "../../models/beforeDraft";

const Exercice = () => {
  const [exercices, setExercices] = useState<ExerciceInterface[]>([]);
  const [badge, setBadge] = useState<Badge>()
  const [allBadges, setAllBadges] = useState<Badge[]>([])
  const [srcDoc, setSrcDoc] = useState("");
  const [html, sethtml] = useState("");
  const [css, setcss] = useState("");
  const [javascript, setjavascript] = useState("");
  const [index, setIndex] = useState(0);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [message, setMessage] = useState("");
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  let session: Session = JSON.parse(localStorage.getItem("session") || "")
  let draft: BeforeDraft = JSON.parse(localStorage.getItem("draft") || "")
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const fetchExercices = async (id: string) => {
      const data = await getExerciceByBadgeId(id).then((result: any) => 
      { 
        let exerxice: ExerciceInterface[] = []; 
        let myExercice: ExerciceInterface[] = session.exercices; 
        result.forEach((element: ExerciceInterface) => {
            // if exercice is not in myExercice add it
            if(!myExercice.find((exercice: ExerciceInterface) => exercice._id === element._id)) {
              exerxice.push(element)
            }
        });
        console.log(exerxice)
        return exerxice;
      });
      setExercices(data);
    };
    const getAllBadges = async () => {
      const data = await getBadges().then((result: any) => result);
      setAllBadges(data);
    };

    const getBadge = async (id: string) => {
      const badge = await getBadgeById(id).then((result: any) => { return result })
      setBadge(badge)
    }


    fetchExercices((window.location.href.substring(window.location.href.lastIndexOf('/') + 1))).catch(console.error);
    getBadge((window.location.href.substring(window.location.href.lastIndexOf('/') + 1))).catch(console.error);
    getAllBadges().catch(console.error);
  }, []);

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

  const valider = async (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    if (replaceCode(srcDoc) === exercices[index]?.result) {
      session.exercices.push(exercices[index])
      localStorage.setItem("session", JSON.stringify(session));
      sethtml('');
      setcss('');
      setjavascript('');
      await updateSession(session._id, session)
      if (index === exercices.length - 1) {
        setMessage("Bravo vous avez fini le badge");
        badge!.all_done = true;
        badge!.acquisition_date = new Date();
        session.badges.push(badge!)
        localStorage.setItem("session", JSON.stringify(session));
        await updateSession(session._id, session)
        if (session.badges.length === allBadges.length) {
          await addUsersToPreselect(draft._id , session.user)
        }
        window.location.href = "/exercices";
      } else {
        setMessage("Bravo vous avez fini l'exercice");
        setIndex(index + 1);
      }
    } else {
      setMessage("Dommage vous n'avez pas fini l'exercice");
    }
    setTimeout(() => {
      handleClose();
    }
      , 2000);
  };

  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <Header />
      </Grid>
      <Grid item xs={2}>
        <Grid container spacing={2} m={"0.1vh"}>
          <Grid item xs={12}>
            <p>Exercice : {exercices[index] === undefined ? '' : exercices[index].name}</p>
          </Grid>
          <Grid item xs={12}>
            <p>Badge : {exercices[index] === undefined ? '' : exercices[index].badges.name}</p>
          </Grid>
          <Grid item xs={12}>
            <p>Exercice {exercices[index] === undefined ? '' : index + 1} / {exercices.length}</p>
          </Grid>
          <Grid item xs={12}>
            <p>Statement : {exercices[index] === undefined ? '' : exercices[index].statement}</p>
          </Grid>
          <Grid item xs={12}>
            <Button aria-describedby={id} variant="contained" onClick={valider} sx={{ bgcolor: '#db1144', '&:hover': { bgcolor: '#1d1d1b' }, alignSelf: "end" }}>  Valider </Button>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'center',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'center',
                horizontal: 'left',
              }}
            >
              <Typography sx={{ p: 2, backgroundColor: '#1d1d1b', color: "#ffffff" }}>{message}</Typography>
            </Popover>

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
  );
};

export default Exercice;
