import AddTaskIcon from '@mui/icons-material/AddTask';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useContext, useEffect, useState } from "react";
import { Button, Stack, TextField } from "@mui/material";

import { sendTextRemainder, updateTextRemainder } from "../../../../other/apis.globals";
import { makeJSON } from "../../../../other/functions.globals";
import { AppContext } from "../../../../provider/index.provider";
import { validationCheckEmail, validationCheckText } from '../../../../other/validation.globals';

export default function SendTextReminder({editData}: {editData: any}){
    
    const {appState, setAppState} = useContext(AppContext)
    const [nhsNumber, setNhsNumber] = useState("");
    const [mobileNumber, setMobileNumber] = useState("")
    const [email, setEmail] = useState("")
    const [reminder, setReminder] = useState("")

    const addNew = () => {
        if(!validationCheckText(nhsNumber)) {
            setAppState({...appState, alert: {...appState.alert, open: true, message: "Please input NHS number!", type: "error"}})
            return;
        }
        if(!validationCheckText(mobileNumber)) {
            setAppState({...appState, alert: {...appState.alert, open: true, message: "Please input Mobile Number!", type: "error"}})
            return;
        }
        if(!validationCheckText(reminder)) {
            setAppState({...appState, alert: {...appState.alert, open: true, message: "Please input Reminder Text!", type: "error"}})
            return;
        }
        if(!validationCheckEmail(email)) {
            setAppState({...appState, alert: {...appState.alert, open: true, message: "Please input correct Email!", type: "error"}})
            return;
        }
        if(!appState.editState){
            sendTextRemainder(makeJSON({
                nhsNumber : nhsNumber,
                mobile : mobileNumber,
                email : email,
                reminderText : reminder
            })).then((res: any)=> {
                res.json().then((data: any)=>{
                    setAppState({...appState, editState : false, changeState: !appState.changeState, alert: {...appState.alert, open: true, message: "Successful!", type: "success"}})
                    resetField()
                }).catch((rej: any)=>{
                    console.log(rej)
                })
            })
        }else {
            updateTextRemainder(makeJSON({
                nhsNumber : nhsNumber,
                mobile : mobileNumber,
                email : email,
                reminderText : reminder,
                ref : editData.ref
            })).then((res: any)=> {
                res.json().then((data: any)=>{
                    setAppState({...appState, editState: false, changeState: !appState.changeState, alert: {...appState.alert, open: true, message: "Successful!", type: "success"}})
                    resetField()
                }).catch((rej: any)=>{
                    console.log(rej)
                })
                resetField()
            })
        }
    }

    const resetField = () => {
        setAppState({...appState, editState : false});
        setNhsNumber("");
        setMobileNumber("")
        setEmail("")
        setReminder("")
    }

    useEffect(()=>{
        if(appState.editState && editData){
            setNhsNumber(editData.nhsNumber);
            setMobileNumber(editData.mobile)
            setEmail(editData.email)
            setReminder(editData.reminderText)
        }
    }, [appState.editState])

    return (
        <>
            {/* <Typography variant={"h4"} component={"h4"} sx={{mt: 1, mb: 1, textAlign: "center"}}>Text Reminder</Typography> */}
            <Stack component={"form"} noValidate spacing={10} direction="row">                    
                <Stack spacing={2} width="50%">
                    <TextField type={"text"} value={nhsNumber} label={"NHS Number"} variant={"standard"} onChange={ event => setNhsNumber(event.target.value) } />
                    <TextField type={"text"} value={mobileNumber} label={"Mobile Number"} variant={"standard"} onChange={ event => setMobileNumber(event.target.value) } />
                </Stack>
                <Stack spacing={2} width="50%">
                    <TextField type={"text"} value={email} label={"Email"} variant={"standard"} onChange={ event => setEmail(event.target.value) } />
                    <TextField type={"text"} value={reminder} label={"Reminder"} variant={"standard"} onChange={ event => setReminder(event.target.value) } />
                </Stack>                
            </Stack>
            <Stack component={"form"} noValidate spacing={4} direction="row" justifyContent={"right"} sx={{mt: 4}} >
                <Button variant={"outlined"} color={"primary"} onClick={addNew} startIcon={<AddTaskIcon />} >Save</Button>
                <Button variant={"outlined"} color={"error"} onClick={resetField} startIcon={<DeleteIcon />} >Cancel</Button>
            </Stack>
        </>
    )
}