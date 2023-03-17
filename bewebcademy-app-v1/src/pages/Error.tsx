import React from 'react';
import { Box, Button, Typography } from '@mui/material';

export default function Error() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: "#1d1d1b",
      }}
    >
      <Typography variant="h1" style={{ color: 'white' }}>
        404
      </Typography>
      <Typography variant="h6" style={{ color: '#db1144' }}>
        La page est introuvable.
      </Typography>
      <Button variant="contained" sx={{ bgcolor: '#db1144', '&:hover': { bgcolor: 'white', color:"#db1144"}, marginTop: "20px"}} href="/">Page d'accueil</Button>
    </Box>
  );
}