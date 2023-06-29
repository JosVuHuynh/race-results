import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import {
    FormControl,
    InputAdornment,
    TextField,
  } from "@mui/material";

interface Column {
    id: 'id' | 'grandPrix' | 'date' | 'winner' | 'car' | 'laps' | 'time';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

  
interface DataRaceResult {
    id?: number;
    grandPrix: string;
    date: string;
    winner: string;
    car: string;
    laps: string;
    time: string
}

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    },
}));
  
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function Races() {

    const columns: readonly Column[] = [
        { id: 'id', label: 'No', minWidth: 50 },
        { id: 'grandPrix', label: 'GrandPrix', minWidth: 150 },
        {
          id: 'date',
          label: 'Date',
          minWidth: 100,
          align: 'right',
        },
        {
          id: 'winner',
          label: 'Winner',
          minWidth: 170,
        },
        {
          id: 'car',
          label: 'Car',
          minWidth: 170,
        },
        {
          id: 'laps',
          label: 'Laps',
          minWidth: 50,
          align: 'right',
        },
        {
          id: 'time',
          label: 'Time',
          minWidth: 170,
          align: 'right',
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
    
      const [page, setPage] = React.useState(0);
      const [rowsPerPage, setRowsPerPage] = React.useState(10);
    
      const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
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
          const data = Papa.parse(await fetchCsv(), {header: true});
          setRaceResults(addId(data.data));
          setRaceResultsSearch(addId(data.data))
          return data;
      }
    
      async function fetchCsv() {
          const response = await fetch('dataset/race_results.csv');
          const reader = response.body?.getReader();
          const result = await reader?.read();
          const decoder = new TextDecoder('utf-8');
          const csv = await decoder.decode(result?.value);
          return csv;
      }
    
      function addId(arr: any) {
        return arr.map((obj: DataRaceResult, index: number) =>{
          return Object.assign({}, obj, { id: index });
        });
      };
    
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

        <Paper sx={{ width: '80%', overflow: 'hidden' , margin: '0 auto', marginTop: '50px'}}>
        <TableContainer sx={{ maxHeight: 500 }}>
            <Table stickyHeader aria-label="sticky table">
            <TableHead>
                <TableRow>
                {columns.map((column) => (
                    <StyledTableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth, fontSize: 16}}
                    >
                    {column.label}
                    </StyledTableCell>
                ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {raceResultsSearch
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                    return (
                    <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                        {columns.map((column) => {
                        const value = row[column.id];
                        return (
                            <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                                ? column.format(value)
                                : value}
                            </TableCell>
                        );
                        })}
                    </StyledTableRow>
                    );
                })}
            </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={raceResultsSearch.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
        </Paper>
    </div>
  )
}
