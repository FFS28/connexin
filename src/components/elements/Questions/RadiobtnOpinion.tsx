import React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

export default function RadiobtnOpinion({problem_state, proNum, data, value }:{problem_state: any, proNum : number, data: string[], value:string}){
    const handleRadioChange = (event: any) => {
        problem_state(event.target.value, proNum)
    };
    return (
        <>
            <FormControl sx={{mt: 2}}>
                <RadioGroup aria-labelledby="demo-radio-buttons-group-label" row name="radio-buttons-group" value={value} onChange={handleRadioChange} >
                    {data.map((item: string, index: number) => {
                        return (<FormControlLabel key={index} value={item} control={<Radio />} label={item} />)    
                    })}
                </RadioGroup>
            </FormControl>
        </>
    )
}