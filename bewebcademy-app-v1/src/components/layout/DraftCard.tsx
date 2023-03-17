import * as React from "react";
import { useState, useEffect } from 'react';
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { alpha, styled } from '@mui/material/styles';
import { pink } from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GroupIcon from '@mui/icons-material/Group';
import Modal from '@mui/material/Modal';
import { deleteBeforeDraftById } from "../../services/beforeDraft.service";
import ModifDraft from "../forms/ModifDraft";
// import ModifDraft from '../forms/ModifDraft';

const PinkSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: pink[600],
    '&:hover': {
      backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: pink[600],
  },
}));

export default function DraftCard(props:any) {
  const [loading, setLoading] = React.useState(true);
  const [start, setStart]= useState<string>("")
  const [end, setEnd]= useState<string>("")
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [updateData, setUpdateData] = useState<string>("")

  useEffect(()=>{        
      const startDate = props.draft.start_date.toString().split("T",1)
      const endDate = props.draft.end_date.toString().split("T",1)
      setStart(startDate)
      setEnd(endDate)
  },[props.draft])
  function handleClick() {
    setLoading(true);

  }
  const handleOpen = (e:any) => {
    setUpdateData(e.currentTarget.getAttribute("jojo-update"))
    setOpen(true)  };

  const deleteDraft = async (id: string) => {
    await deleteBeforeDraftById(id).then((result: any) => {
    }
    ).catch((err: any) => {
    }
    );
  };
  

  return (
    <Box sx={{ maxWidth: 350 }}>
      <Card variant="outlined">
        <React.Fragment>
          <CardContent>
            <Typography variant="h6" component="div">
            <Box>
              <FormControlLabel
                sx={{
                  display: "block",
                  float: "right",
                  margin:"20px",
                  marginTop:"5px",
                }}
                control={
                  <PinkSwitch
                    checked={loading}
                    onChange={() => setLoading(!loading)}
                    name="loading"
                  />
                }
                label=""
              />
            </Box>
              Session {props.draft.name}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary" textAlign="center">
              Du {start} au {end}
            </Typography>
          </CardContent>
            <Box display="flex" justifyContent="flex-end" width="100%">
            <IconButton aria-label="delete" size="small" href={`/admin/preselect-user/${props.draft._id}`}>
              <GroupAddIcon fontSize="small" sx={{
                color: pink[600],
              }}/>
            </IconButton>
            <IconButton aria-label="delete" size="small" href={`/admin/select-user/${props.draft._id}`}>
              <GroupIcon fontSize="small" sx={{
                color: pink[600],
              }}/>
            </IconButton>
            <IconButton aria-label="delete" size="small" onClick={(() => deleteDraft(props.draft._id))}>
              <DeleteIcon fontSize="small" sx={{
                color: pink[600],
              }}/>
            </IconButton>
            <IconButton  onClick={handleOpen} jojo-update={props.draft._id}>
            <EditIcon fontSize="small" sx={{
              color: pink[600],
            }}></EditIcon>
            </IconButton>
            <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
            >
              <ModifDraft handleClose={handleClose} draft={props.draft}/>
            </Modal>
            </Box>
        </React.Fragment>
      </Card>
    </Box>
  );
}
