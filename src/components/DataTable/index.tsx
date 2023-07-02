import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { DataTableProps} from '../../utils/type';

import {
    FormControl,
    InputAdornment,
    TextField,
  } from "@mui/material";
import { getRaceResultsBySearch } from '../../utils/handleSearch';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
    // backgroundColor: theme.palette.common.black,
    backgroundColor: '#f1f5f9',
    //color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    },
}));
  
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(even)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function DataTable({columns, resultData, typeTable, handleChangeSearch}: DataTableProps) {
  
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);  
  
    const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement >) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
  
  return (
    <div>
        <Paper sx={{ width: '80%', overflow: 'hidden' , margin: '0 auto', marginTop: '50px'}}>
        <TableContainer sx={{ maxHeight: 500 }}>
            <Table stickyHeader aria-label="sticky table">
            <TableHead>
                <TableRow>
                    {columns.map((column) => (
                        <StyledTableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth, fontSize: 14, color: 'gray', fontWeight: 'bold', 
                                    paddingTop: (column.id === 'id' || column.id === 'time' || column.id === 'laps' || column.id === 'pts') ? '40px': '',
                                }}
                        >
                        {column.label}
                            {   
                                !(column.id === 'id' || column.id === 'time' || column.id === 'laps' || column.id === 'pts') &&
                                <FormControl style={{display: 'block'}}>
                                       <TextField
                                        size="small"
                                        variant="outlined"
                                        onChange={event => {handleChangeSearch(event.target.value, column.id)}}
                                        InputProps={{
                                            startAdornment: (
                                            <InputAdornment position="start">
                                                {/* <SearchIcon /> */}
                                            </InputAdornment>
                                            ),
                                            endAdornment: (
                                            <InputAdornment
                                                position="end"
                                                style={{ }}
                                            >
                                            </InputAdornment>
                                            ),
                                            
                                        }}
                                       />
                                   </FormControl>
                            }
                     
                        </StyledTableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {resultData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: any) => {
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
            count={resultData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
        </Paper>
    </div>
  )
}
