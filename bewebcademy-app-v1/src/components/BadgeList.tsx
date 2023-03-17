import * as React from "react";
import Box from "@mui/material/Box";
import "./layout/BadgeList.css";
import { useEffect, useState } from "react";
import { getBadges } from "../services/badge.service";
import { Grid, Typography } from "@mui/material";
import CreateBadgeForm from "./forms/CreateBadge";

const BadgeList = () => {
  const [badges, setBadges] = useState<any>([]);

  useEffect(() => {
    const fetchBadges = async () => {
      const data = await getBadges().then((result: any) => {
        return result;
      });
      setBadges(data);
    };
    fetchBadges().catch(console.error);
  }, []);

  return (
    <div>
      <Grid
        container
        display="flex"
        justifyContent="center"
        alignItems="center"
        height={"100%"}
        mt={"5%"}
      >
        <Grid item xs={8}>
          <Typography variant="h3">Badges ({badges.length}) </Typography>
        </Grid>
        <Grid item xs={8}>
          <Grid container columns={{ xs: 2, sm: 6, md: 8 }}>
            {badges.map((badge: any, index: any) => (
              <Grid xs={2} sm={2} md={2} key={index}>
                <Box>
                  <Box className="flex-center">
                    <img
                      className="widthImg"
                      src={badge.image}
                      alt={badge.name}
                    />
                  </Box>
                  <Box className="flex-center">
                    <Typography>{badge.name}</Typography>
                  </Box>
                  <Box className="flex-center">
                    <Typography>{badge.acquisition_date}</Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <div>
            <CreateBadgeForm />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default BadgeList;
