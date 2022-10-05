import React, { useEffect, useState } from "react"
import { Grid, TextField } from "@mui/material"
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function DateSelect({problem_state, proNum = 0, value="" }: {problem_state: any, proNum :number, value: any }){

    const [real, setReal] = useState("")

    useEffect(() => {
        setReal(value)
    }, [value])

    return (
        <>
            <Grid container spacing={2} sx={{mt: 2, pl: 4, pr: 2}}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker value={ real == "" ? null : dayjs(real)}
                    inputFormat={"DD/MM/YYYY"}
                    onChange={(newValue) => {
                        problem_state(newValue != null ? newValue.format('YYYY-MM-DD') : "", proNum)
                        setReal(newValue != null ? newValue.format('YYYY-MM-DD') : "")
                    }} renderInput={(params) => <TextField {...params} variant={"outlined"} fullWidth />} />
                </LocalizationProvider>
            </Grid>
        </>
    )
}