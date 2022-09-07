import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import React, { useEffect, useState} from 'react';
import { Button, Stack } from '@mui/material';

export default function MultiSelectOpinion({problem_state, proNum = 0, data=[], value }: {problem_state: any, proNum: number, data: any, value: string[] }) {
    
    const [items, setItems] = useState<string[]>([])

    const handleChange = (item_value: string, index: number) => {
        const temp = items;
        temp[index] = item_value;
        problem_state(temp, proNum)
    };

    const addMore = () => {
        setItems([...items, '']) //simple value
    }

    useEffect(()=>{
        setItems(value)
    }, [value])

    return (
        <>
            <Stack spacing={2} direction={"column"} sx={{p: 2}}>
                {items.map((item_value: string, item_index: number) => {
                    return (<FormControl  key={item_index} sx={{mt: 2, mr: "auto", ml: "auto", width:"100%"}}>
                        <InputLabel id="demo-simple-select-label">Answer {item_index + 1}</InputLabel>
                        <Select  value={item_value} label="Opinion" onChange={(event) => {handleChange(event.target.value, item_index)}} >
                            {data.map((item: any, index: number) => {
                                return <MenuItem key={index} value={item}>{item}</MenuItem>
                            })}
                        </Select>
                    </FormControl>)    
                })}
                <Button variant={"text"} onClick={addMore} >Add more +</Button>
            </Stack>
        </>
    )
}