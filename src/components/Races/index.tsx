import React, { useEffect, useState } from 'react';
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import getDataResults from '../../utils/handleCsv';
import DataTable from '../DataTable';
import {
    FormControl,
    InputAdornment,
    TextField,
  } from "@mui/material";
import { ColumnRacesResults , DataRaceResult} from '../../utils/type';


export default function Races() {

    const columns: ColumnRacesResults[] = [
        { id: 'id', label: 'No', minWidth: 50 },
        { id: 'grandPrix', label: 'GrandPrix', minWidth: 150 },
        {
          id: 'date',
          label: 'Date',
          minWidth: 100,
        },
        {
          id: 'winner',
          label: 'Winner',
          minWidth: 200,
        },
        {
          id: 'car',
          label: 'Car',
          minWidth: 200,
        },
        {
          id: 'laps',
          label: 'Laps',
          minWidth: 50,
        },
        {
          id: 'time',
          label: 'Time',
          minWidth: 170,
        },
      ];
    
      const [showClearIcon, setShowClearIcon] = useState("none");
      const [keywordSearch, setKeywordSearch] = useState('')
    
      const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setShowClearIcon(event.target.value === "" ? "none" : "flex");
        setKeywordSearch(event.target.value);
      };
    
      const handleClick = (): void => {
        // TODO: Clear the search input
        setKeywordSearch('')
      };
    
      const [raceResults, setRaceResults] = useState<DataRaceResult[]>([]);
      const [raceResultsSearch, setRaceResultsSearch] = useState<DataRaceResult[]>([]);
    
      useEffect(() => {
        getDataRaceResults();
      }, [])
    
      useEffect(() => {
        getDataRaceResultsBySearch();
      }, [keywordSearch])
    
      function getDataRaceResultsBySearch() {
          const resultSearch = raceResults.filter(result => 
              result.grandPrix.includes(keywordSearch) ||
              result.date.includes(keywordSearch) ||
              result.winner.includes(keywordSearch) ||
              result.car.includes(keywordSearch) ||
              result.laps.includes(keywordSearch) ||
              result.time.includes(keywordSearch)
              )
          setRaceResultsSearch(resultSearch);
      }

    async function getDataRaceResults() {
        setRaceResults(await getDataResults('dataset/race_results.csv'));
        setRaceResultsSearch(await getDataResults('dataset/race_results.csv'))
    }
  
  return (
    <div>
        <FormControl >
            <TextField
            size="small"
            variant="outlined"
            onChange={handleChangeSearch}
            InputProps={{
                startAdornment: (
                <InputAdornment position="start">
                    <SearchIcon />
                </InputAdornment>
                ),
                endAdornment: (
                <InputAdornment
                    position="end"
                    style={{ display: showClearIcon }}
                    onClick={handleClick}
                >
                    <ClearIcon />
                </InputAdornment>
                )
            }}
            />
        </FormControl>

        <DataTable columns={columns} resultData={raceResults} />
    </div>
  )
}
