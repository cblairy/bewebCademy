import BadgeList from "../components/BadgeList";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import NavBar from "../components/layout/NavBar";
import BadgeListUser from "../components/BadgeListUser";
import Modification from "../components/forms/Modification"

import { useState } from 'react';
import { Box } from "@mui/system";

const Profil: React.FC = () => {

    function ProfilComponents(onglet: any) {
        return (
            <div className="profil">
                <Header />
                <Box sx={{ display: 'flex' }}>
                    <NavBar />
                    <Box sx={{ width: '20vw', float: 'left' }}></Box>

                    <Box height='100vh' width='80vw' sx={{ p: 2 }}>
                        {onglet}
                    </Box>
                </Box>
                <Footer />
            </div>
        )
    }

    switch (window.location.pathname) {
        case "/profil/gestion":
            return (
                ProfilComponents(
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <h2 style={{ textAlign: 'center', color: '#DB1144'}}>Gestion du compte</h2>
                        <Modification />
                    </div>)
            )
        case "/profil/badges":
            return (
                ProfilComponents(
                    <div>
                        <h2 style={{ textAlign: 'center', color: '#DB1144'}}>Badges obtenus</h2>
                        <BadgeListUser />
                    </div>
                )
            )
        default:
            return (
                ProfilComponents(
                    <div>
                        <h2 style={{ textAlign: 'center', color: '#DB1144'}}>Gestion du compte</h2>
                        <Modification />
                    </div>)
            )
    }

}

export default Profil;
