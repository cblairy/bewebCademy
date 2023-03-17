import React from 'react';
import { Routes, Route } from "react-router-dom";
import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from './auth/auth_keycloak';

import './app.css';

import ExerciceList from "./pages/ExerciceList";
import Exercice from './pages/user/Exercices';
import Profil from "./pages/Profil";
import Accueil from './pages/Accueil';
import CreateExercice from './pages/user/CreateExercices';
import UsersList from './pages/UserList'
import DashboardAdmin from './pages/DashboardAdmin';
import PrivateRoute from './helpers/PrivateRoute';
import BadgeList from './components/BadgeList';
import ListBadgesAdmin from './pages/ ListBadgesAdmin';
import LanguageList from './pages/LanguageList';
import PreselectUser from './pages/PreselectUser';
import SelectUser from './pages/SelectUser';



function App() {
  return (
    <div className='app'>
      <ReactKeycloakProvider authClient={keycloak} initOptions={{ checkLoginIframe: false, onLoad: 'check-sso', }}>
        <React.StrictMode>
          <Routes>
            <Route index element={<Accueil />} />
            <Route path='/home' element={<Accueil />}></Route>

            {/* USER ROUTES */}
            <Route path='/exercices' element={
              <PrivateRoute>
                <ExerciceList />
              </PrivateRoute>
            } />
            <Route path='/exercices/html' element={<ExerciceList />}></Route>
            <Route path='/exercices/css' element={<ExerciceList />}></Route>
            <Route path='/exercices/javascript' element={<ExerciceList />}></Route>
            <Route path='/exercices/php' element={<ExerciceList />}></Route>
            <Route path='/exercices/sql' element={<ExerciceList />}></Route>
            <Route path='/exercices/:badge' element={<Exercice />} />
            <Route path='/profil' element={
              <PrivateRoute>
                <Profil />
              </PrivateRoute>
            } />    
            <Route path='/profil/gestion' element={
              <PrivateRoute> 
                <Profil />
              </PrivateRoute>
            } />  
            <Route path='/profil/badges' element={
              <PrivateRoute>
                <Profil />
              </PrivateRoute>
            } />        

            <Route path='/html' element={<Exercice />}></Route>
            <Route path='/php' element={<Exercice />}></Route>
            <Route path='/sql' element={<Exercice />}></Route>
            <Route path='/exercice/html' element={<Exercice />}></Route>


            <Route path='/admin/dashboard' element={<DashboardAdmin />}></Route>

            {/* ADMIN ROUTES */}
            <Route path="/admin" element={
              <PrivateRoute roles="formateur">
                <DashboardAdmin />
              </PrivateRoute>
            } />
            <Route path="/admin/dashboard" element={
              <PrivateRoute roles="formateur">
                <DashboardAdmin />
              </PrivateRoute>
            } />
            <Route path='admin/creation' element={
              <PrivateRoute roles="formateur">
                <CreateExercice />
              </PrivateRoute>
            }></Route>
            <Route path='/admin/utilisateurs' element={
              <PrivateRoute roles="formateur">
                <UsersList />
              </PrivateRoute>
            }></Route>
            <Route path='/admin/languages' element={
              <PrivateRoute roles="formateur">
                <LanguageList />
              </PrivateRoute>
            }></Route>
            <Route path='/admin/badges' element={
              <PrivateRoute roles="formateur">
                <ListBadgesAdmin />
              </PrivateRoute>
            }></Route>
            <Route path='/admin/preselect-user/:draft' element={
              <PrivateRoute roles="formateur">
                <PreselectUser />
              </PrivateRoute>
            }></Route>
            <Route path='/admin/select-user/:draft' element={
              <PrivateRoute roles="formateur">
                <SelectUser />
              </PrivateRoute>
            }></Route>
            <Route path='/admin/archives' element={
              <PrivateRoute roles="formateur">
                RIEN POUR LE MOMENT
              </PrivateRoute>
            }></Route>

          </Routes>
        </React.StrictMode>
      </ReactKeycloakProvider>
    </div>
  );
}

export default App;
