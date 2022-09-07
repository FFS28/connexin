import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectOpinion({problem_state, proNum, data, value }: {problem_state: any, proNum: number, data: string[], value: string }) {
    const [opinion, setOpinion] = React.useState("");
    const handleChange = (event: any) => {
        setOpinion(event.target.value);
        problem_state(event.target.value, proNum)
    };

    React.useEffect(()=>{
        setOpinion(value)
    }, [value])

    return (
        <>
            <FormControl sx={{mt: 2, width: "90%"}}>
                <InputLabel id="demo-simple-select-label">Answer</InputLabel>
                <Select labelId="demo-simple-select-label" value={opinion} label="Opinion" onChange={handleChange} >
                    {data.map((item: any, index: number) => {
                        return <MenuItem key={index} value={item}>{item}</MenuItem>
                    })}
                </Select>
            </FormControl>
        </>
    )
}