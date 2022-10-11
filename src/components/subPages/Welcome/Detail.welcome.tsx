import React, {useContext} from 'react';
import { Box, Typography } from "@mui/material"
import ImageMark from '../../elements/ImageMark';
import TextMark from '../../elements/TextMark';
import ConnexinInput from '../../elements/ConnexinInput';
import ConnnexinBtn from '../../elements/ConnexinBtn';
import { AppContext } from '../../../provider/index.provider';


export default function Detail({pageHandle}: {pageHandle : (param1: any)=>void}){

    const {appState, setAppState} = useContext(AppContext)

    const change_value = (label: string, value: string) => {
        console.log(label, value)
        if(label == "NHS Number")
            setAppState({...appState, users: {...appState.users, user: {...appState.users.user, nhsnumber: value}}});
    }

    return (
        <>
            <Box sx={{minHeight: "100vh", pt: 1, pb: 1}}>
                <Box sx={{minHeight: "10vh"}}>
                    <ImageMark type="white" />
                </Box>
                <Box sx={{minHeight: "60vh"}}>
                    <Box sx={{mb: 5, mt : 5}}>
                        <Typography variant='caption' component="div" sx={{color: "white"}} >Welcome to</Typography>
                        <TextMark />
                    </Box>
                    <Box sx={{mb: 5}}>
                        <Typography variant='subtitle1' component="div" sx={{color: "white"}} >Please enter your detail</Typography>
                    </Box>
                    <ConnexinInput elementChange={change_value} label="NHS Number" type="number" />
                    <ConnexinInput elementChange={change_value} label="Date of Birth" type="date" />
                </Box>
                <Box sx={{minHeight: "20vh"}}>
                    <ConnnexinBtn type="contained" value="Submit" moveto={pageHandle} m_page = {"Intro1"}  />
                    <ConnnexinBtn type="outlined" value="Back" moveto={pageHandle} m_page = {"Verify"}  />
                </Box>
            </Box>
        </>    
    )
}
