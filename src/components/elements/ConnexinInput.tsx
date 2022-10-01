import React, { useState } from "react"
import { Box, TextField } from "@mui/material"
import { makeStyles } from "@material-ui/core/styles"; 
import { inputLabelClasses } from "@mui/material/"
import { Theme } from "@emotion/react";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const useStyles: any = makeStyles( (theme: Theme) => ({
    root: {
        borderBottom: "2px solid white",
        overflow: "hidden",
        color: "white",
    }
}));

export default function ConnexinInput({ label, type, elementChange }: {label: string, type: "text" | "password" | "number" | "date", elementChange: (param1: string, param2: string) => void }) {
    const classes = useStyles();
    const style = { sx: { color: "white", [`&.${inputLabelClasses.shrink}`]: { color: "white" } } }
    const [date, setDate] = useState("");
    
    const changeValue = (event: any)=>{
        elementChange( label, event.target.value )
    }
    
    return (
        <>
            <Box sx={{mt: 2, mb : 2}}>
                { type != "date" ? (
                    <TextField onChange={changeValue} type={type} InputLabelProps={style} InputProps={{ classes, disableUnderline: true }} sx={{ input: { color: 'white' }, mb: 2 }} label={label} variant="standard" fullWidth /> ) : (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label={label} value={ date == "" ? null : dayjs(date)}
                        InputProps={{ classes, disableUnderline: true }}
                        onChange={(newValue) => {
                            elementChange( label, newValue != null ? newValue.format('YYYY-MM-DD') : "" )
                            setDate(newValue != null ? newValue.format('YYYY-MM-DD') : "")
                        }} renderInput={(params) => <TextField {...params} variant={"standard"} InputLabelProps={style} fullWidth />} />
                    </LocalizationProvider>)
                }
            </Box>
        </>
    )
}