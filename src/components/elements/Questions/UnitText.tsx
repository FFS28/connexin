import React, { useEffect, useState } from "react"
import { Divider, Box, Typography, Stack } from "@mui/material"

export default function UnitText({problem_state, proNum, value, data }: {problem_state: any, proNum :number, value: string, data: string[] }){
    
    const [real, setReal] = useState("")
    const [realUnit, setRealUnit] = useState("")

    const change_content = (value: string, index: number) => {
        let temp = real;
        if(index == 1){
            temp = value + "&" + (temp.split("&")[1] ? temp.split("&")[1] : "");
        }
        if(index == 2){
            temp = temp.split("&")[0] + "&" + value;
        }
        if(index == 0){
            temp = value;
        }
        setReal(temp)
        problem_state(temp.concat("@" + realUnit), proNum)
    }

    const change_Unit = (selected: number) => {
        setRealUnit(data[selected])
        problem_state(real.concat("@" + data[selected]), proNum)
    }


    useEffect(()=>{
        setRealUnit(value.split("@")[1] ? value.split("@")[1] : "" )
        if(value.split("@")[1] == "ft")
            setReal(value.split("@")[0])
        else
            setReal(value.split("@")[0].split("&")[0])
    }, [value])
    
    return (
        <>
            <Box sx={{mt: 2, pl: 3, pr: 2}}>
                {realUnit == "ft" ? (
                    <Stack direction={"row"} sx={{justifyContent: "center"}} spacing={2} >
                        <input value={real.split("&")[0]} onChange={(event) => change_content(event.target.value, 1)}  style={{width: "80px", height: "80px", fontSize: "50px", border: "none", textAlign: "center"}} /> 
                        <Typography variant={"h5"} component={"label"} sx={{verticalAlign: "bottom", paddingTop: "30px"}} >ft</Typography> 
                        <input value={real.split("&")[1] ? real.split("&")[1] : ""} onChange={(event) => change_content(event.target.value, 2)}  style={{width: "80px", height: "80px", fontSize: "50px", border: "none", textAlign: "center"}} /> 
                        <Typography variant={"h5"} component={"label"} sx={{verticalAlign: "bottom", paddingTop: "30px"}}>in</Typography>     
                    </Stack>
                ) : (
                    <input value={real} onChange={(event) => change_content(event.target.value, 0)}  style={{width: "80px", height: "80px", fontSize: "50px", border: "none", textAlign: "center"}} />
                )}
                <Divider sx={{mt: 1,mb: 1}} />
                <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={2} sx={{justifyContent: "center"}} > 
                    {data.map((item: string, index: number) => {
                        return (
                            <a key={index} style={{cursor: "pointer", fontSize: "24px"}}>
                                {item.trim() == realUnit ? <span style={{textDecoration: "underline", color: "grey"}}>{item}</span> : <span style={{color: "lightgrey"}} onClick={() => change_Unit(index)}>{item}</span> }
                            </a>
                        )
                    })}
                </Stack>
            </Box>
        </>
    )
}