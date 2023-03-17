import * as React from 'react';
import {useState, useEffect } from "react"
import dayjs, { Dayjs } from 'dayjs';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { Button, Grid, Typography } from '@mui/material';
import { useForm } from "react-hook-form";
import { updateBeforeDraft } from '../../services/beforeDraft.service';
import { getBeforeDraftById } from "../../services/beforeDraft.service"

import Box from "@mui/material/Box";
import BeforeDraft from '../../models/beforeDraft';

export default function ModifDraft(props:any) {
    const [start, setStart] = useState<Dayjs | null>();
    const [end, setEnd] = useState<Dayjs | null>();
    const  [draft, setDraft] = useState<BeforeDraft>()
    const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm();

    useEffect(()=> {
        setDraft(props.draft)
        setStart(props.draft.start_date)
        setEnd(props.draft.end_date)
    }
    ,[])

    const onSubmit = async(data:any) => {
        if (start && end && draft) {
            draft.start_date = dayjs(start).toDate()
            draft.end_date = dayjs(end).toDate()
            draft.name = data.name
            await updateBeforeDraft(draft._id, draft)
            reset()
            window.location.reload()
        }
    }
    
    return (
      <Box 
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "absolute" as "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "50vw",
        bgcolor: "background.paper",
        borderRadius: "15px",
        boxShadow: 24,
        p: 4,
      }}
>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack spacing={3}>
        <fieldset
                  style={{
                    borderRadius: "15px",
                    margin: "25px",
                    width: "50vw",
                  }}
                >
                  <legend style={{ marginLeft: "25px" }}>
                    Modifier une draft
                  </legend>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{ margin: "10px" }}>
                      <Grid
                        container
                        spacing={1}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Grid item xs={12} sm={3}>
                          <TextField
                            {...register("name", { required: true })}
                            id="outlined-basic"
                            color="error"
                            label="Nom"
                            variant="outlined"
                            defaultValue={props.draft.name}
                            sx={{ input: { borderRadius: "4px" } }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <DesktopDatePicker
                            label="Date de debut"
                            inputFormat="DD/MM/YYYY"
                            value={start}
                            minDate={start}
                            onChange={(newValue) => {
                              setStart(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} color="error" />}
                          />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <DesktopDatePicker
                            label="Date de fin"
                            inputFormat="DD/MM/YYYY"
                            value={end}
                            minDate={start}
                            onChange={(newValue) => {
                              setEnd(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} color="error" />}
                          />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <Button
                            type="submit"
                            variant="contained"
                            sx={{
                              bgcolor: "#db1144",
                              "&:hover": { bgcolor: "#1d1d1b" },
                            }}
                          >
                            Enregistrer
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                  </form>
                </fieldset>
        </Stack>
      </LocalizationProvider >
      </Box>
    );
  }