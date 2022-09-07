import AddTaskIcon from '@mui/icons-material/AddTask';
import DeleteIcon from '@mui/icons-material/Delete';

import React, { useContext, useState, useEffect } from "react";
import { Button, Stack, TextField } from "@mui/material";

import { AppContext } from "../../../../provider/index.provider";
import { addNewService, updateService } from "../../../../other/apis.globals";
import { makeJSON } from "../../../../other/functions.globals";
import { validationCheckText } from "../../../../other/validation.globals";

export default function SetupServiceDirectory({editData } : {editData: any}){
    
    const {appState, setAppState} = useContext(AppContext)
    const [serviceSpecial, setServiceSpecial] = useState("");
    const [subSpecial, setSubSpecial] = useState("");
    
    const addNew = () => {
        if(!validationCheckText(serviceSpecial)){
            setAppState({...appState, alert: {...appState.alert, open: true, message: "Please check your Service name!", type: "error"}})            
            return;
        }
        if(!validationCheckText(subSpecial)){
            setAppState({...appState, alert: {...appState.alert, open: true, message: "Please check your sub Service name!", type: "error"}})            
            return;
        }
        if(!appState.editState){  
            addNewService(makeJSON({
                serviceSpecial: serviceSpecial, 
                subServiceSpecial: subSpecial
            })).then((res: any) => {
                res.json().then((data: any)=> {
                    setAppState({...appState, changeState: !appState.changeState, alert: {...appState.alert, open: true, message: "Successful!", type: "success"}})
                }).catch((rej: any) => {
                    console.log(rej)
                })
            })
        }else {
            updateService(makeJSON({
                serviceSpecial: serviceSpecial, 
                subServiceSpecial: subSpecial,
                ref : editData.ref
            })).then((res: any) => {
                res.json().then((data: any)=> {
                    setAppState({...appState, editState : false, changeState: !appState.changeState, alert: {...appState.alert, open: true, message: "Successful!", type: "success"}})
                }).catch((rej: any) => {
                    console.log(rej)
                })
                resetField()
            })
        }
    }

    const resetField = ()=>{
        setAppState({...appState, editState : false});
        setServiceSpecial("")
        setSubSpecial("")
    }

    useEffect( () => {
        if(appState.editState && editData){
            setServiceSpecial(editData.serviceSpecial)
            setSubSpecial(editData.subServiceSpecial)
        }
    }, [appState.editState] )

    return (
        <>
            <Stack component={"form"} noValidate spacing={10} direction="row" >
                <Stack spacing={2} width={"50%"}>
                    <TextField type={"text"} value={serviceSpecial} label={"Service/Specialty"} variant={"standard"} onChange={ event => setServiceSpecial(event.target.value) } />
                </Stack>                    
                <Stack spacing={2} width={"50%"}>
                    <TextField type={"text"} value={subSpecial} label={"Sub-Specialty"} variant={"standard"} onChange={ event => setSubSpecial(event.target.value) } />
                </Stack>                    
            </Stack>
            <Stack component={"form"} noValidate spacing={4} direction="row" justifyContent={"right"} sx={{mt: 4}} >
                <Button variant={"outlined"} color={"primary"} onClick={addNew} startIcon={<AddTaskIcon />} >Save</Button>
                <Button variant={"outlined"} color={"error"} onClick={resetField} startIcon={<DeleteIcon />} >Cancel</Button>
            </Stack>
        </>
    )
}