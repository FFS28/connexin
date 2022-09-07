import React from "react";
import { Grid, Button } from "@mui/material";

export default function YesNo({pageHandle, proNum, value, btnSize } : { pageHandle : any, proNum: number, value: boolean | null, btnSize: boolean}){
    
    const handlechange = (curstate: boolean) => {
        if(curstate)
            pageHandle(curstate, proNum)
        else
            pageHandle(curstate, proNum)
    }

    return (
        <>
            <Grid container spacing={2} sx={{mt: 2}}>
                <Grid item xs={6}>
                    <Button variant={ "outlined" } sx={ btnSize ? {width: "100px", height: "50px", fontSize: "24px"} : {}} style={value == true ? { borderColor: "#1976d2", color: "grey" } : { borderColor: "darkgray", color: "grey" }} onClick={() => handlechange(true)} >Yes</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button variant={ "outlined" } sx={ btnSize ? {width: "100px", height: "50px", fontSize: "24px"} : {}} style={value == true ? { borderColor: "darkgray", color: "grey" } : { borderColor: "#1976d2", color: "grey" } }  onClick={() => handlechange(false)} >No</Button>
                </Grid>
            </Grid>
        </>
    )
}