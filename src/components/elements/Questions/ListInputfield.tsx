import React, { useEffect, useState } from "react"
import { Divider, Grid, Stack, TextField, Typography } from "@mui/material"

export default function ListInputfield({problem_state, proNum = 0, data, value }: {problem_state: any, proNum :number, data: {title: string, value: number, unit: string}[], value: number[] }){
    
    const [real, setReal] = useState<number[]>([])

    const change_value = (value : string, index: number) => {
        const temp = real;
        temp[index] = Number.parseInt(value)
        setReal([...temp])
        problem_state(temp, proNum)
    }

    useEffect(()=>{
        setReal([...value])
    }, [value])
    return (
        <>
            <Stack direction={"column"} spacing={2} sx={{mt: 2, pl: 2, pr: 2}}>
                {data.map((item: {title: string, value: number, unit: string}, index: number) => {
                    return (
                        <Grid container key={index} >
                            <Grid item xs={8}>
                                <Typography variant={"subtitle1"} component={"div"} sx={{textAlign:"left"}} >{item.title}</Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <TextField variant={"outlined"} type={"number"} defaultValue={real[index] || 0} onChange={(event) => {change_value(event.target.value, index)}} sx={{width: "60px"}} />
                            </Grid>
                            <Grid item xs={2}>
                                <Typography variant={"subtitle1"} component={"div"}> = {item.value} {item.unit}</Typography>
                            </Grid>
                        </Grid>
                    )
                })}
                <Divider sx={{mt: 1, mb: 1}} />
                <Typography variant="h6" component={"div"}>Total units {value.map((item: number, index: number) => {
                    return item * data[index].value;  
                }).reduce((a: number, b: number) => a + b, 0)} {data.length != 0 ? data[0].unit: ""}</Typography>
            </Stack>
            
        </>
    )
}