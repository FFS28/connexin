import React from "react";
import { Button, Divider, Stack, TextField } from "@mui/material";

export default function AddListInputfield({data, changeData}: {data: {title: string, value: number, unit: string}[], changeData: (param: {title: string, value: number, unit: string}[]) => void }) {

    const change_list = (value: any, type: number, index: number) => {
        const temp = data;
        if(type == 1)
            temp[index].title = value
        if(type == 2)
            temp[index].value = value
        if(type == 3)
            temp[index].unit = value
        changeData(temp)
    }

    const add_list = () => {
        const temp = data;
        temp.push({title: "", value: 0, unit: temp.length == 0 ? "" : temp[0].unit})
        changeData(temp)
    }

    return (
        <>
            {data.map((item: {title: string, value: number, unit: string}, index: number) => {
                return (<Stack key={index} spacing={2} direction={"column"} >
                    <Divider sx={{mt: 1, mb: 1}} />
                        <TextField label="Unit title" variant="outlined" defaultValue={item.title} onChange={(event) => {change_list(event.target.value, 1, index)}} />
                        <TextField type={"number"} label="Unit Value" variant="outlined" defaultValue={item.value} onChange={(event) => {change_list(event.target.value, 2, index)}} />
                        <TextField label="Unit" variant="outlined" defaultValue={item.unit} onChange={(event) => {change_list(event.target.value, 3, index)}} />
                </Stack>)
            })}
            <Button variant="outlined" onClick={add_list} >Add List</Button>
        </>
    )
}