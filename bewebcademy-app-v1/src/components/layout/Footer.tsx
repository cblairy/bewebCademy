import { Button, Link, Typography } from "@mui/material"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import { useRef, useState } from "react"

import "./footer.css"

const regex = new RegExp('\/exercice\/[a-z0-9]')


const Footer = () => {

  const refButtonNextExercice: any = useRef(null)
  const [enabledButton, setEnabledButton]: any = useState("disabled")


  // ================================================
  // FONTION A INTEGRER A LA FIN D'UN EXERCICE (change la couleur du btn et l'active)
  const handleButton = () => {
    setEnabledButton('contained')
    refButtonNextExercice.current.disabled = false
  }
  // ================================================

  if (window.location.pathname.match(regex)) {
    return (
      <ThemeProvider theme={theme} >
        <footer>
          <Typography
            variant="h6"
            bgcolor={'#1D1D1D'}
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              height: '4vh',
              width: '100vw',
              color: '#FFF',
              fontSize: '2vh',
              textAlign: 'center',
              justifyItems: 'center',
              alignItems: 'center'
            }}
          >
            <Button variant='outlined' color="secondary" onClick={handleButton} sx={{ p: 0.7, fontSize: '1vh', color: 'text.primary', height: '3vh', width: '40%' }}>Precedent</Button>
            3/11  {/* INTEGRER LES VARIABLES DU NOMBRES DE PAGES ICI */}
            <Button variant={enabledButton} ref={refButtonNextExercice} color='secondary' sx={{ p: 0.7, fontSize: '1vh', color: 'text.primary', height: '3vh', width: '40%', '&:disabled': { bgColor: theme.palette.secondary.main, color: 'white' } }}>Suivant</Button>
          </Typography>
        </footer>
      </ThemeProvider>
    )
  } else return (
    <ThemeProvider theme={theme}>
      <footer>
        <Typography
          variant="h6"
          bgcolor={'#1D1D1D'}
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '4vh', width: '100vw' }}
        >
          <Link
            href="https://fondespierre.com/nos-poles-de-competences/beweb-ecole-numerique/developpeur-web/"
            underline="hover"
            color="#FFF"
            variant="inherit"
            sx={{ p: 0.5 }}
          >
            fondespierre.com
          </Link>
        </Typography>
      </footer>
    </ThemeProvider>
  )
}


const theme: any = createTheme({
  typography: {
    fontSize: 10,
  },

  palette: {
    primary: {
      main: '#1D1D1D',
    },
    secondary: {
      main: '#DB1144',
    },
    neutral: {
      main: '#FFFFFF'
    },
    background: {
      paper: '#1D1D1D',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#DB1144',
    },
    action: {
      active: '#001E3C',
    }
  }
})

export default Footer;