import React, { useState } from 'react';
import { Route, BrowserRouter, Routes, Link } from "react-router-dom";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Races from '../../components/Races';
import Drivers from '../../components/Drivers';
import Teams from '../../components/Teams';
import FastestLapAward from '../../components/FastestLapAward';

  
export default function Home() {

      const [tabValue, setTabValue] = useState(0);

      const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
      };

      function a11yProps(index: number) {
        return {
          id: `simple-tab-${index}`,
          "aria-controls": `simple-tabpanel-${index}`
        };
      }
      function LinkTab(props: any) {
        return (
          <Tab
            component={Link}
            //   onClick={(event) => {
            //     event.preventDefault();
            //   }}
            to={props.pathname}
            {...props}
          />
        );
      }

  return (
    <div>
        <BrowserRouter>
            <h1>RACE RESULT F1</h1>
            <Box sx={{ width: '100%', borderColor: 'divider', borderBottom: 1, marginBottom: '50px'}}>
                <Box sx={{ marginLeft: '10%'}}>
                    <Tabs  value={tabValue} onChange={handleChangeTab} aria-label="basic tabs example">
                        <LinkTab label="RACES" pathname='/' {...a11yProps(0)}/>
                        <LinkTab label="DRIVERS" pathname='/drivers' {...a11yProps(1)}/>
                        <LinkTab label="TEAMS" pathname="/teams" {...a11yProps(2)}/>
                        <LinkTab label="DHL FASTEST LAP AWARD" pathname="/fastestLapAward" {...a11yProps(3)}/>
                    </Tabs>
                </Box>
            </Box>
            <Routes>
                <Route path="/" element={<Races/>} />
                <Route path="/drivers" element={<Drivers/>} />
                <Route path="/teams" element={<Teams/>} />
                <Route path="/fastestLapAward" element={<FastestLapAward/>} />
            </Routes>
        </BrowserRouter>
    </div>
  )
}
