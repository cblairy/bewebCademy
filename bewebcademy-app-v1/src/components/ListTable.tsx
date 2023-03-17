import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// import { Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { getBadges } from '../services/badge.service';
import Badge from '../models/badge';
import Languages from '../models/language';
import { Link } from 'react-router-dom';

export default function ListTable(props: any): any {

  const [badges, setBadges] = useState<Badge[]>([])
  const session = JSON.parse(localStorage.getItem("session") || "")

  useEffect(() => {
    const fetchBadges = async () => {
      const ResulGetBadges = await getBadges().then((result: any) => { return result })
      setBadges(ResulGetBadges)
    }
    fetchBadges().catch(console.error)
  }, [])


  let htmlBadges: Badge[] = Array()
  let cssBadges: Badge[] = Array()
  let jsBadges: Badge[] = Array()
  let phpBadges: Badge[] = Array()
  let sqlBadges: Badge[] = Array()

  badges.map((badge: Badge) => {
    session.badges.map((sessionBadge: Badge) => {
      if (badge._id == sessionBadge._id) {
        badge.acquisition_date = sessionBadge.acquisition_date
        badge.all_done = sessionBadge.all_done
        console.log(badge);
      }
    })
    badge.language.map((language: Languages) => {
      switch (language.name) {
        case 'php':
          phpBadges.push(badge)
          break
        case 'JavaScript':
          jsBadges.push(badge)
          break
        case 'HTML':
          htmlBadges.push(badge)
          break
        case 'CSS':
          cssBadges.push(badge)
          break
        case 'SQL':
          sqlBadges.push(badge)
          break
        default:
          console.log("Il ne se passe rien (enfin si peut etre...)")
      }
    }
    )
  })

  let languageToDisplay = props.language

  function tableBadges(badgeName: Badge[]) {
    return (
      <TableContainer sx={{ width: '100%', margin: 'auto' }} component={Paper}>
        {/* <Typography variant="h3">Badges({badges.language.name})</Typography> */}
        <Table sx={{
          minWidth: 650,
          alignItems: 'center',
          border: 1
        }} aria-label="simple table">

          <TableHead >
            <TableRow>
              <TableCell sx={{ color: '#DB1144' }}>Titre Badge</TableCell>
              <TableCell sx={{ color: '#DB1144' }} align="center">Languages</TableCell>
              <TableCell sx={{ color: '#DB1144' }} align="center">Obtenu</TableCell>
              <TableCell sx={{ color: '#DB1144' }} align="center">Date</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>

            {badgeName.map((elementBadges: any, index: any) => (
              <TableRow
                key={elementBadges.name}
                sx={{  '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row" sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', height: '78px' }}>
                  <img src={elementBadges.image} style={{width: '75px'}}/>
                  <span>{elementBadges.name}</span>
                  {!elementBadges.all_done ? <Link to={`/exercices/${elementBadges._id}`} style={{ marginLeft: "25px" }}> Aller aux exercices</Link> : null}
                </TableCell>
                <TableCell align="center" sx={{ p:0 }}>
                  <ul style={{ padding: 0, height: '50px'}}>
                    {elementBadges.language.map((language: Languages) => (
                      <li style={{ listStyleType: 'none' }}>{language.name}</li>
                    ))}
                  </ul>
                </TableCell>

                <TableCell align="center">{elementBadges.all_done ? "oui" : "-"}</TableCell>
                <TableCell align="center">{elementBadges.acquisition_date ? elementBadges.acquisition_date.split('T', 1) : "-"}</TableCell>

              </TableRow>

            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  if (languageToDisplay === "HTML") {
    return tableBadges(htmlBadges)
  } else if (languageToDisplay === "CSS") {
    return tableBadges(cssBadges)
  } else if (languageToDisplay === "JavaScript") {
    return tableBadges(jsBadges)
  } else if (languageToDisplay === "PHP") {
    return tableBadges(phpBadges)
  } else if (languageToDisplay === "SQL") {
    return tableBadges(sqlBadges)
  } else {
    return tableBadges(htmlBadges)
  }
}




