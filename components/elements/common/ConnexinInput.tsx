import React, { useState, ChangeEvent } from "react"
import { Box, TextField } from "@mui/material"
import { inputLabelClasses } from "@mui/material/"
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


export default function ConnexinInput({ label, type, elementChange }: {
    label: string, 
    type: "text" | "password" | "number" | "date", 
    elementChange: (param1: string, param2: string) => void 
}) {
    const style = { sx: { color: "white", [`&.${inputLabelClasses.shrink}`]: { color: "white" } } }
    const [date, setDate] = useState("");
    
    const changeValue = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        elementChange( label, event.target.value )
    }
    
    return (
        <>
            <Box sx={{mt: 2, mb : 2}}>
                { type != "date" ? (
                    <TextField onChange={changeValue} type={type} InputLabelProps={style} InputProps={{ disableUnderline: true }} sx={{ input: { color: 'white' }, mb: 2 }} label={label} variant="standard" fullWidth /> 
                    ) : (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label={label} value={ date == "" ? null : dayjs(date)}
                        InputProps={{ disableUnderline: true }}
                        inputFormat={"DD/MM/YYYY"}
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