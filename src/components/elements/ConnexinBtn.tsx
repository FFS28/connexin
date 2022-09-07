import React from "react";
import Button from "@mui/material/Button";
import { Theme } from "@emotion/react";
import { makeStyles } from "@material-ui/core/styles"; 
import { Box } from "@mui/system";

const useStyles: any = makeStyles((theme: Theme) => ({
    contained: {
        background: 'linear-gradient(45deg, #7abdfb 30%, #3d94f8 90%)',
        border: 0,
        borderRadius: "25px !important",
        color: 'white',
        height: 48,
        padding: '0 30px',
        position: "relative"
    },
    outlined: {
        border: "1px solid #8ea9e4 !important",
        borderRadius: "25px !important",
        color: 'white',
        height: 48,
        padding: '0 30px',
        position: "relative"
    },
    blacktext: {
        border: "1px solid #8ea9e4 !important",
        borderRadius: "25px !important",
        color: 'black',
        height: 48,
        padding: '0 30px',
        position: "relative"
    },
}));

function ConnnexinBtn({ type, value, moveto, m_page }: { type: string, value: string, moveto: (param: string | number)=>void, m_page: number | string }) {
    const buttonClasses = useStyles()
    return (
        <>
            <Box sx={{ mb: 2, mt: 2 }}>
                {type == "contained" ? (
                    <Button className={buttonClasses.contained} variant="contained" onClick={() => { moveto(m_page) }} fullWidth>{value}</Button>
                ) : null}
                {type == "outlined" ? (
                    <Button className={buttonClasses.outlined} variant="outlined" onClick={() => { moveto(m_page) }} fullWidth>{value}</Button>
                ) : null}
                {type == "blacktext" ? (
                    <Button className={buttonClasses.blacktext} variant="outlined" onClick={() => { moveto(m_page) }} fullWidth>{value}</Button>
                ) : null}
            </Box>
        </>
    )
}

export default ConnnexinBtn;