import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData (assessment : string, completedOn : string) {
  return { assessment, completedOn };
}

const rows = [
  createData('Assessment ref : 123', "12/12/2021"),
  createData('Assessment ref : 124', "12/13/2021"),
  createData('Assessment ref : 125', "12/14/2021"),
  createData('Assessment ref : 126', "12/15/2021"),
  createData('Assessment ref : 127', "12/16/2021"),
];

export default function AssessmentHistory() {
  return (
    <TableContainer component={Paper}>
        <Table sx={{width: "100%" }} size="small" aria-label="a dense table">
            <TableHead>
                <TableRow>
                    <TableCell sx={{fontSize: "15px", fontWeight: "bold"}}>Previous assessment</TableCell>
                    <TableCell align="right" sx={{fontSize: "15px", fontWeight: "bold"}}>View all</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Assessment reference</TableCell>
                    <TableCell align="right">Completed On</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((row, index) => (
                    <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">
                        {row.assessment}
                    </TableCell>
                    <TableCell align="right">{row.completedOn}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
  );
}
