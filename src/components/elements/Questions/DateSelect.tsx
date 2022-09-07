import React, { useEffect, useState } from "react"
import { Grid, TextField } from "@mui/material"

export default function DateSelect({problem_state, proNum = 0, value="" }: {problem_state: any, proNum :number, value: any }){

    const [real, setReal] = useState("")

    const change_content = (event: any) => {
        problem_state(event.target.value, proNum)   
    }

    useEffect(() => {
        setReal(value)
    }, [value])

    return (
        <>
            <Grid container spacing={2} sx={{mt: 2, pl: 4, pr: 2}}>
                <TextField id="outlined-basic" type={"date"} value={real} onChange={change_content} variant="outlined" fullWidth />
            </Grid>
        </>
    )
}