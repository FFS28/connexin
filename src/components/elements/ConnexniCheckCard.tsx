import React from "react"
import CheckIcon from '@mui/icons-material/Check';
import {Typography, Card, Grid } from "@mui/material"
import { Box } from "@mui/system";



export default function ConnecxinCheckCard({ action, title, listNum, pageHandle}: {action : boolean, title: string, listNum: number, pageHandle : (param: number)=> void}){
    const selectList= () => {
        pageHandle(listNum)
    }
    return (
        <>
            <Card variant="outlined" onClick={selectList} sx={action == true ? {m: 2, p: 1, borderRadius: "15px",borderColor: "blue"} : {m: 2, p: 1, borderRadius: "15px"}}> 
                <Grid container >
                    <Grid item xs={2} sx={{justifyContent: "center"}} >
                        <Box sx={action == true ? {color: "blue" } : { color: "lightgrey" } }><CheckIcon /></Box>
                    </Grid>
                    <Grid item xs={10} >
                        <Typography variant="subtitle1" component="div" sx={{fontSize: 14, color: "#9797ab", textAlign: "left"}}>
                            {title}
                        </Typography>
                    </Grid>
                </Grid>
            </Card>
        </>
    )
}

