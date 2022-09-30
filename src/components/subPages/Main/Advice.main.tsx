import React, { useContext } from "react"

import {Typography,Divider, Box } from "@mui/material"
import ConnexinImgCarusal from "../../elements/ConnexinImgCarusal";
import { AppContext } from "../../../provider/index.provider";

export default function Advice() {
    const {appState, setAppState} = useContext(AppContext);
    return (
        <>
            <Box sx={{pl : 0.5, pr: 0.5, position : "relative", pb : 2}}>
                <Box sx={{mt: 2, mb : 2}}>
                    <Typography variant="h5" gutterBottom component="div">Advice</Typography>
                </Box>
                <Box sx={{mt: 2 }}>
                    <Typography variant="h6" gutterBottom component="div">Useful information</Typography>
                </Box>
                <Box sx={{mt: 2 }}>
                    <Typography variant="subtitle1" gutterBottom component="div">Date/time of procedure</Typography>
                    <Typography variant="caption" gutterBottom component="div">{appState.users.user.addmissionDate}</Typography>
                </Box>
                <Box sx={{mt: 2 }}>
                    <Typography variant="subtitle1" gutterBottom component="div">Planned procedure</Typography>
                    <Typography variant="caption" gutterBottom component="div">Heart surgery</Typography>
                </Box>
                <Box sx={{mt: 2 }}>
                    <Typography variant="caption" gutterBottom component="div">Based on your planned procedure, we have allocated some useful videos for you . Please take a look below.</Typography>
                </Box>
                <Divider sx={{mt: 2, mb: 2}} />
                <ConnexinImgCarusal title="Pre-ops" />
            </Box>
        </>
    )
}
