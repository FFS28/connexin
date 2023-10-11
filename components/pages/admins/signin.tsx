import ConnexinInput from "../../elements/common/ConnexinInput";
import ConnnexinBtn from "../../elements/common/ConnexinBtn";
import ImageMarker from "../../elements/markups/ImageMarker";
import TextMarker from "../../elements/markups/TextMarker";
import React, { useContext, useState } from "react";
import { Box, styled, Typography } from "@mui/material"
import { AppContext } from "../../../utils/providers/context";
import { makeJSON } from "../../../utils/customFuntions/convertFunctions";
import { validationCheckEmail, validationCheckText } from "../../../utils/customFuntions/validationFunctions";
import { CallPostAPI } from "../../../utils/customFuntions/callAPIFuntions";
import { ALERT_TYPE_ERROR, ALERT_TYPE_SUCCESS, INFO_WELCOME } from "../../../utils/constants";
import { User } from "../../../utils/customTypes/apiData";

const CustomBox = styled(Box)(({ theme }) => ({
    background: `linear-gradient(${theme.palette.primary.dark}, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
    minHeight: "100vh",
    height: "100%",
    textAlign: "center",
}));

export default function SignIn(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const {appState, setAppState} = useContext(AppContext)

    const input_change = (inputLabel: string, inputValue: string) => {
        switch(inputLabel){
            case "Email":
                setEmail(inputValue)
                break;
            case "Password":
                setPassword(inputValue)
                break;
        }
    }

    const signIn = (pageSlug: string) => {
        if(!validationCheckEmail(email)){
            setAppState({...appState, alert: {...appState.alert, open: true, messages: "Please check your Email!", type: "error"}})
            return;
        }
        
        if(!validationCheckText(password)){
            setAppState({...appState, alert: {...appState.alert, open: true, messages: "Please check your Password!", type: "error"}})
            return;
        }

        setAppState({...appState, page: {
                ...appState.page, curLayout: "adminLayout", curPage : pageSlug
            }
        })
    
        // CallPostAPI('/api/admins/signin', makeJSON({
        //     email: email,
        //     pwd: password
        // })).then(res => {
        //     const data = res as User;
        //     setAppState({...appState, alert: {
        //             ...appState.alert, open: true, message: INFO_WELCOME, type: ALERT_TYPE_SUCCESS
        //         }, user: {
        //             ...appState.user, type: "admin", name: data.name, email: data.email, service: data.service, level: data.level, ref: data.ref                    
        //         }, page: {
        //             ...appState.page, curLayout: "adminLayout", curPage : pageSlug
        //         }
        //     })
        // }).catch(rej => {
        //     setAppState({...appState, alert: {...appState.alert, open: true, messages: rej, type: ALERT_TYPE_ERROR}})
        // })
    }

    return (
        <CustomBox>
            <Box sx={{ maxWidth: "600px", m: "auto" }}>
                <Box sx={{minHeight: "10vh"}}>
                    <ImageMarker type="white" />
                </Box>
                <Box sx={{minHeight: "60vh"}}>
                    <Box sx={{my : 5}}>
                        <Typography variant='caption' component="div" sx={{color: "white"}} >Welcome to</Typography>
                        <TextMarker />
                    </Box>
                    <Box sx={{mb: 5}}>
                        <Typography variant='subtitle1' component="div" sx={{color: "white"}} >Please login to your accout</Typography>
                    </Box>
                    <ConnexinInput label="Email" type="text" elementChange = {input_change} />
                    <ConnexinInput label="Password" type="password" elementChange = {input_change} />
                </Box>
                <Box sx={{minHeight: "20vh"}}>
                    <ConnnexinBtn type="contained" value="Sign In" moveto={signIn} m_page="adduser" />
                </Box>
            </Box>
        </CustomBox>    
    )
}
