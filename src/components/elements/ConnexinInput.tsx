import React from "react"
import { Box, TextField } from "@mui/material"
import { makeStyles } from "@material-ui/core/styles"; 
import { inputLabelClasses } from "@mui/material/"
import { Theme } from "@emotion/react";


const useStyles: any = makeStyles( (theme: Theme) => ({
    root: {
        borderBottom: "2px solid white",
        overflow: "hidden",
        color: "white",
    }
}));

export default function ConnexinInput({ label, type, elementChange }: {label: string, type: "text" | "password" | "number" | "date", elementChange: (param1: string, param2: string) => void }) {
    const classes = useStyles();
    const style = { sx: { color: "white", [`&.${inputLabelClasses.shrink}`]: { color: "white" } } }
    
    const changeValue = (event: any)=>{
        elementChange( label, event.target.value )
    }
    
    return (
        <>
            <Box sx={{mt: 2, mb : 2}}>
                <TextField onChange={changeValue} type={type} InputLabelProps={style} InputProps={{ classes, disableUnderline: true }} sx={{ input: { color: 'white' }, mb: 2 }} label={label} variant="standard" fullWidth />
            </Box>
        </>
    )
}