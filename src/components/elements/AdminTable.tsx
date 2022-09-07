import React, { useContext, useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import AddTaskIcon from '@mui/icons-material/AddTask';
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';
import { Button, Dialog, DialogContent, Grid, IconButton, Pagination, Stack } from "@mui/material";
import { DialogProps } from '@mui/material/Dialog';

import MakeQuestion from "../subPages/Admin/Questions/makeQuestion";
import { AppContext } from "../../provider/index.provider";

function descendingComparator(a: any, b: any, orderBy: any) {
    if (b[orderBy] < a[orderBy]) { return -1; }
    if (b[orderBy] > a[orderBy]) { return 1; }
    return 0;
}

function getComparator(order: any, orderBy: any) {
    return order === 'desc' ? (a: any, b: any) => descendingComparator(a, b, orderBy) : (a: any, b: any) => -descendingComparator(a, b, orderBy);
}

function stableSort(array: any, comparator: any) {
    const stabilizedThis = array.map((el: any, index: number) => [el, index]);
    stabilizedThis.sort((a: any, b: any) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) { return order; }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el: any) => el[0]);
}

function SearchInput({search}: {search: any}) {
    return (
      <Box sx={{ display: 'flex', float: "right", alignItems: 'center', width: 300, border: "1px solid grey", borderRadius: "4px" }}>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search"
          onChange={event => search(event.target.value)}
          inputProps={{ 'aria-label': 'Search In Table' }}
        />
        <IconButton type="button" aria-label="search">
          <SearchIcon />
        </IconButton>
      </Box>
    );
  }

function EnhancedTableHead(props: any) {
    const [open, setOpen] = useState(false);
    const {appState, setAppState} = useContext(AppContext);
    const handleClickOpen = (scrollType: DialogProps['scroll']) => () => { setOpen(true); setScroll(scrollType); }
    const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');
    const handleClose = () => { setOpen(false) }
    const { order, orderBy, onRequestSort, headCells, alertBody, search } = props;
    const createSortHandler = (property: any) => (event: any) => { onRequestSort(event, property) };

    return (
        <>
            <TableHead>
                <TableRow>
                    <TableCell colSpan={headCells.length + 1} >
                        <Stack direction={"row"} sx={{display: "inline"}} spacing={2}>
                            <SearchInput search={search} />
                            { alertBody=="makeQuestion" ? (<Button style={{float: "left"}} variant={"outlined"} color={"primary"} onClick={handleClickOpen('paper')} startIcon={<AddTaskIcon />} >Create</Button>) : null}
                        </Stack>                
                    </TableCell>
                </TableRow>
                <TableRow >
                    {headCells.map((headCell: any) => (
                        <TableCell key={headCell.id} sortDirection={orderBy === headCell.id ? order : false} >
                            <TableSortLabel active={orderBy === headCell.id} direction={orderBy === headCell.id ? order : 'asc'} onClick={createSortHandler(headCell.id)} >
                                {headCell.label}
                            </TableSortLabel>
                        </TableCell>
                    ))}
                    <TableCell padding={"checkbox"} sx={{ width: "5%", textAlign : "center" }} >Edit</TableCell>
                </TableRow>
            </TableHead>
            {alertBody=="makeQuestion" ? ( 
                <Dialog fullScreen open={open || (alertBody == "makeQuestion" && appState.editState)} scroll={scroll} onClose={handleClose} aria-labelledby={"alert-dialog-title"} aria-describedby={"alert-dialog-description"} maxWidth={false} >
                    <DialogContent dividers={scroll === 'paper'}>
                        <MakeQuestion close={handleClose} />
                    </DialogContent>
                </Dialog>
            ):null}
        </>
    );
}

const TPagination = ({ count, page, onPageChange }: { count: number, page: number, onPageChange: any }) => {
    const totalPages = Math.ceil(count / 10);
    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <Typography variant={"subtitle1"} component={"h6"} sx={{ mt: 2, mb: 2 }}>Page {page + 1} of {totalPages}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Stack sx={{justifyContent: "center", display: "flex", alignItems: "center", pt: 2}}>
                        <Pagination count={totalPages} page={page + 1} onChange={onPageChange} sx={{alignItems: "center", justifyContent: "center"}} />
                    </Stack>
                </Grid>
                <Grid item xs={3}>
                    <Typography variant={"subtitle1"} component={"h6"} sx={{ mt: 2, mb: 2 }}>Total Items : {count}</Typography>
                </Grid>
            </Grid>
        </Box>
    )
}


export default function ContentTable({rows, headCells, childrenTag, search, handle} : {rows: any, headCells: any, childrenTag: string, search: any, handle: any}) {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState<any[]>([]);
    const [page, setPage] = React.useState(0);
    const [dense] = React.useState(false);
    const [rowsPerPage] = React.useState(10);
    
    const handleRequestSort = (event: any, property: any) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: any) => {
        if (event.target.checked) {
            const newSelecteds: any = rows.map((item: any) => item.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event: any, name: any) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected: any = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event: any, newPage: number) => { setPage(newPage - 1) };

    const handleChange = (selectedRowNum: number) => {
        handle( selectedRowNum );
    }

    useEffect(()=>{
        setSelected([])
    }, [rows.length])

    const isSelected = (name: any) => selected.indexOf(name) !== -1;

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
    
    return (
        <>
            <Paper sx={{ width: '100%', border: "1px solid #CBCBCB", borderRadius: 0, pt : 1, pb: 1, mt: 6 }}>
                <TableContainer>
                    <Table sx={{ minWidth: 750 }} aria-labelledby={"tableTitle"} size={dense ? 'small' : 'medium'} >
                        <EnhancedTableHead alertBody={childrenTag} order={order} orderBy={orderBy} onRequestSort={handleRequestSort} headCells = {headCells} search={search} />
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any, index: number) => {
                                const isItemSelected = isSelected(index);
                                const labelId = `enhanced-table-checkbox-${index}`;
                                return (
                                    <TableRow hover onClick={(event: any) => handleClick(event, index)} role={"checkbox"} aria-checked={isItemSelected} tabIndex={-1} key={index} selected={isItemSelected} >
                                        
                                        {Object.values(row).map((cell: any, rowIndex: number) => {
                                            if(rowIndex > 0)
                                                return rowIndex == 1 ? (
                                                    <TableCell key={rowIndex} id={labelId}> {cell} </TableCell> ):(
                                                    <TableCell key={rowIndex} >{cell}</TableCell>
                                                );
                                        })}
                                        {childrenTag != "Report" ? <TableCell>
                                            <IconButton color="primary" component="label" onClick = {() => handleChange(index)} >
                                                <AppRegistrationOutlinedIcon />
                                            </IconButton>
                                        </TableCell> : null} 
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }} >
                                    <TableCell colSpan={headCells.length} />
                                </TableRow>
                            )}
                            {rows.length == 0? (
                                <TableRow >
                                    <TableCell colSpan={childrenTag == "Report" ? headCells.length + 1 : headCells.length + 2} sx={{textAlign: "center"}} > No Result </TableCell>
                                </TableRow>
                            ) : null}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TPagination count={rows.length} page={page} onPageChange={handleChangePage} />
            </Paper>
        </>
    );
}