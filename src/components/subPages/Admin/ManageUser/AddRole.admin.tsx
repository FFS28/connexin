import AddTaskIcon from '@mui/icons-material/AddTask';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useContext, useState, useEffect } from "react";
import { Button, Stack, TextField } from "@mui/material";

import { addRole, updateRole } from "../../../../other/apis.globals";
import { makeJSON } from "../../../../other/functions.globals";
import { validationCheckText } from "../../../../other/validation.globals";
import { AppContext } from "../../../../provider/index.provider";

export default function AddRole({editData}: {editData : any}){
    
    const {appState, setAppState} = useContext(AppContext)
    const [role, setRole] = useState("")
    const [authBy, setAuthBy] = useState("")

    const addNewRole = () => {
        if(!appState.editState){
            if(!validationCheckText(role)){
                setAppState({...appState, alert: {...appState.alert, open: true, message: "Please check your role name!", type: "error"}})            
                return;
            }
            if(!validationCheckText(authBy)){
                setAppState({...appState, alert: {...appState.alert, open: true, message: "Please check your authorised!", type: "error"}})
                return;
            }
            addRole(makeJSON({role: role, author: authBy})).then((res: any) =>{
                res.json().then((data: any) => {
                    setAppState({...appState, changeState: !appState.changeState, alert: {...appState.alert, open: true, message: "Successful!", type: "success"}})
                })    
            })
        }else {
            if(!validationCheckText(role)){
                setAppState({...appState, alert: {...appState.alert, open: true, message: "Please check your role name!", type: "error"}})            
                return;
            }
            if(!validationCheckText(authBy)){
                setAppState({...appState, alert: {...appState.alert, open: true, message: "Please check your authorised!", type: "error"}})
                return;
            }
            updateRole(makeJSON({role: role, author: authBy, ref: editData.ref })).then((res: any) =>{
                res.json().then((data: any) => {
                    setAppState({...appState, editState : false, changeState: !appState.changeState, alert: {...appState.alert, open: true, message: "Successful!", type: "success"}})
                })    
                resetField()
            })
            
        }
    }

    const resetField = () => {
        setAppState({...appState, editState : false});
        setRole("")
        setAuthBy("")
    }

    useEffect( () => {
        if(appState.editState && editData){
            setRole(editData.role)
            setAuthBy(editData.author)
        }
    }, [appState.editState] )

    return (
        <>
            {/* <Typography variant={"h4"} component={"h4"} sx={{mt: 1, mb: 2, textAlign: "center"}}>New Role</Typography> */}
            <Stack component={"form"} spacing={10} direction="row">
                <Stack spacing={2} width={"50%"}>
                    <TextField type={"text"} label="Role" value={role} variant={"standard"} onChange={ event => setRole(event.target.value) } />
                </Stack>
                <Stack spacing={2} width="50%">
                    <TextField type={"text"} label="Authorised By" value={authBy} variant={"standard"} onChange={ event => setAuthBy(event.target.value) } />
                </Stack>            
            </Stack>
            <Stack component={"form"} noValidate spacing={4} direction="row" justifyContent={"right"} sx={{mt: 4}} >
                <Button variant={"outlined"} color={"primary"} onClick={addNewRole} startIcon={<AddTaskIcon />} >Save</Button>
                <Button variant={"outlined"} color={"error"} onClick={resetField} startIcon={<DeleteIcon />} >Cancel</Button>
            </Stack>                
        </>
    )
}
