import React, { useEffect, useState } from "react"
import { Grid, TextField } from "@mui/material"

export default function TextAreaOpinion({problem_state, proNum = 0, value="" }: {problem_state: any, proNum : number, value: string }){
    
    const [real, setReal] = useState("")
    
    const change_content = (event: any) => {
        problem_state(event.target.value, proNum)   
    }

    useEffect(()=>{
        setReal(value)
    }, [value])

    return (
        <>
            <Grid container spacing={2} sx={{mt: 2, pl: 3, pr: 2}}>
                <TextField multiline label="Answer" value={real} onChange={change_content} variant="outlined" fullWidth />
            </Grid>
        </>
    )
}