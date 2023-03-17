import { Box } from "@mui/system";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import NavBar from "../components/layout/NavBar";
import { useNavigate } from "react-router-dom";



import { useState } from 'react';
import e from "express";
import ListTable from "../components/ListTable";

const ExerciceList: React.FC = () => {

  let navigate = useNavigate();

  const routeChange = (event: any) => {
    let path = `/exercices/html`;
    navigate(path);
  }

  // const [myComponent, setMycomponent] = useState('');
  // const handleClick: any = (event: any, component: any) => {
  //   setMycomponent(component);
  // };

  function allMyComponent(language: string): any {
    return (
      <div className="exerciceList">
        <Header></Header>
        <Box sx={{ display: 'flex' }}>
          <NavBar />
          <Box sx={{ width: '20vw', float: 'left' }}></Box>
          <Box height='100vh' width='80vw' sx={{ p: 2 }}>
            <h2>Badges {language}</h2>
            <ListTable language={language} />
          </Box>
        </Box>
        <Footer></Footer>
      </div>
    )
  }

  switch (window.location.pathname) {
    case "/exercices/html":
      return allMyComponent('HTML')
    case "/exercices/css":
      return allMyComponent('CSS')
    case "/exercices/javascript":
      return allMyComponent('JavaScript')
    case "/exercices/php":
      return allMyComponent('PHP')
    case "/exercices/sql":
      return allMyComponent('SQL')
    default:
      return allMyComponent('html')
  }
}
export default ExerciceList;
