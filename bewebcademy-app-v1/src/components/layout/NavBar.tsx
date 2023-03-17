import { Button, ButtonBase, Divider, IconButton, ListItemIcon, ListItemText, MenuItem, MenuList, Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import "./navBar.css";
import React from 'react';
import { ThemeProvider, createTheme, makeStyles } from "@mui/material/styles";
import Modification from '../forms/Modification';
import { useKeycloak } from "@react-keycloak/web";

import { useNavigate } from "react-router-dom";

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import BadgeList from "../BadgeList";
import ClassNameGenerator from "@mui/utils/ClassNameGenerator";


const menuExerciceList = {
    "title": "Liste des langages",
    "list": ["html", "css", "javascript", "php", "sql"]
}

const menuProfilList = {
    "title": ["Gestion-du-compte", "Mes-badges"],
    "listComponents": [
        <Modification />,
        <BadgeList />
    ]
}

function TabPanel(props: any) {
    const { children, value, index, ...other } = props;
    return (
        <div role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}
                >
                    <Typography textAlign={'center'}>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function tabProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,

    };
}

export default function NavBar() {

    const { keycloak, initialized } = useKeycloak();
    const regex = new RegExp('\/exercices\/[a-z]')
    let navigate = useNavigate();
    const routeChange = (language: any) => {
        let path = '/exercices/' + language;
        navigate(path);
    }
    const routeChangeProfil = (onglet: any) => {
        let path = '/profil/' + onglet;
        navigate(path);
    }

    let role = localStorage.getItem("role")

    if (window.location.pathname === "/exercices" || window.location.pathname === "/exercices/" || window.location.pathname.match(regex)) {
        return (
            <ThemeProvider theme={theme}>
                <nav className="leftNavBar">
                    <Box className="boxItems" sx={{ textAlign: 'center', width: '100%' }}>
                        <h1 style={{ color: '#db1144' }}>{menuExerciceList.title}</h1>

                        {menuExerciceList.list.map((language) => (
                            <><Divider />
                                <Button
                                    name={language}
                                    onClick={event => routeChange(language)}
                                    fullWidth={true}
                                    sx={{
                                        color: '#FFF',
                                        height: '60px',
                                        transition: '0.5s',
                                        '&:hover': {
                                            pl: '25px',
                                            color: '#db1144'
                                        }
                                    }}
                                >
                                    <Box className="languageButton">
                                        <ArrowForwardIosIcon sx={{ height: "10px" }} />
                                        {language}
                                    </Box>
                                </Button>
                            </>
                        ))}
                        <Divider />
                    </Box>
                </nav >
            </ThemeProvider>
        )
    } else if (role === "formateur") {
        return (
            <ThemeProvider theme={theme}>
                <nav className="leftNavBar">
                    <Box className="boxItems" sx={{ textAlign: 'center' }}>

                        <Divider />
                    </Box>
                </nav>
            </ThemeProvider>
        )
    } else {
        return (
            <ThemeProvider theme={theme}>
                <nav className="leftNavBar">
                    <Box className="boxItems" sx={{ textAlign: 'center' }}>
                        <h1>Profil</h1>

                        <Divider />
                        <Button
                            name="Gestion du compte"
                            onClick={event => routeChangeProfil("gestion")}
                            fullWidth={true}
                            sx={{ color: '#FFF', height: '60px', transition: '0.5s', '&:hover': { pl: '25px', color: '#db1144' } }}
                        >
                            <Box className="languageButton">
                                <ArrowForwardIosIcon sx={{ height: "10px" }} />
                                Gestion du compte
                            </Box>
                        </Button>

                        <Divider />
                        <Button
                            name="Gestion du compte"
                            onClick={event => routeChangeProfil("badges")}
                            fullWidth={true}
                            sx={{ color: '#FFF', height: '60px', transition: '0.5s', '&:hover': { pl: '25px', color: '#db1144' } }}
                        >
                            <Box className="languageButton">
                                <ArrowForwardIosIcon sx={{ height: "10px" }} />
                                Badges
                            </Box>
                        </Button>
                    </Box>
                </nav>
            </ThemeProvider>
        )
    }
}

const theme = createTheme({
    typography: {
        fontSize: 15,
    },
    components: {
        MuiTabs: {
            styleOverrides: {
                indicator: {
                    backgroundColor: 'orange',
                    height: 3,
                    color: '#db1144'
                },
            },
        },
    },
    palette: {
        primary: {
            main: '#1D1D1D',
        },
        secondary: {
            main: '#DB1144',
        },
        background: {
            paper: '#1D1D1D',
        },
        text: {
            primary: '#1D1D1D',
            secondary: '#DB1144',
        },
        action: {
            active: '#001E3C',
        }
    }
})
