import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function CheckboxOpinion({problem_state, proNum, data, value }: {problem_state: any, proNum : number, data: string[], value: any}){
    const handlechange = (index: number) => {
        const temp = value == '' ? Array(data.length).fill(false) : value;
        temp[index] = temp[index] == true ? false : true;
        problem_state(temp, proNum)
    }
    return (
        <>
            <FormGroup aria-label="position" row sx={{textAlign: "center", pr: 4, pl: 4}} >
                {data.map((item: string, index: number) => {
                    const temp = value == '' ? Array(data.length).fill(false) : value;
                    return <FormControlLabel key={index} sx={{m: "auto"}}  onChange={() => handlechange(index)} control={ <Checkbox checked={temp[index]} /> } label={item} />
                })}
            </FormGroup>
        </>
    )
}