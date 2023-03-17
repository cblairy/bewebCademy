import * as React from 'react';
import Box from '@mui/material/Box';
import './layout/BadgeList.css'
import Grid from '@mui/material/Unstable_Grid2';
import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import User from '../models/user';
import { getSessionByUserId } from '../services/session.service';


export default function BadgeListUser() {

const [userBadges, setUserBadges] = useState<any>([])

const newUser: User = JSON.parse(localStorage.getItem("user") || "")
  
  useEffect(() => {
    getSessionByUserId(newUser.id)
    .then((result) => {
      if(result == undefined){
        setUserBadges([])
      } else {
        console.log(result);
      
        setUserBadges(result.badges)
      }
      
    })
    .catch((error) => console.log(error)
    )
  }, [])

  return (
    <Box>
      <Typography variant="h3">Badges({userBadges.length}) </Typography>
      <Grid container columns={{ xs: 2, sm: 6, md: 8 }}>
        {userBadges.map((badge: any, index: any) => (
          <Grid xs={2} sm={2} md={2} key={index}>
                <Box>
                  <Box className='flex-center'>
                    <img className='widthImg' src={badge.image} alt={badge.name} />
                  </Box>
                  <Box className='flex-center'>
                    <Typography>{badge.name}</Typography>
                  </Box>
                  <Box className='flex-center'>
                    <Typography>{badge.acquisition_date.split('T', 1)}</Typography>
                  </Box>
                </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}