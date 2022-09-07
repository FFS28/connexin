import React, { useContext, useState } from "react";
import { Box, Typography } from "@mui/material"
import { AppContext } from "../../../provider/index.provider";
import { makeJSON } from "../../../other/functions.globals";
import { validationCheckEmail, validationCheckText } from "../../../other/validation.globals";
import ConnnexinBtn from "../../elements/ConnexinBtn";
import ConnexinInput from "../../elements/ConnexinInput";
import ImageMark from "../../elements/ImageMark";
import TextMark from "../../elements/TextMark";



export default function SignIn({pageHandle}: {pageHandle : (param: any)=> void }){

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

    const signIn = (value: string | number) => {
        if(!validationCheckEmail(email)){
            setAppState({...appState, alert: {...appState.alert, open: true, message: "Please check your Email!", type: "error"}})
            return;
        }
        if(!validationCheckText(password)){
            setAppState({...appState, alert: {...appState.alert, open: true, message: "Please check your Password!", type: "error"}})
            return;
        }
        
        fetch('/api/admins/auth/signin', makeJSON({
            email: email,
            pwd: password,
            level : appState.model.userlevel
        })).then(res => res.json()).then(res => {
            if(res.notification.type == "success"){
                if(appState.model.userlevel != 0)
                    setAppState({...appState, alert: {...appState.alert, open: true, message: res.notification.message, type: res.notification.type}, users: {...appState.users, admin: {...appState.users.admin, name: res.user.name, email: res.user.email, service: res.user.service, level: res.user.level, hospital: res.user.hospital, ref: res.user.ref }}, pageState : {...appState.pageState, curLayout: "AdminLayout", curPage : "AddUser"}})
                else
                    setAppState({...appState, alert: {...appState.alert, open: true, message: res.notification.message+"asasdasdasd", type: res.notification.type}, users: {...appState.users, user: {...appState.users.user, name: res.user.name, email: res.user.email, level: 0, hospital: res.user.hospital, ref: res.user.ref }}, pageState : {...appState.pageState, curLayout: "WelcomeLayout", curPage : "Verify"}})
            }else{
                setAppState({...appState, alert: {...appState.alert, open: true, message: res.notification.message, type: res.notification.type}})
            }
        })
    }

    return (
        <>
            <Box sx={{minHeigh: "100vh", pt: 1, pb: 1}}>
                <Box sx={{minHeight: "10vh"}}>
                    <ImageMark type="white" />
                </Box>
                <Box sx={{minHeight: "60vh"}}>
                    <Box sx={{mb: 5, mt : 5}}>
                        <Typography variant='caption' component="div" sx={{color: "white"}} >Welcome to</Typography>
                        <TextMark />
                    </Box>
                    <Box sx={{mb: 5}}>
                        <Typography variant='subtitle1' component="div" sx={{color: "white"}} >Please login to your accout</Typography>
                    </Box>
                    <ConnexinInput label="Email" type="text" elementChange = {input_change} />
                    <ConnexinInput label="Password" type="password" elementChange = {input_change} />
                </Box>
                <Box sx={{minHeight: "20vh"}}>
                    <ConnnexinBtn type="contained" value="Sign In" moveto={signIn} m_page="Verify" />
                    {appState.model.userlevel == 0 ? <ConnnexinBtn type="outlined" value="Sign Up" moveto={pageHandle} m_page="SignUp"  /> : null} 
                </Box>
            </Box>
            
        </>    
    )
}
