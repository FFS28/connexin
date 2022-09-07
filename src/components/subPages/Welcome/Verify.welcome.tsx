import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import ImageMark from '../../elements/ImageMark';
import TextMark from '../../elements/TextMark';
import ConnexinInput from '../../elements/ConnexinInput';
import ConnnexinBtn from '../../elements/ConnexinBtn';


export default function Verify({pageHandle}: {pageHandle : (param:any)=>void }){
    const [verifyCode, setVerifyCode] = useState("")
    const input_change = (inputLabel: string, inputValue: string) => {
        setVerifyCode(inputValue)
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
                        <Typography variant='subtitle1' component="div" sx={{color: "white"}} >Please enter Verification Code</Typography>
                    </Box>
                    <Box sx={{mt: 1, mb: 1}}>
                        <ConnexinInput label="Verification Code" type="password" elementChange={input_change} />
                    </Box>
                    <Box>
                        <Typography variant='caption' component="div" sx={{color: "white", textAlign: "left"}} >Resend verification Code</Typography>
                    </Box>
                </Box>
                <Box sx={{minHeight: "20vh"}}>
                    <Box sx={{mt: 1, mb: 1}}>
                        <ConnnexinBtn type="contained" value="Next" moveto={pageHandle} m_page = {"Detail"}  />
                    </Box>
                    <Box sx={{mt: 1, mb: 1}}>
                        <ConnnexinBtn type="outlined" value="Back" moveto={pageHandle} m_page = {"SignIn"}  />
                    </Box>
                </Box>
            </Box>
        </>    
    )
}
